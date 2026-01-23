import { ideologies, slugify } from '@/lib/data';
import { Logo } from '@/components/Logo';
import Link from 'next/link';


export const metadata = {
  title: 'Lista de Ideologias - Teste Político 8 Valores',
  description: 'Conheça todas as ideologias políticas mapeadas pelo nosso teste.',
};

export default function IdeologyListPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center min-h-screen">
      <header className="flex flex-col items-center mb-12 w-full max-w-2xl">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} />
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mt-4">
            Enciclopédia de <span className="text-blue-600 dark:text-blue-400">Ideologias</span>
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
            Explore o Espectro Político
          </p>
        </Link>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideologies.map((ideology) => (
          <Link 
            key={ideology.name} 
            href={`/ideologia/${slugify(ideology.name)}`}
            className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
          >
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {ideology.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {ideology.desc}
            </p>
            <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              Saiba mais 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
