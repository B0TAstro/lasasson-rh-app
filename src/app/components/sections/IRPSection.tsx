// app/components/sections/IRPSection.tsx

import { getIRP } from '@/lib/sanity.query'
import type { IRPType } from '@/types'

export default async function IRPSection() {
    const IRPData: IRPType = await getIRP()

    if (!IRPData) return null
    // console.log('IRP Data:', IRPData)
    return (
        <section id="section-7" className="pt-19 px-5 md:px-10 lg:px-16">
            <h2 className="text-[18px] font-medium underline">{IRPData.title}</h2>
        </section>
    )
}