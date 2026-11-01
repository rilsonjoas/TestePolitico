import { Metadata } from "next";
import { getAllPhotoCredits } from "@/lib/politicianPhotos";

export const metadata: Metadata = {
  title: "Créditos das imagens | Teste Político",
  description: "Autoria e licença de cada foto usada no cartão de resultado do Teste Político. Todas vêm da Wikimedia Commons, com licença livre.",
  robots: { index: false, follow: true },
};

export default function CreditosPage() {
  const credits = getAllPhotoCredits();

  return (
    <main className="min-h-screen container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
        Créditos das imagens
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-3">
        As fotos que aparecem no cartão de resultado vêm da Wikimedia Commons e só entram quando têm
        licença livre (domínio público, CC0, CC BY ou CC BY-SA). Cada foto é a imagem principal do
        verbete do político na Wikipédia em português. Se um político não tem foto livre, o cartão
        mostra as iniciais.
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Apareceu uma foto sua ou de alguém que você representa e quer que seja retirada? Escreva pela
        página de contato.
      </p>

      <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        {credits.map(({ title, photo }) => (
          <li key={title} className="py-3 flex flex-col gap-0.5 md:flex-row md:gap-4">
            <span className="font-semibold text-gray-900 dark:text-gray-100 md:w-64 shrink-0">{title}</span>
            <span className="text-gray-600 dark:text-gray-400">
              {photo.author} ·{" "}
              {photo.licenseUrl ? (
                <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {photo.license}
                </a>
              ) : (
                photo.license
              )}{" "}
              ·{" "}
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                fonte
              </a>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
