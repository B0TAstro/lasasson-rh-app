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


export type SectionType = IntroductionType | CadreJuridiqueType | DocumentsRessourcesType | OrganigrammeType | GestionCongesType;