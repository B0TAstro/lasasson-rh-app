// app/components/sections/IntroSection.tsx

import { PortableText } from '@portabletext/react'
import { getIntroduction } from '@/lib/sanity.query'
import type { IntroductionType } from '@/types'

export default async function IntroSection() {
    const introData: IntroductionType = await getIntroduction()

    if (!introData) return null
    // console.log('Introduction Data:', introData)
    return (
        <section id="section-1" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{introData.title}</h2>

            <div className="mt-6">
                <p className="font-medium">{introData.presidentMessage.title}</p>
                <div className="mt-4 text-sm font-light space-y-4">
                    <PortableText value={introData.presidentMessage.message} />
                </div>
                <p className="text-right mt-4 text-sm font-normal">{introData.presidentMessage.signature}</p>
            </div>

            <div className="mt-6">
                <h3 className="font-medium">{introData.presentation.title}</h3>
                {introData.presentation.items.map((item, idx) => (
                    <div key={idx} className="mt-6">
                        <h4 className="text-[15px] underline font-normal ml-6">{item.title}</h4>
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
                    </div>
                ))}
            </div>
        </section>
    )
}