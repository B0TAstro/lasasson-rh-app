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

export async function getOrganigramme() {
  return client.fetch(groq`
    *[_type == "organigramme"][0] {
      _id,
      title,
      organigrammeItems[] {
        nom,
        prenom,
        photo {
          asset-> {
            _id,
            url,
            altText
          }
        },
        service,
        fonction,
        etablissement,
        email,
        telephone
      },
      hasExtraSection,
      extraSectionTitle,
      extraSectionContent,
      extraSectionButtonText,
      extraSectionButtonType,
      extraSectionButtonUrl,
      extraSectionButtonPdf {
        asset-> {
          _id,
          url,
          originalFilename
        }
      }
    }
  `);
}

export async function getGestionConges() {
  return client.fetch(groq`
    *[_type == "conges"][0] {
      _id,
      title,
      intro,
      button1Intro {
        text,
        url
      },
      button2Intro {
        text,
        pdf {
          asset-> {
            _id,
            url,
            originalFilename
          }
        }
      },
      congeItems[] {
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
  `)
}

export async function getFormations() {
  return client.fetch(groq`
    *[_type == "formations"][0] {
      _id,
      title,
      subtitle,
      introContent,
      hasIntroButton,
      introButtonText,
      introButtonType,
      introButtonUrl,
      introButtonPdf {
        asset-> {
          _id,
          url,
          originalFilename
        }
      },
      formationBlocks[] {
        blockTitle,
        blockItems[] {
          itemSubtitle,
          itemContent,
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
    }
  `);
}

// Ajouter dans lib/sanity.query.ts

export async function getMutuelle() {
  return client.fetch(groq`
    *[_type == "mutuelle"][0] {
      _id,
      title,
      introContent,
      hasIntroButton,
      introButtonText,
      introButtonType,
      introButtonUrl,
      introButtonPdf {
        asset-> {
          _id,
          url,
          originalFilename
        }
      },
      mutuelleItems[] {
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

export async function getFaq() {
  return client.fetch(groq`
    *[_type == "faq"][0] {
      _id,
      title,
      introContent,
      faqItems[] {
        question,
        answer
      },
      infoBlockTitle,
      infoBlockContent
    }
  `);
}

export async function getIRP() {
  return client.fetch(groq`
    *[_type == "irp"][0] {
      _id,
      title,
      cseSection {
        title,
        subtitle,
        content,
        membres[] {
          type,
          nomPrenom,
          fonction,
          structure,
          telephone
        }
      },
      representantsSection {
        title,
        subtitle,
        content,
        membres[] {
          territoire,
          nom,
          prenom,
          structure,
          telephone
        }
      },
      deleguesSection {
        title,
        subtitle,
        content,
        membres[] {
          nomPrenom,
          syndicat,
          structure,
          telephone
        }
      },
      commissionsSection {
        title,
        subtitle,
        content,
        commissions[] {
          nom,
          description,
          membres[] {
            nom,
            prenom,
            structure
          }
        }
      },
      referentSection {
        title,
        subtitle,
        content,
        referents[] {
          type,
          nom,
          prenom,
          structure
        },
        contactUrgence
      }
    }
  `);
}