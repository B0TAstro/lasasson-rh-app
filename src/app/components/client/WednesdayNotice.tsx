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
                    Nous vous rappelons que le service RH est <strong>fermé tous les mercredis</strong>.
                </p>
                <p className="text-sm text-gray-500 mt-3">
                    Pour rappel : le service Ressources Humaines est ouvert Lundi/Mardi/Jeudi/Vendredi <strong>de 8h30 à 12h sans rendez-vous</strong> et <strong>l'après-midi de 14h à 17h sur rendez-vous</strong>.

                </p>
                <p className="text-sm text-gray-500 mt-4">
                    Cette application a été conçue pour vous fournir les informations nécessaires et répondre à vos questions/demandes durant cette journée de fermeture.
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