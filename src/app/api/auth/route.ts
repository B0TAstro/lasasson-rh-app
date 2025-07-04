// app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getSecurityConfig } from '@/lib/sanity-security'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const config = await getSecurityConfig()
    
    // Si la protection est désactivée
    if (!config.isActive) {
      return NextResponse.json({ error: 'Protection désactivée' }, { status: 400 })
    }

    // Vérifier les tentatives existantes
    const attempts = request.cookies.get('rh-attempts')
    const lockTime = request.cookies.get('rh-lock-time')
    
    let currentAttempts = 0
    let lockTimeValue = 0
    
    if (attempts) currentAttempts = parseInt(attempts.value)
    if (lockTime) lockTimeValue = parseInt(lockTime.value)
    
    // Vérifier si l'utilisateur est bloqué
    const lockoutDurationMs = config.lockoutDuration * 60 * 60 * 1000
    if (currentAttempts >= config.maxAttempts && Date.now() - lockTimeValue < lockoutDurationMs) {
      const remainingTime = Math.ceil((lockoutDurationMs - (Date.now() - lockTimeValue)) / (1000 * 60 * 60))
      return NextResponse.json({ 
        error: `Accès bloqué pendant encore ${remainingTime}h`,
        locked: true,
        remainingHours: remainingTime
      }, { status: 423 })
    }
    
    // Réinitialiser les tentatives si la période de blocage est terminée
    if (currentAttempts >= config.maxAttempts && Date.now() - lockTimeValue >= lockoutDurationMs) {
      currentAttempts = 0
    }

    // Vérifier le mot de passe
    if (password === config.sitePassword) {
      const response = NextResponse.json({ success: true })
      
      // Cookies de session
      const sessionDurationMs = config.sessionDuration * 60 * 60 * 1000
      
      response.cookies.set('rh-auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Math.floor(sessionDurationMs / 1000),
        path: '/',
      })
      
      response.cookies.set('rh-session-start', Date.now().toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: Math.floor(sessionDurationMs / 1000),
        path: '/',
      })
      
      // Réinitialiser les tentatives en cas de succès
      response.cookies.delete('rh-attempts')
      response.cookies.delete('rh-lock-time')
      
      return response
    } else {
      // Mot de passe incorrect
      currentAttempts++
      
      const response = NextResponse.json({ 
        error: 'Mot de passe incorrect',
        attempts: currentAttempts,
        maxAttempts: config.maxAttempts
      }, { status: 401 })
      
      // Enregistrer les tentatives
      response.cookies.set('rh-attempts', currentAttempts.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: lockoutDurationMs / 1000,
        path: '/',
      })
      
      // Si on atteint le maximum, enregistrer le temps de blocage
      if (currentAttempts >= config.maxAttempts) {
        response.cookies.set('rh-lock-time', Date.now().toString(), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: lockoutDurationMs / 1000,
          path: '/',
        })
      }
      
      return response
    }
  } catch (error) {
    console.error('Erreur API auth:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// API pour récupérer le statut (optionnel)
export async function GET(request: NextRequest) {
  try {
    const config = await getSecurityConfig()
    const attempts = request.cookies.get('rh-attempts')
    const lockTime = request.cookies.get('rh-lock-time')
    
    let currentAttempts = 0
    let isLocked = false
    let remainingTime = 0
    
    if (attempts) currentAttempts = parseInt(attempts.value)
    if (lockTime) {
      const lockTimeValue = parseInt(lockTime.value)
      const lockoutDurationMs = config.lockoutDuration * 60 * 60 * 1000
      
      if (currentAttempts >= config.maxAttempts && Date.now() - lockTimeValue < lockoutDurationMs) {
        isLocked = true
        remainingTime = Math.ceil((lockoutDurationMs - (Date.now() - lockTimeValue)) / (1000 * 60 * 60))
      }
    }
    
    return NextResponse.json({
      isActive: config.isActive,
      maxAttempts: config.maxAttempts,
      currentAttempts,
      isLocked,
      remainingTime
    })
  } catch (error) {
    console.error('Erreur API auth GET:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}