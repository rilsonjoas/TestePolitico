'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ideology, getTopMatchedIdeologies, slugify, getClosestPolitician, Politician } from '@/lib/data';
import { ShareResults } from '@/components/ShareResults';
import { BookCard } from '@/components/BookCard';
import { PoliticalCompass } from '@/components/PoliticalCompass';
import {
  TrendingUp,
  Globe,
  Shield,
  Users,
  Flame,
  ArrowLeft,
  ChevronRight,
  Library,
  Trophy,
  History,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../results-image.css';
import { quizEvents, resultEvents } from '@/lib/analytics';

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const [scores, setScores] = useState({ e: 50, d: 50, g: 50, s: 50 });
  const [compareScores, setCompareScores] = useState<{ e: number, d: number, g: number, s: number } | null>(null);
  const [topIdeologies, setTopIdeologies] = useState<Ideology[]>([]);
  const [matchedPolitician, setMatchedPolitician] = useState<Politician | null>(null);
  const [showRoast, setShowRoast] = useState(false);

  useEffect(() => {
    const e = parseFloat(searchParams.get('e') || '50');
    const d = parseFloat(searchParams.get('d') || '50');
    const g = parseFloat(searchParams.get('g') || '50');
    const s = parseFloat(searchParams.get('s') || '50');

    const compareE = searchParams.get('compareE');
    const compareD = searchParams.get('compareD');
    const compareG = searchParams.get('compareG');
    const compareS = searchParams.get('compareS');

    setScores({ e, d, g, s });

    if (compareE && compareD && compareG && compareS) {
      setCompareScores({
        e: parseFloat(compareE),
        d: parseFloat(compareD),
        g: parseFloat(compareG),
        s: parseFloat(compareS)
      });
    }

    const topMatches = getTopMatchedIdeologies(e, d, g, s, 3);
    setTopIdeologies(topMatches);

    const closest = getClosestPolitician(e, d, g, s);
    setMatchedPolitician(closest);

    if (topMatches[0]) {
      quizEvents.completed();
      resultEvents.viewed(topMatches[0].name);
    }
  }, [searchParams]);

  const matchedIdeology = topIdeologies[0];
  const otherIdeologies = topIdeologies.slice(1);

  const axes = [
    {
      name: 'Econômico',
      icon: <TrendingUp size={16} />,
      value1: scores.e,
      value2: 100 - scores.e,
      compareValue: compareScores?.e,
      label1: 'Coletivismo',
      label2: 'Mercado Livre',
      color1: '#e63946',
      color2: '#1d3557'
    },
    {
      name: 'Diplomático',
      icon: <Globe size={16} />,
      value1: scores.d,
      value2: 100 - scores.d,
      compareValue: compareScores?.d,
      label1: 'Cooperação Global',
      label2: 'Soberania Nacional',
      color1: '#a8dadc',
      color2: '#f77f00'
    },
    {
      name: 'Governo',
      icon: <Shield size={16} />,
      value1: scores.g,
      value2: 100 - scores.g,
      compareValue: compareScores?.g,
      label1: 'Liberdade Individual',
      label2: 'Autoridade do Estado',
      color1: '#ffc300',
      color2: '#457b9d'
    },
    {
      name: 'Sociedade',
      icon: <Users size={16} />,
      value1: scores.s,
      value2: 100 - scores.s,
      compareValue: compareScores?.s,
      label1: 'Progressismo Social',
      label2: 'Valores Tradicionais',
      color1: '#3a86ff',
      color2: '#8338ec'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full">
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6 max-w-7xl"
      >
        {/* Page title */}
        <motion.div variants={itemVariants} className="mb-5">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Seu resultado
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Análise detalhada do seu perfil político</p>
        </motion.div>
        {/* ===== TOP: 2-column – Axes (left) + Compass & Politician (right) ===== */}
        {/* id="results-capture" is used only by the dom-to-image fallback in ShareResults */}
        <motion.section
          variants={itemVariants}
          id="results-capture"
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
        >
          {/* ---- LEFT column: Profile card + Identidade Política stacked ---- */}
          <div className="flex flex-col gap-5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />
              <div className="p-5">
                <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-4">
                  Seu perfil político
                </h2>
                <div className="grid gap-3.5">
                  {axes.map((axis) => (
                    <div key={axis.name} className="axis p-3.5 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                          {axis.icon}
                        </div>
                        <span className="text-sm font-black tracking-tight text-gray-900 dark:text-white">{axis.name}</span>
                      </div>
                      <div className="flex justify-between font-bold text-xs text-gray-500 dark:text-gray-400 px-0.5 mb-1.5">
                        <span className="max-w-[48%] text-left leading-tight">{axis.label1}</span>
                        <span className="max-w-[48%] text-right leading-tight">{axis.label2}</span>
                      </div>
                      <div className="h-6 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden flex p-[3px] border border-gray-200 dark:border-gray-800 relative">
                        <div
                          style={{ width: `${axis.value1}%`, background: axis.color1 }}
                          className="h-full rounded-l-full transition-all duration-1000 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                        />
                        <div
                          style={{ width: `${axis.value2}%`, background: axis.color2 }}
                          className="h-full rounded-r-full transition-all duration-1000 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                        />
                        {compareScores && (
                          <div
                            className="absolute top-1/2 w-3 h-[120%] bg-white dark:bg-black border-2 border-blue-500 rounded-full shadow-md z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${axis.compareValue}%` }}
                            title="Resultado do seu amigo"
                          >
                            <div className="w-1 h-1 bg-blue-500 rounded-full" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between px-0.5 mt-1.5">
                        <span className="text-xs font-black italic" style={{ color: axis.color1 }}>{axis.value1.toFixed(1)}%</span>
                        <span className="text-xs font-black italic" style={{ color: axis.color2 }}>{axis.value2.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Identidade Política — separate card below axes */}
            {matchedPolitician && (
              <div className="rounded-2xl border border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-800 px-4 py-2.5 flex items-center gap-2">
                  <Users size={13} className="text-blue-200" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-100">Identidade Política</span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-4">
                  <p className="text-blue-600/70 dark:text-blue-400/70 text-xs mb-2">Seus resultados se aproximam de:</p>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-lg font-black text-gray-900 dark:text-white leading-tight">{matchedPolitician.name}</span>
                    {matchedPolitician.affinity !== undefined && (
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-700 shrink-0">
                        {matchedPolitician.affinity.toFixed(0)}% de afinidade
                      </span>
                    )}
                  </div>
                  <a
                    href={matchedPolitician.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 uppercase tracking-widest transition-colors"
                  >
                    Ver na Wikipédia →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* ---- RIGHT: Compass + Other matches ---- */}
          <div className="flex flex-col gap-5 min-w-0">
            {/* Political Compass */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-5">
              <PoliticalCompass e={scores.e} g={scores.g} />
            </div>

            {/* Other ideology matches */}
            {otherIdeologies.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-4">
                <div className="flex items-center gap-2 mb-3">
                  <History size={14} className="text-gray-400" />
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wide uppercase">Também próximo de</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {otherIdeologies.map((ideology) => (
                    <Link
                      key={ideology.name}
                      href={`/ideologia/${slugify(ideology.name)}`}
                      aria-label={`Ver detalhes sobre a ideologia ${ideology.name}`}
                      className="group flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none overflow-hidden"
                    >
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="font-black text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2 flex-wrap">
                          {ideology.name}
                          {ideology.affinity !== undefined && (
                            <span className="text-[10px] font-bold bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-2 py-0.5 rounded-full shrink-0">
                              {ideology.affinity.toFixed(0)}%
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 italic overflow-hidden text-ellipsis whitespace-nowrap w-full">
                          {ideology.desc}
                        </p>
                      </div>
                      <ChevronRight size={13} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>

        {/* ===== IDEOLOGY DETAIL: full width, own animation (not stagger-dependent) ===== */}
        {matchedIdeology && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500" />
            <div className="p-5 md:p-7">
              {/* Header row */}
              <div className="flex items-start gap-3 mb-5">
                <Trophy size={22} className="text-yellow-500 mt-0.5 shrink-0" />
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    {matchedIdeology.name}
                  </h2>
                  {matchedIdeology.affinity !== undefined && (
                    <span className="text-sm font-bold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-700/50">
                      {matchedIdeology.affinity.toFixed(0)}% Match
                    </span>
                  )}
                </div>
              </div>

              {/* 3-col on desktop: desc (2fr) + sidebar (1fr) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
                {/* Description */}
                <div className="lg:col-span-2 space-y-3 min-w-0 overflow-hidden">
                  {matchedIdeology.desc.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {paragraph}
                    </p>
                  ))}

                  {/* Roast */}
                  {matchedIdeology.roast && showRoast && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-4 pt-4 border-t-2 border-dashed border-orange-200 dark:border-orange-900/50"
                    >
                      <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400 font-black uppercase tracking-widest text-[11px]">
                        <Flame size={13} />
                        <span>Modo zueira</span>
                      </div>
                      <p className="text-base italic text-orange-800 dark:text-orange-200 font-medium leading-relaxed bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl">
                        {matchedIdeology.roast}
                      </p>
                    </motion.div>
                  )}

                  {/* Modo Zueira toggle — lives inside the ideology card */}
                  {matchedIdeology.roast && (
                    <div className="pt-2">
                      <Button
                        variant="ghost"
                        onClick={() => setShowRoast(!showRoast)}
                        aria-pressed={showRoast}
                        className={`flex items-center gap-2 font-bold transition-all duration-300 rounded-full px-4 py-1.5 h-auto text-xs border focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${
                          showRoast
                            ? 'text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            : 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/40 hover:bg-orange-500 hover:text-white hover:border-orange-500'
                        }`}
                      >
                        {showRoast ? <><Sparkles size={12} /> Esconder modo zueira</> : <><Flame size={12} /> Ativar modo zueira</>}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-gray-500 uppercase mb-2.5">
                      <Sparkles size={12} />
                      <span>Figuras principais</span>
                    </div>
                    <ul className="space-y-2">
                      {matchedIdeology.politicians.slice(0, 4).map((p) => (
                        <li key={p.name} className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {matchedIdeology.books.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-gray-500 uppercase mb-2.5">
                        <Library size={12} />
                        <span>Leituras sugeridas</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {matchedIdeology.books.slice(0, 2).map((b) => (
                          <BookCard key={b.title} title={b.title} link={b.link} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ===== SHARE SECTION ===== */}
        <motion.div variants={itemVariants} className="mt-5">
          <ShareResults
            targetId="results-capture"
            scores={scores}
            matchedIdeology={matchedIdeology}
            enableComparison={true}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-4 pb-8">
          <Link href="/" aria-label="Voltar para a página inicial" className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none rounded-lg inline-block">
            <Button size="sm" variant="ghost" className="font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 mt-10">
              <ArrowLeft size={13} />
              Voltar à página inicial
            </Button>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}
