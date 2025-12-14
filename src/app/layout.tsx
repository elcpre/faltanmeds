import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FaltanMeds | Buscador de Medicamentos en Desabastecimiento España",
  description: "Consulta en tiempo real qué medicamentos tienen problemas de suministro en España. Datos oficiales de la AEMPS. Encuentra alternativas y disponibilidad.",
  keywords: ["medicamentos", "desabastecimiento", "aemps", "farmacia", "suministro", "españa", "salud", "cima"],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://faltanmeds.com",
    title: "FaltanMeds | Monitor de Desabastecimiento Farmacéutico",
    description: "Consulta el estado de suministro de medicamentos en España en tiempo real.",
    siteName: "FaltanMeds",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleAdSense } from "@/components/GoogleAdSense";

import { ConsentProvider } from "@/context/ConsentContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleAdSense />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <ConsentProvider>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <GoogleAnalytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
