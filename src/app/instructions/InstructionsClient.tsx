'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { quizEvents } from '@/lib/analytics';

export function InstructionsClient() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <header className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
          Instruções do <span className="text-blue-600 dark:text-blue-400">Teste</span>
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] font-bold text-gray-500 dark:text-gray-500">
          Prepare-se para começar
        </p>
      </header>

      <main className="max-w-2xl w-full bg-white dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200">
            Você verá uma série de afirmações. Para cada uma, clique no botão que melhor representa o seu grau de concordância.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Não há respostas certas ou erradas, apenas a sua opinião sincera importa.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link href="/quiz" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-64 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              onClick={() => quizEvents.started()}
            >
              Iniciar o Teste
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button size="lg" variant="ghost" className="w-full sm:w-32 h-14 font-semibold">
              Voltar
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
