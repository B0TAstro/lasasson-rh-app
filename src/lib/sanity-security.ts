// lib/sanity-security.ts
import { createClient } from 'next-sanity'

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

export async function getSecurityConfig() {
    try {
        const config = await client.fetch(`
      *[_type == "security"][0] {
        sitePassword,
        maxAttempts,
        lockoutDuration,
        sessionDuration,
        isActive
      }
    `)

        // Défaut Valeurs si pas configuration
        return {
            sitePassword: config?.sitePassword,
            maxAttempts: config?.maxAttempts,
            lockoutDuration: config?.lockoutDuration,
            sessionDuration: config?.sessionDuration,
            isActive: config?.isActive !== false,
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la config sécurité:', error)
        // Fallback
        return {
            sitePassword: process.env.FALLBACK_PASSWORD,
            maxAttempts: 5,
            lockoutDuration: 24,
            sessionDuration: 8,
            isActive: true,
        }
    }
}

// Fonction pour hasher le mot de passe
import crypto from 'crypto'
export function hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex')
}
export function verifyPassword(password: string, hashedPassword: string): boolean {
    return hashPassword(password) === hashedPassword
}