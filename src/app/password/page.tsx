// app/password/page.tsx

'use client'

import { Suspense } from 'react'
import PasswordForm from './PasswordForm'

// Composant de fallback pour le suspense
function PasswordPageFallback() {
    return (
        <section className="min-h-screen flex items-center justify-center px-5 md:px-10 lg:px-16">
            <div className="max-w-xl w-full">
                <h2 className="text-center text-2xl sm:text-3xl font-extrabold">
                    La Sasson - Accès Espace RH
                </h2>
                <div className="mt-8 space-y-3">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function PasswordPage() {
    return (
        <Suspense fallback={<PasswordPageFallback />}>
            <PasswordForm />
        </Suspense>
    )
}