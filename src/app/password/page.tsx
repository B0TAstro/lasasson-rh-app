// app/password/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiEye, FiEyeOff, FiClock, FiAlertTriangle } from 'react-icons/fi'

export default function PasswordPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState({
        currentAttempts: 0,
        maxAttempts: 5,
        isLocked: false,
        remainingTime: 0
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        fetchStatus()
        // Vérifier les paramètres d'URL
        const locked = searchParams.get('locked')
        const expired = searchParams.get('expired')

        if (locked === 'true') {
            setError('Accès bloqué. Trop de tentatives.')
        } else if (expired === 'true') {
            setError('Session expirée. Veuillez vous reconnecter.')
        }
    }, [searchParams])

    const fetchStatus = async () => {
        try {
            const response = await fetch('/api/auth')
            if (response.ok) {
                const data = await response.json()
                setStatus(data)

                if (data.isLocked) {
                    setError(`Accès bloqué pendant encore ${data.remainingTime}h`)
                }
            }
        } catch (error) {
            console.error('Erreur lors du fetch du statut:', error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            const data = await response.json()

            if (response.ok) {
                router.push('/');
            } else {
                const remaining = data.maxAttempts - data.attempts;
                if (data.locked || remaining <= 0) {
                    setStatus(prev => ({
                        ...prev,
                        isLocked: true,
                        remainingTime: data.remainingHours
                    }));
                    setError(`Accès bloqué pendant encore ${data.remainingHours}h`);
                    return;
                }
                setStatus(prev => ({
                    ...prev,
                    currentAttempts: data.attempts,
                    maxAttempts: data.maxAttempts,
                }));

                if (remaining > 0) {
                    setError(`${data.error} (${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''})`);
                } else {
                    setError(data.error);
                }
            }
        } catch (error) {
            setError('Erreur de connexion au serveur')
        } finally {
            setPassword('');
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-5 md:px-10 lg:px-16">
            <div className="max-w-xl w-full">
                <h2 className="text-center text-2xl sm:text-3xl font-extrabold">
                    La Sasson - Accès Espace RH
                </h2>
                <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            name="password"
                            aria-label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={status.isLocked || loading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center px-3 pr-4 text-gray-500 hover:text-gray-700"
                            disabled={status.isLocked}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-contrast)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] ${status.isLocked || loading ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            disabled={status.isLocked || loading}
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </div>
                </form>

                {error && !status.isLocked && (
                    <div className="w-full mt-6 flex items-start gap-3 text-sm px-4 py-2 rounded-md bg-red-50 text-red-700 border border-red-200 shadow-sm">
                        <FiAlertTriangle className="text-red-500" size={18} />
                        <p>{error}</p>
                    </div>
                )}

                {status.isLocked && (
                    <div className="w-full mt-6 px-5 py-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <FiClock className="text-red-500" size={20} />
                            </div>
                            <div className="flex-1 text-red-600">
                                <h4 className="text-sm font-semibold text-red-700">
                                    Accès temporairement bloqué
                                </h4>
                                <p className="text-sm ">
                                    Pour des raisons de sécurité, votre accès a été suspendu.
                                </p>
                                <p className="text-sm mt-3">
                                    <strong>Temps restant :</strong> {status.remainingTime}h
                                </p>
                                <p className="text-sm">
                                    Veuillez contacter votre chef de service ou le service RH au besoin.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}