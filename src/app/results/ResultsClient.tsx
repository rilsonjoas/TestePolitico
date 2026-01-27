'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ideology, getTopMatchedIdeologies, slugify } from '@/lib/data';
import { ShareResults } from '@/components/ShareResults';
import { Logo } from '@/components/Logo';
import { AmazonLink } from '@/components/AmazonLink';
import { AdUnit } from '@/components/AdUnit';
import { 
  TrendingUp, 
  Globe, 
  Shield, 
  Users, 
  Flame, 
  ArrowLeft,
  ChevronRight,
  Info,
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
  const [showRoast, setShowRoast] = useState(false);

  useEffect(() => {
    const e = parseFloat(searchParams.get('e') || '50');
    const d = parseFloat(searchParams.get('d') || '50');
    const g = parseFloat(searchParams.get('g') || '50');
    const s = parseFloat(searchParams.get('s') || '50');

    // Comparison params
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

    // Track quiz completion and result view
    if (topMatches[0]) {
      quizEvents.complete(topMatches[0].name);
      resultEvents.view(topMatches[0].name, {
        e: e.toFixed(1),
        d: d.toFixed(1),
        g: g.toFixed(1),
        s: s.toFixed(1)
      });
    }
  }, [searchParams]);

  const matchedIdeology = topIdeologies[0];
  const otherIdeologies = topIdeologies.slice(1);

  const getAxisAnalysis = (axisIdx: number, val1: number) => {
    if (axisIdx === 0) {
      if (val1 >= 90) return "Comunismo Total / Planejamento Central";
      if (val1 >= 60) return "Socialismo / Economia Mista";
      if (val1 >= 40) return "Centrista / Mercado Regulado";
      if (val1 >= 10) return "Capitalismo / Liberalismo";
      return "Laissez-faire / Ultraliberalismo";
    }
    if (axisIdx === 1) {
      if (val1 >= 90) return "Chauvinismo / Isolacionismo";
      if (val1 >= 60) return "Patriotismo / Nacionalismo";
      if (val1 >= 40) return "Equilibrado / Realista";
      if (val1 >= 10) return "Internacionalismo / Cooperativo";
      return "Cosmopolitismo / Globalismo";
    }
    if (axisIdx === 2) {
      if (val1 >= 90) return "Anarquismo / Libertário Total";
      if (val1 >= 60) return "Libertário / Liberal Civil";
      if (val1 >= 40) return "Moderado / Republicano";
      if (val1 >= 10) return "Estatista / Autoritário";
      return "Totalitário / Orwelliano";
    }
    if (axisIdx === 3) {
      if (val1 >= 90) return "Reacionário / Fundamentalista";
      if (val1 >= 60) return "Conservador / Tradicionalista";
      if (val1 >= 40) return "Moderado / Progressista Cauteloso";
      if (val1 >= 10) return "Progressista / Reformista";
      return "Revolucionário / Radical";
    }
    return "";
  };

  const axes = [
    { 
      name: 'Econômico', 
      icon: <TrendingUp size={20} />,
      value1: scores.e, 
      value2: 100 - scores.e, 
      compareValue: compareScores?.e,
      label1: 'Igualdade', 
      label2: 'Mercado', 
      color1: '#e63946', 
      color2: '#1d3557' 
    },
    { 
      name: 'Diplomático', 
      icon: <Globe size={20} />,
      value1: scores.d, 
      value2: 100 - scores.d, 
      compareValue: compareScores?.d,
      label1: 'Nação', 
      label2: 'Global', 
      color1: '#f77f00', 
      color2: '#a8dadc' 
    },
    { 
      name: 'Civil', 
      icon: <Shield size={20} />,
      value1: scores.g, 
      value2: 100 - scores.g, 
      compareValue: compareScores?.g,
      label1: 'Liberdade', 
      label2: 'Autoridade', 
      color1: '#ffc300', 
      color2: '#457b9d' 
    },
    { 
      name: 'Social', 
      icon: <Users size={20} />,
      value1: scores.s, 
      value2: 100 - scores.s, 
      compareValue: compareScores?.s,
      label1: 'Tradição', 
      label2: 'Progresso', 
      color1: '#8338ec', 
      color2: '#3a86ff' 
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
            <div className="relative">
              <Logo size={80} showText={false} />
              <div className="absolute -inset-2 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Teste Político <span className="text-blue-600 dark:text-blue-400">8 Valores</span>
              </h1>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] mt-2">
                Resultados e Análise
              </p>
            </div>
          </Link>
        </header>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            id="results-capture" 
            className="results-capture bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-700 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500" />
            
            <h2 className="text-2xl font-black text-center mb-10 text-gray-900 dark:text-white uppercase tracking-widest">
              Perfil Político
            </h2>

            <div className="grid gap-10">
              {axes.map((axis, i) => (
                <div key={axis.name} className="axis space-y-3">
                  <div className="flex items-center gap-2 mb-1 justify-center">
                    <span className="text-blue-600 dark:text-blue-400">{axis.icon}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">{axis.name}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xs uppercase tracking-tighter sm:tracking-widest text-gray-500 px-1">
                    <span>{axis.label1}</span>
                    <span>{axis.label2}</span>
                  </div>
                  <div className="h-6 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden flex p-1 border border-gray-200 dark:border-gray-700 relative">
                    <div 
                      style={{ width: `${axis.value1}%`, background: axis.color1 }} 
                      className="h-full rounded-l-full transition-all duration-1000 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                    ></div>
                    <div 
                      style={{ width: `${axis.value2}%`, background: axis.color2 }} 
                      className="h-full rounded-r-full transition-all duration-1000 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                    ></div>
                    
                    {compareScores && (
                      <div 
                        className="absolute top-1/2 w-4 h-[120%] bg-white dark:bg-black border-2 border-blue-500 rounded-full shadow-lg z-10 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${axis.compareValue}%` }}
                        title="Resultado do seu amigo"
                      >
                        <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between px-2">
                    <span className="text-sm font-black italic" style={{ color: axis.color1 }}>{axis.value1.toFixed(1)}%</span>
                    <span className="text-sm font-black italic" style={{ color: axis.color2 }}>{axis.value2.toFixed(1)}%</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 py-1.5 px-4 rounded-full inline-block border border-gray-200/50 dark:border-gray-600/50">
                        {getAxisAnalysis(i, axis.value1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {matchedIdeology && (
              <div className="mt-16 bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy size={28} className="text-yellow-500" />
                  <div className="text-xl md:text-3xl font-black text-gray-900 dark:text-white">
                    {matchedIdeology.name}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                  {matchedIdeology.desc}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                      <Sparkles size={16} />
                      <span>Figuras Principais</span>
                    </div>
                    <ul className="space-y-3">
                      {matchedIdeology.politicians.slice(0, 4).map((p) => (
                        <li key={p.name} className="flex items-center gap-3 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {p.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {matchedIdeology.books.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
                        <Library size={16} />
                        <span>Leituras</span>
                      </div>
                      <div className="space-y-3">
                        {matchedIdeology.books.slice(0, 2).map((b) => (
                          <div key={b.title} className="text-xs font-bold p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 italic text-gray-500">
                            {b.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Integrated Roast Section */}
                {matchedIdeology.roast && showRoast && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-10 pt-10 border-t-2 border-dashed border-orange-200 dark:border-orange-900/50"
                  >
                    <div className="flex items-center gap-2 mb-4 text-orange-600 dark:text-orange-400 font-black uppercase tracking-widest text-xs">
                      <Flame size={16} />
                      <span>Modo Zueira</span>
                    </div>
                    <div className="relative">
                      <p className="text-lg italic text-orange-800 dark:text-orange-200 font-medium leading-relaxed bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl relative z-10">
                        {matchedIdeology.roast}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Outras correspondências */}
            {otherIdeologies.length > 0 && (
              <div className="mt-12 pt-10 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 justify-center mb-8">
                  <History size={18} className="text-gray-400" />
                  <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                    Também Próximo de
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherIdeologies.map((ideology) => (
                    <Link 
                      key={ideology.name}
                      href={`/ideologia/${slugify(ideology.name)}`}
                      className="group p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {ideology.name}
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1 uppercase tracking-tighter">
                        {ideology.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col items-center gap-6 mt-6">
            {/* Roast Toggle Button */}
            {matchedIdeology?.roast && (
              <Button
                variant="ghost"
                onClick={() => setShowRoast(!showRoast)}
                className={`flex items-center gap-2 font-black transition-all duration-500 rounded-full px-8 py-3 h-auto uppercase tracking-widest text-xs border ${
                  showRoast 
                    ? 'text-gray-400 border-gray-200 dark:border-gray-800' 
                    : 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/40 hover:bg-orange-500 hover:text-white shadow-xl shadow-orange-500/10'
                }`}
              >
                {showRoast ? (
                  <>Esconder a verdade <Sparkles size={16} /></>
                ) : (
                  <>Ativar Modo Zueira <Flame size={16} /></>
                )}
              </Button>
            )}

            <div className="w-full max-w-sm">
                <AdUnit 
                  pId="ca-pub-5482566824255473" 
                  slot="1234567890" 
                />
            </div>

            <ShareResults 
              targetId="results-capture" 
              scores={scores}
              matchedIdeology={matchedIdeology}
              enableComparison={true}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-16 pb-20">
            <Link href="/">
              <Button size="lg" variant="ghost" className="px-12 font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 mx-auto">
                <ArrowLeft size={16} />
                Voltar ao Início
              </Button>
            </Link>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
