// ============================================
// ARCHIVO: app/layout.tsx
// PROPÓSITO: Layout raíz de la aplicación.
// Envuelve TODAS las páginas. Aquí van los
// metadatos globales, fuentes y estilos base.
// ============================================

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Fuentes Geist (vienen con Next.js 14)
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadatos que aparecen en el <head> del HTML.
// Esto afecta SEO y cómo se ve en redes sociales.
export const metadata: Metadata = {
  title: "Spark — Nunca pierdas una idea",
  description:
    "Captura ideas espontáneas al instante y desarróllalas con tu IA favorita.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Spark",
  },
};

// Configuración del viewport para mobile-first.
// theme-color define el color de la barra del navegador en Android.
export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
