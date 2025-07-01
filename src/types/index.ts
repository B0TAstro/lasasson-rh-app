// types/index.ts

export type IntroductionType = {
  _id: string
  title: string
  presidentMessage: {
    title: string
    content: any[]
    signature: {
      name: string
      photo?: any
    }
  }
  presentation: {
    title: string
    historique: {
      title: string
      foundationYear: number
      content: any[]
      keyEvents: Array<{
        year: number
        description: string
      }>
    }
    missions: {
      title: string
      mainMission: string
      objectives: Array<{
        title: string
        description: string
        category: 'social' | 'logement' | 'insertion' | 'accompagnement'
      }>
    }
    ethique: {
      title: string
      principles: any[]
      fundamentalPrinciples: Array<{
        title: string
        description: string
      }>
    }
    values: {
      title: string
      coreValues: Array<{
        name: string
        description: string
        icon: 'solidarity' | 'respect' | 'justice' | 'dignity' | 'engagement'
      }>
    }
  }
  isPublished: boolean
  lastUpdated: string
}

export type SectionType = IntroductionType;