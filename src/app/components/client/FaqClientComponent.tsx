// app/components/client/FaqClientComponent.tsx

'use client'

import { useState, useRef, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import { Plus, Minus } from 'react-feather'

interface FaqItem {
    question: string
    answer: PortableTextBlock[]
}

interface FaqClientComponentProps {
    faqItems: FaqItem[]
}

interface PortableTextBlock {
    _type: string
    style?: string
    children?: Array<{
        _type: string
        text: string
        marks?: string[]
    }>
    markDefs?: Array<{
        _type: string
        _key: string
        href?: string
    }>
}

export default function FaqClientComponent({ faqItems }: FaqClientComponentProps) {
    return (
        <div className="mt-6 space-y-4">
            {faqItems.map((item, idx) => (
                <FaqItem key={idx} question={item.question} answer={item.answer} />
            ))}
        </div>
    )
}

function FaqItem({ question, answer }: { question: string; answer: PortableTextBlock[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [height, setHeight] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0)
        }
    }, [isOpen])

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left bg-gray-100 flex items-center justify-between"
            >
                <p className="font-medium">{question}</p>
                <div className="flex-shrink-0 ml-6">
                    <div className={`transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {isOpen ? (
                            <Minus size={20} className="text-[var(--color-primary)]" />
                        ) : (
                            <Plus size={20} className="text-[var(--color-primary)]" />
                        )}
                    </div>
                </div>
            </button>

            <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ height: `${height}px` }}
            >
                <div ref={contentRef} className="px-6 pb-4 border-t border-gray-200">
                    <div className={`text-sm font-light space-y-2 pt-4 transition-opacity duration-200 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        <PortableText
                            value={answer}
                            components={{
                                block: {
                                    normal: ({ children }) => <p>{children}</p>
                                },
                                list: {
                                    bullet: ({ children }) => <ul className="list-disc list-inside ml-2">{children}</ul>,
                                    number: ({ children }) => <ol className="list-decimal list-inside ml-2">{children}</ol>,
                                },
                                listItem: {
                                    bullet: ({ children }) => <li className="ml-2">{children}</li>,
                                    number: ({ children }) => <li className="ml-2">{children}</li>,
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}