// app/components/sections/GestionCongesSection.tsx

import { getGestionConges } from '@/lib/sanity.query'
import type { GestionCongesType } from '@/types'
import { PortableText } from '@portabletext/react'
import { ArrowRight, Download } from 'react-feather'

export default async function GestionCongesSection() {
    const congesdata: GestionCongesType = await getGestionConges()

    if (!congesdata) return null
    // console.log('Gestion Conges congesdata:', congesdata)
    return (
        <section id="section-5" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{congesdata.title}</h2>

            <div className="mt-6 text-sm font-light space-y-2">
                <PortableText
                    value={congesdata.intro}
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
                <div className="flex flex-col gap-4 mt-4">
                    {congesdata.button1Intro && congesdata.button1Intro.url && (
                        <a
                            href={congesdata.button1Intro.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFDD70] to-[#FFCA22] text-white text-sm text-left font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                        >
                            <ArrowRight size={16} />
                            {congesdata.button1Intro.text}
                        </a>
                    )}
                    {congesdata.button2Intro?.pdf?.asset && (
                        <a
                            href={congesdata.button2Intro.pdf.asset.url}
                            download={congesdata.button2Intro.pdf.asset.originalFilename}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-medium p-3.5 rounded-xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                        >
                            {congesdata.button2Intro.text}
                            <Download size={16} />
                        </a>
                    )}
                </div>
            </div>

            <div className="mt-6 space-y-6">
                {congesdata.congeItems.map((item, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="font-medium">{item.title}</h3>

                        <div className="mt-2 text-sm font-light space-y-2">
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
                            />
                        </div>
                        {item.hasButton && item.buttonText && (
                            <div className="mt-4 flex justify-center">
                                {item.buttonType === 'external' && item.buttonUrl ? (
                                    <a
                                        href={item.buttonUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-[#FFDD70] to-[#FFCA22] text-white text-sm text-left font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
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
                                        className="inline-flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-medium p-3.5 rounded-xl transition-all duration-200 hover:scale-103 active:translate-y-[3px] active:scale-[0.99]"
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
