// app/components/sections/DocumentsSection.tsx

import { getDocumentsRessources } from '@/lib/sanity.query'
import type { DocumentsRessourcesType } from '@/types'
import DocumentButton from '../DocumentButton'

export default async function DocumentsRessourcesSection() {
    const documentsData: DocumentsRessourcesType = await getDocumentsRessources()

    if (!documentsData || !documentsData.documentItems?.length) return null
    // console.log('Documents Ressources Data:', documentsData)
    return (
        <section id="section-3" className="pt-19 px-5 md:px-10 lg:px-16 mb-200">
            <h2 className="text-[18px] font-medium underline mb-6">
                {documentsData.title}
            </h2>

            <div className="space-y-4">
                {documentsData.documentItems.map((item, idx) => {
                    const isExternal = item.documentType === 'external'
                    const href = isExternal
                        ? item.externalUrl!
                        : item.documentFile?.asset?.url

                    if (!href) return null

                    return (
                        <DocumentButton
                            key={idx}
                            href={href}
                            title={item.title}
                            isExternal={isExternal}
                        />
                    )
                })}
            </div>
        </section>
    )
}