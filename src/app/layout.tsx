import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";

const siteUrl = "https://teste-politico.vercel.app";
const siteName = "Teste Político 8 Valores";
const siteDescription = "Descubra sua ideologia política! Responda 70 questões e veja seu posicionamento em 8 valores: Igualdade vs Mercado, Nação vs Global, Liberdade vs Autoridade, Tradição vs Progresso.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: "teste político, ideologia, valores políticos, compass político, quiz político, 8values, espectro político",
  authors: [{ name: "Rilson Joás", url: "https://github.com/rilsonjoas" }],
  creator: "Rilson Joás",
  publisher: siteName,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="pt-br" suppressHydrationWarning>
          <body className="min-h-screen w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggleButton />
            </div>
            {children}
            <Footer />
            <CookieConsent />
          </body>
        </html>
  );
}
