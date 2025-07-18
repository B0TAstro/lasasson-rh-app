// types/index.ts

import type { PortableTextBlock } from "@portabletext/types";

export type IntroductionType = {
  _id: string;
  title: string;
  presidentMessage: {
    title: string;
    message: PortableTextBlock[];
    signature: string;
  };
  presentation: {
    title: string;
    items: {
      title: string;
      content: PortableTextBlock[];
    }[];
  };
};

export type CadreJuridiqueType = {
  _id: string;
  title: string;
  juridicalItems: {
    title: string;
    content: PortableTextBlock[];
    hasButton: boolean;
    buttonText?: string;
    buttonType?: 'external' | 'pdf';
    buttonUrl?: string;
    buttonPdf?: {
      asset: {
        _id: string;
        url: string;
        originalFilename: string;
      };
    };
  }[];
};

export type DocumentsRessourcesType = {
  _id: string;
  title: string;
  documentItems: {
    title: string;
    documentType: 'document' | 'external';
    externalUrl?: string;
    documentFile?: {
      asset: {
        _id: string;
        url: string;
        originalFilename: string;
        mimeType?: string;
      };
    };
  }[];
};

export type OrganigrammeType = {
  _id: string;
  title: string;
  organigrammeItems: {
    nom: string;
    prenom: string;
    photo?: {
      asset: {
        _id: string;
        url: string;
        altText?: string;
      };
    };
    service?: string;
    fonction?: string;
    etablissement?: string;
    email?: string;
    telephone?: string;
  }[];
  hasExtraSection?: boolean;
  extraSectionTitle?: string;
  extraSectionContent?: PortableTextBlock[];
  extraSectionButtonText?: string;
  extraSectionButtonType?: 'external' | 'pdf';
  extraSectionButtonUrl?: string;
  extraSectionButtonPdf?: {
    asset: {
      _id: string;
      url: string;
      originalFilename: string;
    };
  };
};

export type GestionCongesType = {
  _id: string;
  title: string;
  intro: PortableTextBlock[];
  button1Intro?: {
    text: string;
    url: string;
  };
  button2Intro?: {
    text: string;
    pdf: {
      asset: {
        _id: string;
        url: string;
        originalFilename: string;
      };
    };
  };
  congeItems: {
    title: string;
    content: PortableTextBlock[];
    hasButton?: boolean;
    buttonText?: string;
    buttonType?: 'external' | 'pdf';
    buttonUrl?: string;
    buttonPdf?: {
      asset: {
        _id: string;
        url: string;
        originalFilename: string;
      };
    };
  }[];
};

export type FormationsType = {
  _id: string;
  title: string;
  subtitle: string;
  introContent: PortableTextBlock[];
  hasIntroButton?: boolean;
  introButtonText?: string;
  introButtonType?: 'external' | 'pdf';
  introButtonUrl?: string;
  introButtonPdf?: {
    asset: {
      _id: string;
      url: string;
      originalFilename: string;
    };
  };
  formationBlocks: {
    blockTitle: string;
    blockItems: {
      itemSubtitle?: string;
      itemContent: PortableTextBlock[];
      hasButton?: boolean;
      buttonText?: string;
      buttonType?: 'external' | 'pdf';
      buttonUrl?: string;
      buttonPdf?: {
        asset: {
          _id: string;
          url: string;
          originalFilename: string;
        };
      };
    }[];
  }[];
};

export type FaqType = {
  _id: string;
  title: string;
  introContent: PortableTextBlock[];
  faqItems: {
    question: string;
    answer: PortableTextBlock[];
  }[];
  infoBlockTitle: string;
  infoBlockContent: PortableTextBlock[];
};

export type IRPType = {
  _id: string;
  title: string;
  cseSection: {
    title: string;
    subtitle?: string;
    content: PortableTextBlock[];
    membres: {
      type: 'titulaire' | 'suppleant';
      nomPrenom: string;
      fonction?: string;
      structure: string;
      telephone?: string;
    }[];
  };
  representantsSection: {
    title: string;
    subtitle?: string;
    content: PortableTextBlock[];
    membres: {
      territoire: string;
      nom: string;
      prenom: string;
      structure: string;
      telephone?: string;
    }[];
  };
  deleguesSection: {
    title: string;
    subtitle?: string;
    content: PortableTextBlock[];
    membres: {
      nomPrenom: string;
      syndicat: string;
      structure: string;
      telephone?: string;
    }[];
  };
  commissionsSection: {
    title: string;
    subtitle?: string;
    content: PortableTextBlock[];
    commissions: {
      nom: string;
      description?: string;
      membres: {
        nom: string;
        prenom: string;
        structure: string;
      }[];
    }[];
  };
  referentSection: {
    title: string;
    subtitle?: string;
    content: PortableTextBlock[];
    referents: {
      type: 'referent' | 'referente';
      nom: string;
      prenom: string;
      structure: string;
    }[];
    contactUrgence?: string;
  };
};

export type SectionType = IntroductionType | CadreJuridiqueType | DocumentsRessourcesType | OrganigrammeType | GestionCongesType | FormationsType | FaqType;