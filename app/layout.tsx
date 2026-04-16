import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import { env } from "@/lib/env";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-display"
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body"
});

const appUrl = env.appUrl.startsWith("http") ? env.appUrl : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "GymApp | Gestion de gimnasio",
    template: "%s | GymApp"
  },
  description:
    "Sitio web y panel administrativo para gestionar socios, membresias, vencimientos y avisos de un gimnasio.",
  applicationName: "GymApp",
  category: "fitness",
  keywords: [
    "gym",
    "gimnasio",
    "gestion de gimnasio",
    "socios",
    "membresias",
    "supabase",
    "next.js"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: appUrl,
    siteName: "GymApp",
    title: "GymApp | Gestion de gimnasio",
    description:
      "Web publica y panel admin para registrar socios, renovar membresias y controlar vencimientos."
  },
  twitter: {
    card: "summary_large_image",
    title: "GymApp | Gestion de gimnasio",
    description:
      "Web publica y panel admin para registrar socios, renovar membresias y controlar vencimientos."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#06080f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
