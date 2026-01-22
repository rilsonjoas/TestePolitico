'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ideologies, Ideology } from '@/lib/data';
import { ShareResults } from '@/components/ShareResults';
import { Logo } from '@/components/Logo';
import '../results-image.css';

function ResultsContent() {
  const searchParams = useSearchParams();
  const [scores, setScores] = useState({ e: 50, d: 50, g: 50, s: 50 });
  const [matchedIdeology, setMatchedIdeology] = useState<Ideology | null>(null);

  useEffect(() => {
    const e = parseFloat(searchParams.get('e') || '50');
    const d = parseFloat(searchParams.get('d') || '50');
    const g = parseFloat(searchParams.get('g') || '50');
    const s = parseFloat(searchParams.get('s') || '50');
    setScores({ e, d, g, s });

    let closestIdeology: Ideology | null = null;
    let minDistance = Infinity;

    for (const ideology of ideologies) {
      const distance = Math.sqrt(
        Math.pow(ideology.stats.econ - e, 2) +
        Math.pow(ideology.stats.dipl - d, 2) +
        Math.pow(ideology.stats.govt - g, 2) +
        Math.pow(ideology.stats.scty - s, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestIdeology = ideology;
      }
    }

    setMatchedIdeology(closestIdeology);
  }, [searchParams]);

  const axes = [
    { name: 'Econômico', value1: scores.e, value2: 100 - scores.e, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
    { name: 'Diplomático', value1: scores.d, value2: 100 - scores.d, label1: 'Nação', label2: 'Global', color1: '#f77f00', color2: '#a8dadc' },
    { name: 'Civil', value1: scores.g, value2: 100 - scores.g, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
    { name: 'Social', value1: scores.s, value2: 100 - scores.s, label1: 'Tradição', label2: 'Progresso', color1: '#8338ec', color2: '#3a86ff' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* All content wrapped in a single parent div */}
      <>
        <header className="text-center my-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            <Logo size={64} showText={false} />
            <h1 className="text-4xl md:text-5xl font-bold">Resultados</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <div id="results-capture" className="results-capture">
            <h2>Meus Resultados</h2>
            {axes.map((axis) => (
              <div key={axis.name} className="axis">
                <div className="axis-labels">
                  <span>{axis.label1}</span>
                  <span>{axis.label2}</span>
                </div>
                <div className="progress-bar">
                  <div style={{ width: `${axis.value1}%`, background: axis.color1, height: '100%' }}></div>
                  <div style={{ width: `${axis.value2}%`, background: axis.color2, height: '100%' }}></div>
                </div>
                <div className="progress-bar-values">
                  <span>{axis.value1.toFixed(1)}%</span>
                  <span>{axis.value2.toFixed(1)}%</span>
                </div>
              </div>
            ))}
            {matchedIdeology && (
              <div className="ideology-card">
                <div className="ideology-name">Correspondência Mais Próxima: {matchedIdeology.name}</div>
                <div className="ideology-desc">{matchedIdeology.desc}</div>
                <div>
                  <div className="politicians">Figuras Políticas Associadas:</div>
                  <ul>
                    {matchedIdeology.politicians.map((p) => (
                      <li key={p.name}>{p.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="books">Leituras Recomendadas:</div>
                  <ul>
                    {matchedIdeology.books.map((b) => (
                      <li key={b.title}>{b.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* Botão de compartilhar resultados abaixo do card */}
          <div className="flex justify-center mt-8">
            <ShareResults 
              targetId="results-capture" 
              scores={scores}
              matchedIdeology={matchedIdeology}
            />
          </div>

          <div className="text-center mt-8">
            <Link href="/">
              <Button size="lg">Voltar</Button>
            </Link>
          </div>
        </main>
      </>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Carregando resultados...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
