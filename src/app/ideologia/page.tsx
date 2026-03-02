import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { Metadata } from 'next';
import IdeologyListClient from './IdeologyListClient';

export const metadata: Metadata = {
  title: 'Enciclopédia de Ideologias | Teste Político 8 Valores',
  description: 'Explore nosso guia completo com 45 ideologias políticas, desde o Anarquismo até o Fascismo, com resumos e dados matemáticos detalhados da sua bússola moral.',
  openGraph: {
    title: 'Enciclopédia de Ideologias do Espectro Político',
    description: 'Encontre o significado, princípios e figuras públicas para dezenas de ideologias mundiais.',
    type: 'website',
  }
};

export default function IdeologyListPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center min-h-screen">
      <header className="flex flex-col items-center w-full max-w-2xl text-center">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
            Enciclopédia de <span className="text-blue-600 dark:text-blue-400">Ideologias</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2 mb-4">
            Explore a diversidade do espectro político
          </p>
        </Link>
      </header>

      {/* Componente ClientSide com a Busca e Listagem animada */}
      <IdeologyListClient />
    </div>
  );
}
