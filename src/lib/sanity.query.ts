// lib/sanity.query.ts

import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getHero() {
  return client.fetch(
    groq`*[_type == "hero"]{
      _id,
      _type,
      title,
      catchphrase,
      backgroundImage {alt, "image": asset->url},
      testimonialsIntro,
      "testimonials": testimonials[] {
        quote,
        author
      }
    }`
  );
}

export async function getWho() {
  return client.fetch(
    groq`*[_type == "who"]{
      _id,
      _type,
      title,
      whoTexte,
      image1 {alt, "image": asset->url},
      image2 {alt, "image": asset->url}
    }`
  );
}

export async function getMap() {
  return client.fetch(
    groq`*[_type == "map"]{
      _id,
      _type,
      title,
      imageMap {alt, "image": asset->url}
    }`
  );
}

export async function getServices() {
  return client.fetch(
    groq`*[_type == "services"]{
      _id,
      _type,
      title,
      listServices[]{
        _key,
        titre,
        serviceTexte[]{
          _key,
          _type,
          style,
          children[]{
            _key,
            _type,
            text,
            marks
          }
        },
        imageService { alt, "image": asset->url }
      },
      boutonContact
    }`
  );
}

export async function getValues() {
  return client.fetch(
    groq`*[_type == "values"]{
      _id,
      _type,
      title,
      listvalues[]{
        _key,
        imageValue { alt, "image": asset->url },
        titre
      }
    }`
  );
}

export async function getContact() {
  return client.fetch(
    groq`*[_type == "contact"][0]{
      _id,
      _type,
      title,
      subtitle,
      phone,
      email,
      socialLinks[]{
        _key,
        platform,
        url
      },
      "formConfig": *[_type == "contactForm" && _id == ^.formReference._ref][0]{
        _id,
        formName,
        recipientEmail,
        formFields[]{
          _key,
          fieldName,
          fieldType,
          required,
          placeholder,
          options
        },
        submitButtonText,
        successMessage,
        errorMessage
      }
    }`
  );
}

export async function getSeoSettings() {
  return client.fetch(
    groq`*[_type == "seoSettings"]{
      title,
      description,
      siteName,
      baseUrl,
      canonicalPath,
      ogLocale,
      twitterHandle,
      ogImage {
        alt,
        asset->{
          url
        }
      }
    }`
  );
}