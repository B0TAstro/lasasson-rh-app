// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSecurityConfig } from './lib/sanity-security'

// Cache pour éviter trop d'appels à Sanity
let configCache: Awaited<ReturnType<typeof getSecurityConfig>> | null = null
let cacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function getCachedSecurityConfig() {
  const now = Date.now()
  if (!configCache || now - cacheTime > CACHE_DURATION) {
    configCache = await getSecurityConfig()
    cacheTime = now
  }
  return configCache
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const auth = request.cookies.get('rh-auth')

  // if (process.env.NODE_ENV === 'development') {
  //   return NextResponse.next()
  // }

  const config = await getCachedSecurityConfig()

  // Si la protection est désactivée, laisser passer
  if (!config.isActive) {
    return NextResponse.next()
  }

  // Routes exclues de la protection
  const excludedPaths = [
    '/password',
    '/api/auth',
    '/api/security',
    '/studio',
    '/_next',
    '/favicon.ico',
    '/robots.txt',
  ]

  const isExcluded = excludedPaths.some(path => url.pathname.startsWith(path))

  if (isExcluded) {
    return NextResponse.next()
  }

  // Vérifier les tentatives de connexion
  const attempts = request.cookies.get('rh-attempts')
  const lockTime = request.cookies.get('rh-lock-time')

  if (lockTime && attempts) {
    const lockTimeValue = parseInt(lockTime.value)
    const attemptsValue = parseInt(attempts.value)
    const lockoutDurationMs = config.lockoutDuration * 60 * 60 * 1000

    if (attemptsValue >= config.maxAttempts && Date.now() - lockTimeValue < lockoutDurationMs) {
      // Encore en période de blocage
      return NextResponse.redirect(new URL('/password?locked=true', request.url))
    }
  }

  // Vérifier l'authentification
  if (!auth || auth.value !== config.sitePassword) {
    return NextResponse.redirect(new URL('/password', request.url))
  }

  // Vérifier l'expiration de la session
  const sessionStart = request.cookies.get('rh-session-start')
  if (sessionStart) {
    const sessionStartTime = parseInt(sessionStart.value)
    const sessionDurationMs = config.sessionDuration * 60 * 60 * 1000

    if (Date.now() - sessionStartTime > sessionDurationMs) {
      // Session expirée
      const response = NextResponse.redirect(new URL('/password?expired=true', request.url))
      response.cookies.delete('rh-auth')
      response.cookies.delete('rh-session-start')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}