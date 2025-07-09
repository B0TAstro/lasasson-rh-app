// lib/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getIntroduction() {
  return client.fetch(groq`
    *[_type == "introduction"][0] {
      _id,
      title,
      presidentMessage {
        title,
        message,
        signature
      },
      presentation {
        title,
        items[] {
          title,
          content
        }
      }
    }
  `);
}

export async function getCadreJuridique() {
  return client.fetch(groq`
    *[_type == "juridique"][0] {
      _id,
      title,
      juridicalItems[] {
        title,
        content,
        hasButton,
        buttonText,
        buttonType,
        buttonUrl,
        buttonPdf {
          asset-> {
            _id,
            url,
            originalFilename
          }
        }
      }
    }
  `);
}