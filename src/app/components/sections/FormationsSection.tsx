// app/components/sections/FormationsSection.tsx

import { getFormations } from '@/lib/sanity.query'
import type { FormationsType } from '@/types'
import { PortableText } from '@portabletext/react'
import { ArrowRight, Download } from 'react-feather'

export default async function FormationsSection() {
    const formationsData: FormationsType = await getFormations()

    if (!formationsData) return null
    //console.log('Formations data:', formationsData)
    return (
        <section id="section-6" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{formationsData.title}</h2>

            <div className="mt-6">
                <h3 className="text-[16px] font-medium">{formationsData.subtitle}</h3>

                <div className="mt-4 text-sm font-light space-y-2">
                    <PortableText
                        value={formationsData.introContent}
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
                {formationsData.hasIntroButton && formationsData.introButtonText && (
                    <div className="flex flex-col mt-4">
                        {formationsData.introButtonType === 'external' && formationsData.introButtonUrl ? (
                            <a
                                href={formationsData.introButtonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFDD70] to-[#FFCA22] text-white text-sm text-left font-medium p-3.5 rounded-3xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                            >
                                <ArrowRight size={16} />
                                {formationsData.introButtonText}
                            </a>
                        ) : formationsData.introButtonType === 'pdf' && formationsData.introButtonPdf?.asset ? (
                            <a
                                href={formationsData.introButtonPdf.asset.url}
                                download={formationsData.introButtonPdf.asset.originalFilename}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white text-sm font-medium p-3.5 rounded-xl transition-all duration-200 hover:scale-101 active:translate-y-[3px] active:scale-[0.99]"
                            >
                                {formationsData.introButtonText}
                                <Download size={16} />
                            </a>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="mt-6 space-y-6">
                {formationsData.formationBlocks.map((block, blockIdx) => (
                    <div key={blockIdx}>
                        <h3 className="font-medium">{block.blockTitle}</h3>

                        {block.blockItems.map((item, itemIdx) => (
                            <div key={itemIdx} className="mt-4">
                                {item.itemSubtitle && (
                                    <h4 className="text-[15px] underline font-normal ml-6">{item.itemSubtitle}</h4>
                                )}
                                <div className="mt-2 text-sm font-light space-y-2">
                                    <PortableText
                                        value={item.itemContent}
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
                ))}
            </div>
        </section>
    )
}