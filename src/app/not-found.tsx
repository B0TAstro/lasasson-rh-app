// app/not-found.tsx

import { Metadata } from "next";
import NotFoundComponent from "./components/shared/NotFound";

export const metadata: Metadata = {
  title: "Error 404",
};

export default function NotFound() {
  return (
    <NotFoundComponent
      title="Error 404!"
      description="Oops! Cette page n'existe pas. Veuillez vérifier l'URL ou retourner à la page d'accueil."
    />
  );
}