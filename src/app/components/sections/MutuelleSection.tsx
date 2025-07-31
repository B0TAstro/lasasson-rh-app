// app/components/sections/MutuelleSection.tsx

import { getMutuelle } from '@/lib/sanity.query'
import type { MutuelleType } from '@/types'
import { PortableText } from '@portabletext/react'
import { ArrowRight, Download } from 'react-feather'

export default async function MutuelleSection() {
    const mutuelleData: MutuelleType = await getMutuelle()

    if (!mutuelleData) return null

    return (
        <section id="section-7" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{mutuelleData.title}</h2>

            {mutuelleData.introContent && (
                <div className="mt-6">
                    <div className="text-sm font-light space-y-2">
                        <PortableText
                            value={mutuelleData.introContent}
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

                    {mutuelleData.hasIntroButton && mutuelleData.introButtonText && (
                        <div className="flex flex-col mt-4">
                            {mutuelleData.introButtonType === 'external' && mutuelleData.introButtonUrl ? (
                                <a
                                    href={mutuelleData.introButtonUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFDD70] to-[#FFCA22] text-white text-sm text-left font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                                >
                                    <ArrowRight size={16} />
                                    {mutuelleData.introButtonText}
                                </a>
                            ) : mutuelleData.introButtonType === 'pdf' && mutuelleData.introButtonPdf?.asset ? (
                                <a
                                    href={mutuelleData.introButtonPdf.asset.url}
                                    download={mutuelleData.introButtonPdf.asset.originalFilename}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-medium p-3.5 rounded-xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                                >
                                    {mutuelleData.introButtonText}
                                    <Download size={16} />
                                </a>
                            ) : null}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-6 space-y-6">
                {mutuelleData.mutuelleItems.map((item, itemIdx) => (
                    <div key={itemIdx}>
                        <h3 className="font-medium">{item.title}</h3>

                        <div className="mt-4 text-sm font-light space-y-2">
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