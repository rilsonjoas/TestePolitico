'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { questions } from '@/lib/data';
import { Logo } from '@/components/Logo';

export default function Quiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();

  const handleAnswer = (multiplier: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = multiplier;
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const calculateResults = () => {
    let econ = 0, dipl = 0, govt = 0, scty = 0;
    let maxEcon = 0, maxDipl = 0, maxGovt = 0, maxScty = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[i] || 0;

      econ += answer * question.effect.econ;
      dipl += answer * question.effect.dipl;
      govt += answer * question.effect.govt;
      scty += answer * question.effect.scty;

      maxEcon += Math.abs(question.effect.econ);
      maxDipl += Math.abs(question.effect.dipl);
      maxGovt += Math.abs(question.effect.govt);
      maxScty += Math.abs(question.effect.scty);
    }

    const calcScore = (score: number, max: number) => {
      return ((100 * (max + score)) / (2 * max)).toFixed(1);
    };

    const results = {
      e: calcScore(econ, maxEcon),
      d: calcScore(dipl, maxDipl),
      g: calcScore(govt, maxGovt),
      s: calcScore(scty, maxScty),
    };

    router.push(`/results?e=${results.e}&d=${results.d}&g=${results.g}&s=${results.s}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      <header className="text-center my-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Logo size={64} showText={false} />
          <h1 className="text-4xl md:text-5xl font-bold">Teste Político 8 Valores</h1>
        </div>
      </header>

      <main className="text-center w-full max-w-2xl">
        <h2 className="text-base text-gray-500 font-normal mb-2">Pergunta {questionIndex + 1} de {questions.length}</h2>
        <div className="px-8 py-6 border border-gray-200 rounded-xl min-h-[120px] flex items-center justify-center bg-white shadow-md">
          <p className="text-xl text-gray-900 font-medium text-center">
            {questions[questionIndex].question}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Button onClick={() => handleAnswer(1.0)} className="w-full bg-black text-white hover:bg-gray-800" size="lg">Concordo Totalmente</Button>
          <Button onClick={() => handleAnswer(0.5)} className="w-full bg-gray-700 text-white hover:bg-gray-600" size="lg">Concordo</Button>
          <Button onClick={() => handleAnswer(0.0)} className="w-full bg-gray-200 text-gray-900 hover:bg-gray-300" size="lg">Neutro/Não sei</Button>
          <Button onClick={() => handleAnswer(-0.5)} className="w-full bg-red-300 text-red-900 hover:bg-red-400" size="lg">Discordo</Button>
          <Button onClick={() => handleAnswer(-1.0)} className="w-full bg-red-500 text-white hover:bg-red-600" size="lg">Discordo Totalmente</Button>
        </div>

        <div className="mt-8">
          <Button onClick={handlePrev} disabled={questionIndex === 0} className="bg-gray-300 text-gray-900 hover:bg-gray-400 border border-gray-400" size="lg">Anterior</Button>
        </div>
      </main>

      <footer className="text-center mt-12 py-4 border-t w-full">
        <p>&copy; 2025 - Desenvolvido por <a href="https://github.com/rilsonjoas" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Rilson Joás</a></p>
      </footer>
    </div>
  );
}
