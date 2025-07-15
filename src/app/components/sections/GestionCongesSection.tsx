// app/components/sections/GestionCongesSection.tsx

// 'use client'

import { getGestionConges } from '@/lib/sanity.query'
import type { GestionCongesType } from '@/types'
import { PortableText } from '@portabletext/react'
import { ArrowRight, Download } from 'react-feather'

export default async function GestionCongesSection() {
    const data: GestionCongesType = await getGestionConges()

    if (!data) return null
    // console.log('Gestion Conges Data:', data)
    return (
        <section id="section-5" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{data.title}</h2>

            <div className="space-y-4 text-sm">
                <PortableText
                    value={data.intro}
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
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    {data.button1Intro && data.button1Intro.url && (
                        <a
                            href={data.button1Intro.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
                        >
                            <ArrowRight size={16} />
                            {data.button1Intro.text}
                        </a>
                    )}
                    {data.button2Intro?.pdf?.asset && (
                        <a
                            href={data.button2Intro.pdf.asset.url}
                            download={data.button2Intro.pdf.asset.originalFilename}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
                        >
                            {data.button2Intro.text}
                            <Download size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="mt-10 space-y-10">
                {data.congeItems.map((item, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="font-medium">{item.title}</h3>

                        <div className="text-sm font-light space-y-2">
                            <PortableText
                                value={item.content}
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
                            />                        </div>

                        {item.hasButton && item.buttonText && (
                            <div className="mt-4">
                                {item.buttonType === 'external' && item.buttonUrl ? (
                                    <a
                                        href={item.buttonUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
                                    >
                                        <ArrowRight size={16} />
                                        {item.buttonText}
                                    </a>
                                ) : item.buttonType === 'pdf' && item.buttonPdf?.asset ? (
                                    <a
                                        href={item.buttonPdf.asset.url}
                                        download={item.buttonPdf.asset.originalFilename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-5 py-3 rounded-xl transition"
                                    >
                                        {item.buttonText}
                                        <Download size={16} />
                                    </a>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
