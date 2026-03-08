import { Info, History, Shield, Lightbulb } from 'lucide-react';
import type { Ideology } from '@/lib/data';

interface Props {
  ideology: Ideology;
}

export function IdeologyContent({ ideology }: Props) {
  return (
    <>
      {/* Resumo */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
          <Info size={24} />
          <h2 className="text-2xl font-bold">Resumo</h2>
        </div>
        <div className="space-y-4">
          {ideology.desc.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {ideology.content && (
        <>
          <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 text-indigo-600 dark:text-indigo-400">
              <History size={24} />
              <h2 className="text-2xl font-bold">Contexto Histórico</h2>
            </div>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {ideology.content.history}
            </p>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6 text-teal-600 dark:text-teal-400">
              <Shield size={24} />
              <h2 className="text-2xl font-bold">Princípios Fundamentais</h2>
            </div>
            <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
              {ideology.content.corePrinciples}
            </p>
          </section>

          <section className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl md:rounded-3xl p-5 md:p-8 border-2 border-dashed border-amber-200 dark:border-amber-800/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-400 dark:bg-amber-600" />
            <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-500">
              <Lightbulb size={24} />
              <h2 className="text-xl font-black">Curiosidade</h2>
            </div>
            <p className="text-base font-medium italic leading-relaxed text-amber-800 dark:text-amber-200">
              &quot;{ideology.content.curiosities}&quot;
            </p>
          </section>
        </>
      )}
    </>
  );
}
