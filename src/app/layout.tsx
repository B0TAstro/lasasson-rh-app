// layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/layout/Navbar";
import SecondaryNav from "./components/layout/SecondaryNav";
import Footer from "./components/layout/Footer";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Sasson RH App",
  description: "Application de gestion des ressources humaines de La Sasson",
    icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body id="top" className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <SecondaryNav />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
