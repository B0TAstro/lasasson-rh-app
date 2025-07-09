// app/components/sections/CadreJuridiqueSection.tsx

import { PortableText } from '@portabletext/react'
import { getCadreJuridique } from '@/lib/sanity.query'
import type { CadreJuridiqueType } from '@/types'

export default async function CadreJuridiqueSection() {
    const cadreData: CadreJuridiqueType = await getCadreJuridique()

    if (!cadreData) return null

    return (
        <section id="section-2" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{cadreData.title}</h2>

            <div className="mt-6 space-y-8">
                {cadreData.juridicalItems.map((item, idx) => (
                    <div key={idx} className="space-y-4">
                        <h3 className="text-[15px] underline font-normal ml-6">{item.title}</h3>
                        
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
                            <div className="mt-4">
                                {item.buttonType === 'external' && item.buttonUrl ? (
                                    <a
                                        href={item.buttonUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors"
                                    >
                                        {item.buttonText}
                                    </a>
                                ) : item.buttonType === 'pdf' && item.buttonPdf?.asset ? (
                                    <a
                                        href={item.buttonPdf.asset.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors"
                                    >
                                        {item.buttonText}
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