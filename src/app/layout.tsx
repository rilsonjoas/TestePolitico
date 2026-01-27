import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { AdSense } from "@/components/AdSense";
import { RouteTracker } from "@/components/RouteTracker";

const siteUrl = "https://testepolitico.com.br";
const siteName = "Teste Político 8 Valores";
const siteDescription = "Descubra sua ideologia política em 5 minutos! 🎯 Você é de esquerda ou direita? Liberal ou conservador? Faça o teste mais completo do Brasil!";
const shareTitle = "Descobri Minha Ideologia Política! E Você? 🤔";
const shareDescription = "Fiz o Teste Político 8 Valores e descobri meu posicionamento! Será que pensamos parecido? Faça o teste e compare! 🎯";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Descubra Sua Ideologia Política! 🎯 | Teste 8 Valores",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: "teste político, ideologia, valores políticos, compass político, quiz político, 8values, espectro político, esquerda, direita, liberal, conservador",
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
    title: shareTitle,
    description: shareDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="pt-br" suppressHydrationWarning>
          <head>
            {/* Google Analytics 4 */}
            {process.env.NEXT_PUBLIC_GA_ID && (
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                        page_path: window.location.pathname,
                      });
                    `,
                  }}
                />
              </>
            )}
            {/* Blocking script to prevent theme flicker */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    const savedTheme = localStorage.getItem('theme') || 'dark';
                    if (savedTheme === 'dark' || (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  })()
                `,
              }}
            />
            {/* AdSense Publisher ID configurado */}
            <AdSense pId="ca-pub-5482566824255473" />
          </head>
          <body className="min-h-screen w-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "Teste Político 8 Valores",
                  "url": "https://testepolitico.com.br",
                }),
              }}
            />
            <RouteTracker />
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
