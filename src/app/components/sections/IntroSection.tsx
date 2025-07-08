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
            <div className="max-w-3xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold">{introData.title}</h1>

                {/* Mot du président */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">{introData.presidentMessage.title}</h2>
                    <PortableText value={introData.presidentMessage.message} />
                    <p className="font-medium">{introData.presidentMessage.signature}</p>
                </div>

                {/* Présentation */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-semibold">{introData.presentation.title}</h2>
                    {introData.presentation.items.map((item, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <PortableText value={item.content} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}