// app/components/client/WednesdayNotice.tsx

'use client'

import { useEffect, useState } from 'react'

export default function WednesdayNotice() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const today = new Date().getDay()
        const alreadyShown = localStorage.getItem('rh-wednesday-popup')

        if (today === 3 && !alreadyShown) {
            setIsVisible(true)
            localStorage.setItem('rh-wednesday-popup', 'true')
        }
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="max-w-xl w-full bg-white rounded-2xl p-8 text-center">
                <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-primary)]">
                    Fermeture du service RH
                </h2>
                <p className="text-gray-700 mt-5">
                    Le service RH est <strong>indisponible tous les mercredis</strong>.
                    Aucun <strong>accueil téléphonique</strong> ni <strong>rendez-vous en présentiel</strong> n&apos;est assuré ce jour-là.
                </p>
                <p className="text-sm text-gray-500 mt-3">
                    Cette application a été mise en place afin de vous permettre d’accéder aux réponses à vos demandes durant cette journée.
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    Pour toute demande, merci de patienter jusqu’au <strong>jeudi matin</strong>.
                </p>

                <button
                    onClick={() => setIsVisible(false)}
                    className="mt-6 inline-flex justify-center px-5 py-2 text-sm font-medium bg-[var(--color-primary)] hover:bg-[var(--color-primary-contrast)] text-white rounded-md transition-all duration-200"
                >
                    OK
                </button>
            </div>
        </div>
    )
}