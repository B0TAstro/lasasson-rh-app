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

export type SectionType = IntroductionType | CadreJuridiqueType;