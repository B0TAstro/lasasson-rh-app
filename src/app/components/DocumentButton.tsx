// app/components/DocumentButton.tsx

'use client'

import { useState } from 'react'
import { Download, ExternalLink } from 'react-feather'

interface DocumentButtonProps {
    href: string
    title: string
    isExternal: boolean
}

export default function DocumentButton({ href, title, isExternal }: DocumentButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const Icon = isExternal ? ExternalLink : Download

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative block w-full bg-[var(--color-primary)] text-white text-left text-sm font-medium pt-2.5 pb-2.5 pr-5 pl-5 transition-all duration-150 active:translate-y-[3px] active:scale-[0.99] overflow-hidden ${isExternal ? 'rounded-full' : 'rounded-[10px]'
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                <span
                    className={`inline-block transition-all duration-500 ease-in-out ${isHovered
                        ? 'transform translate-x-[350%] opacity-0'
                        : 'transform translate-x-0 opacity-100'
                        }`}
                >
                    {title}
                </span>
            </div>

            <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isHovered
                    ? 'transform translate-y-0 opacity-100'
                    : 'transform translate-y-full opacity-0'
                    }`}
            >
                <Icon size={18} />
            </div>
        </a>
    )
}