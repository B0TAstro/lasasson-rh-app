// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = 'lasasson2025'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const auth = request.cookies.get('rh-auth')

  // Protéger toutes les routes sauf /password
  if (url.pathname !== '/password') {
    if (auth?.value !== PASSWORD) {
      return NextResponse.redirect(new URL('/password', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}