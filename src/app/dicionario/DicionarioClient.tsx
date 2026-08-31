'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { dictionaryTerms, DictionaryTerm } from '@/lib/data';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { useToast } from '@/components/Toast';
import { Search, BookOpen, Copy, Check, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['Todos', 'Econômico', 'Diplomático', 'Civil', 'Social', 'Teoria Política'] as const;

export default function DicionarioClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const { showToast, ToastComponent } = useToast();

  const filteredTerms = useMemo(() => {
    return dictionaryTerms.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Todos' || item.category === selectedCategory;

      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        (item.example && item.example.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (term: DictionaryTerm) => {
    const textToCopy = `*${term.term}*: ${term.definition}\nFonte: Teste Político (https://testepolitico.com.br/dicionario#${term.slug})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSlug(term.slug);
    showToast(`Definição de "${term.term}" copiada!`, 'success');
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {ToastComponent}

      <BreadcrumbNav items={[{ label: 'Dicionário de Ciência Política' }]} />

      <header className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <BookOpen size={14} />
          <span>Enciclopédia de Conceitos</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Dicionário de <span className="text-blue-600 dark:text-blue-400">Ciência Política</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
          Entenda de forma clara e imparcial os principais termos, teorias e vocabulário
          utilizados no debate político e econômico contemporâneo.
        </p>
      </header>

      {/* Pesquisa e Filtros */}
      <div className="mb-10 space-y-6">
        <div className="relative max-w-2xl mx-auto">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Pesquisar termo ou conceito (ex: Laissez-faire, Mais-valia, Soberania)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Termos */}
      {filteredTerms.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-800">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Nenhum termo encontrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Tente pesquisar com outras palavras ou alterar a categoria selecionada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredTerms.map((term) => (
              <motion.article
                key={term.slug}
                id={term.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white dark:bg-gray-800/90 rounded-3xl p-6 shadow-md border border-gray-100 dark:border-gray-700/70 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300">
                      <Tag size={12} className="text-blue-500" />
                      {term.category}
                    </span>

                    <button
                      onClick={() => handleCopy(term)}
                      title="Copiar definição"
                      className="p-2 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      {copiedSlug === term.slug ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {term.term}
                  </h2>

                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    {term.definition}
                  </p>

                  {term.example && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-3.5 border-l-4 border-blue-500 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <strong className="text-gray-900 dark:text-gray-200 block mb-1">
                        Exemplo Prático:
                      </strong>
                      {term.example}
                    </div>
                  )}
                </div>

                {term.relatedIdeologySlug && (
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Ideologia relacionada:
                    </span>
                    <Link
                      href={`/ideologia/${term.relatedIdeologySlug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Ver Ideologia</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
