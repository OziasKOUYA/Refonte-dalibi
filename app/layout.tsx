import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import "./globals.css";

// Volontairement sans graisse 600+ : aucun texte en gras sur le site.
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dalibi, le logiciel de gestion scolaire tout-en-un pour l’Afrique",
    template: "%s | Dalibi",
  },
  description:
    "Inscriptions, notes, bulletins, trésorerie, paie, présences et portail parents : Dalibi réunit toute la vie scolaire dans une plateforme claire, rapide et sécurisée.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

// Appliqué avant le premier rendu pour éviter un flash du mauvais thème.
const themeScript = `(function(){try{var t=localStorage.getItem('dalibi-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={urbanist.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="relative isolate min-h-screen overflow-x-clip">
          {/* Fond unique : une seule couche du haut jusqu’en bas, sur toutes les pages */}
          <div className="site-canvas" aria-hidden />
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
