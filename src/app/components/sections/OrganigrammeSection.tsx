// app/components/sections/OrganigrammeClientSection.tsx

import { getOrganigramme } from '@/lib/sanity.query'
import type { OrganigrammeType } from '@/types'
import OrganigrammeClientSection from '../client/OrganigrammeClientSection'

export default async function OrganigrammeSection() {
    const organigrammeData: OrganigrammeType = await getOrganigramme()

    if (!organigrammeData) return null

    return <OrganigrammeClientSection data={organigrammeData} />
}