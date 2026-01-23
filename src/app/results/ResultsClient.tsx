'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Ideology, getMatchedIdeology } from '@/lib/data';
import { ShareResults } from '@/components/ShareResults';
import { Logo } from '@/components/Logo';
import { AmazonLink } from '@/components/AmazonLink';
import { AdUnit } from '@/components/AdUnit';
import '../results-image.css';


export default function ResultsClient() {
  const searchParams = useSearchParams();
  const [scores, setScores] = useState({ e: 50, d: 50, g: 50, s: 50 });
  const [compareScores, setCompareScores] = useState<{ e: number, d: number, g: number, s: number } | null>(null);
  const [matchedIdeology, setMatchedIdeology] = useState<Ideology | null>(null);
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

    setMatchedIdeology(getMatchedIdeology(e, d, g, s));
  }, [searchParams]);

  const getAxisAnalysis = (axisIdx: number, val1: number) => {
    // val1 é o valor da esquerda (Equality, Nation, Liberty, Tradition)
    // val2 seria (100 - val1) (Market, Global, Authority, Progress)
    
    if (axisIdx === 0) { // Econômico: Igualdade (100) vs Mercado (0)
      if (val1 >= 90) return "Comunismo Total / Planejamento Central";
      if (val1 >= 60) return "Socialismo / Economia Mista";
      if (val1 >= 40) return "Centrista / Mercado Regulado";
      if (val1 >= 10) return "Capitalismo / Liberalismo";
      return "Laissez-faire / Ultraliberalismo";
    }
    if (axisIdx === 1) { // Diplomático: Nação (100) vs Global (0)
      if (val1 >= 90) return "Chauvinismo / Isolacionismo";
      if (val1 >= 60) return "Patriotismo / Nacionalismo";
      if (val1 >= 40) return "Equilibrado / Realista";
      if (val1 >= 10) return "Internacionalismo / Cooperativo";
      return "Cosmopolitismo / Globalismo";
    }
    if (axisIdx === 2) { // Civil: Liberdade (100) vs Autoridade (0)
      if (val1 >= 90) return "Anarquismo / Libertário Total";
      if (val1 >= 60) return "Libertário / Liberal Civil";
      if (val1 >= 40) return "Moderado / Republicano";
      if (val1 >= 10) return "Estatista / Autoritário";
      return "Totalitário / Orwelliano";
    }
    if (axisIdx === 3) { // Social: Tradição (100) vs Progresso (0)
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
      value1: scores.s, 
      value2: 100 - scores.s, 
      compareValue: compareScores?.s,
      label1: 'Tradição', 
      label2: 'Progresso', 
      color1: '#8338ec', 
      color2: '#3a86ff' 
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* All content wrapped in a single parent div */}
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
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-1">
                Resultados e Análise
              </p>
            </div>
          </Link>
        </header>

        <main>
          <div id="results-capture" className="results-capture">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4 uppercase tracking-widest">
              Meus Resultados
            </h2>
            {axes.map((axis) => (
              <div key={axis.name} className="axis">
                <div className="axis-labels">
                  <span>{axis.label1}</span>
                  <span>{axis.label2}</span>
                </div>
                <div className="progress-bar">
                  <div style={{ width: `${axis.value1}%`, background: axis.color1, height: '100%' }}></div>
                  <div style={{ width: `${axis.value2}%`, background: axis.color2, height: '100%' }}></div>
                  
                  {/* Comparison Marker */}
                  {compareScores && (
                    <div 
                      className="absolute top-[-8px] w-4 h-[120%] bg-black border-2 border-white rounded-full shadow-lg z-10 flex items-center justify-center transform -translate-x-1/2"
                      style={{ 
                        left: `${axis.compareValue}%`,
                      }}
                      title="Resultado do seu amigo"
                    >
                      <span className="text-[10px] text-white font-bold opacity-0 hover:opacity-100 transition-opacity absolute -top-4 bg-black px-1 rounded whitespace-nowrap">
                        Amigo: {axis.compareValue!.toFixed(0)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="progress-bar-values">
                  <span>{axis.value1.toFixed(1)}%</span>
                  <span>{axis.value2.toFixed(1)}%</span>
                </div>
                {/* Axis Analysis */}
                <div className="text-center mt-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-1 px-3 rounded-full inline-block mx-auto">
                    {getAxisAnalysis(axes.indexOf(axis), axis.value1)}
                </div>
              </div>
            ))}
            {matchedIdeology && (
              <div className="ideology-card">
                <div className="ideology-name">Correspondência Mais Próxima: {matchedIdeology.name}</div>
                <div className="ideology-desc">{matchedIdeology.desc}</div>
                <div>
                  <div className="politicians">Figuras Políticas Associadas:</div>
                  <ul className="list-disc list-inside mb-4">
                    {matchedIdeology.politicians.map((p) => (
                      <li key={p.name} className="text-gray-700 dark:text-gray-300">{p.name}</li>
                    ))}
                  </ul>
                </div>
                
                {matchedIdeology.books.length > 0 && (
                  <div className="mt-6">
                    <div className="books mb-4">Leituras Recomendadas:</div>
                    <div className="grid gap-4">
                      {matchedIdeology.books.map((b) => (
                        b.link ? (
                          <AmazonLink
                            key={b.title}
                            title={b.title}
                            description={`Aprofunde seus conhecimentos sobre ${matchedIdeology.name} com esta leitura essencial.`}
                            url={b.link}
                            trackingId="rilson-20" // ID de associado atualizado
                          />
                        ) : (
                          <div key={b.title} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-sm italic">
                            {b.title}
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Integrated Roast Section */}
                {matchedIdeology.roast && showRoast && (
                  <div className="mt-8 pt-8 border-t-2 border-dashed border-orange-200 dark:border-orange-900/50">
                    <div className="flex items-center gap-2 mb-3 text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider text-xs">
                      <span>🔥</span> Zueira do Compasso
                    </div>
                    <p className="text-lg italic text-orange-800 dark:text-orange-200 font-medium leading-relaxed bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                      &quot;{matchedIdeology.roast}&quot;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Roast Toggle Button below the card */}
          {matchedIdeology?.roast && (
            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                onClick={() => setShowRoast(!showRoast)}
                className={`flex items-center gap-2 font-bold transition-all duration-300 rounded-full px-6 py-2 ${
                  showRoast 
                    ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200' 
                    : 'text-orange-600 hover:text-white hover:bg-orange-500 shadow-sm border border-orange-200 dark:border-orange-900/50'
                }`}
              >
                {showRoast ? (
                  <>Esconder a verdade 🙈</>
                ) : (
                  <>🔥 Modo zueira</>
                )}
              </Button>
            </div>
          )}

          <AdUnit 
            pId="ca-pub-5482566824255473" 
            slot="1234567890" 
          />
          {/* Botão de compartilhar resultados abaixo do card */}
          <div className="flex justify-center mt-8">
            <ShareResults 
              targetId="results-capture" 
              scores={scores}
              matchedIdeology={matchedIdeology}
              enableComparison={true}
            />
          </div>

          <div className="text-center mt-12 pb-12">
            <Link href="/">
              <Button size="lg" variant="outline" className="px-12 font-bold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

