// app/components/sections/FaqSection.tsx (Server Component)

import { getFaq } from '@/lib/sanity.query'
import type { FaqType } from '@/types'
import { PortableText } from '@portabletext/react'
import FaqClientComponent from '../client/FaqClientComponent'

export default async function FaqSection() {
    const faqData: FaqType = await getFaq()

    if (!faqData) return null
    // console.log('FAQ Data:', faqData)
    return (
        <section id="section-8" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{faqData.title}</h2>

            <div className="mt-6 text-sm font-light space-y-2">
                <PortableText
                    value={faqData.introContent}
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

            <FaqClientComponent faqItems={faqData.faqItems} />

            {faqData.infoBlockTitle && faqData.infoBlockContent && (
                <div className="mt-6">
                    <p className="font-medium">{faqData.infoBlockTitle}</p>
                    <div className="mt-4 text-sm font-light space-y-2">
                        <PortableText
                            value={faqData.infoBlockContent}
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
            )}
        </section>
    )
}