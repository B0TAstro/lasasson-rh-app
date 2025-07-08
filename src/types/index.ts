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

export type SectionType = IntroductionType;