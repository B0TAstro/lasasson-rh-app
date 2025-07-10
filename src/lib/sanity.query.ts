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

export async function getDocumentsRessources() {
  return client.fetch(groq`
    *[_type == "documents"][0] {
      _id,
      title,
      documentItems[] {
        title,
        documentType,
        externalUrl,
        documentFile {
          asset-> {
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      }
    }
  `);
}