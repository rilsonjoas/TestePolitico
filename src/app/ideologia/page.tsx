'use client';

import { ideologies, slugify } from '@/lib/data';
import { Logo } from '@/components/Logo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Search, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function IdeologyListPage() {
  const [search, setSearch] = useState('');

  const filteredIdeologies = ideologies.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.desc.toLowerCase().includes(search.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center min-h-screen">
      <header className="flex flex-col items-center mb-16 w-full max-w-2xl text-center">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
            Enciclopédia de <span className="text-blue-600 dark:text-blue-400">Ideologias</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2">
            Explore a diversidade do espectro político
          </p>
        </Link>

        {/* Search Bar Premium */}
        <div className="mt-12 w-full max-w-md relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar ideologia ou termo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all shadow-sm focus:shadow-xl focus:shadow-blue-500/10 text-lg font-medium"
          />
        </div>
      </header>

      <main className="w-full max-w-6xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredIdeologies.map((ideology) => (
            <motion.div key={ideology.name} variants={itemVariants}>
              <Link 
                href={`/ideologia/${slugify(ideology.name)}`}
                className="group h-full flex flex-col bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ideology.name}
                  </h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed font-medium mb-6">
                  {ideology.desc}
                </p>
                
                <div className="mt-auto flex items-center justify-between text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-widest">
                  <span>Ver Detalhes</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
          
          {filteredIdeologies.length === 0 && (
            <div className="col-span-full py-20 text-center animate-pulse">
               <p className="text-xl font-bold text-gray-400">Nenhuma ideologia encontrada para sua busca.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
