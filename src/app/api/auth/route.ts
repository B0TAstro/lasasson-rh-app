// app/api/auth/route.ts

import { NextRequest, NextResponse } from 'next/server'

const PASSWORD = 'lasasson2025'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  if (password === PASSWORD) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('rh-auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    })
    return response
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}