// app/components/sections/OrganigrammeServerSection.tsx

import { getOrganigramme } from '@/lib/sanity.query'
import type { OrganigrammeType } from '@/types'
import OrganigrammeSection from './OrganigrammeSection'

export default async function OrganigrammeServerSection() {
    const organigrammeData: OrganigrammeType = await getOrganigramme()

    if (!organigrammeData) return null

    return <OrganigrammeSection data={organigrammeData} />
}