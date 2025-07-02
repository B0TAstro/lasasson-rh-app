export type IntroductionType = {
  _id: string;
  title: string;
  isPublished: boolean;
  lastUpdated: string;
  presidentMessage: {
    title: string;
    content: PortableTextBlock[];
    signature: {
      name: string;
      photo?: SanityImage;
    };
  };
  presentation: {
    title: string;
    historique: {
      title: string;
      foundationYear: number;
      content: PortableTextBlock[];
      keyEvents: {
        year: number;
        description: string;
      }[];
    };
    missions: {
      title: string;
      mainMission: string;
      objectives: {
        title: string;
        description: string;
        category: 'social' | 'logement' | 'insertion' | 'accompagnement';
      }[];
    };
    ethique: {
      title: string;
      principles: PortableTextBlock[];
      fundamentalPrinciples: {
        title: string;
        description: string;
      }[];
    };
    values: {
      title: string;
      coreValues: {
        name: string;
        description: string;
        icon: 'solidarity' | 'respect' | 'justice' | 'dignity' | 'engagement';
      }[];
    };
  };
};

export type SectionType = IntroductionType;

// Types utilitaires Sanity
export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type PortableTextBlock = {
  _type: 'block';
  _key?: string;
  style?: string;
  markDefs?: {
    _key?: string;
    _type: string;
    [key: string]: unknown;
  }[];
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
};