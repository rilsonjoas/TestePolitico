import type { Metadata } from "next";
import "./globals.css";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export const metadata: Metadata = {
  title: "Teste Político 8 Valores",
  description: "Descubra suas ideologias políticas através de um questionário que avalia 8 valores fundamentais: Igualdade vs Mercado, Nação vs Global, Liberdade vs Autoridade, Tradição vs Progresso.",
  keywords: "teste político, ideologia, valores políticos, compass político, quiz político",
  authors: [{ name: "Rilson Joás", url: "https://github.com/rilsonjoas" }],
  creator: "Rilson Joás",
  publisher: "Teste Político 8 Valores",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
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
            <div className="w-full flex justify-end p-4 md:p-8">
              <ThemeToggleButton />
            </div>
            {children}
          </body>
        </html>
  );
}
