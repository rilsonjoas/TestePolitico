'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { questions } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { quizEvents } from '@/lib/analytics';
import { Swords } from 'lucide-react';

const QuizContent = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [savedData, setSavedData] = useState<{ index: number; ans: number[] } | null>(null);
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Auto-Save: Check for saved progress on mount
  useEffect(() => {
    setIsClientLoaded(true);
    const savedProgress = localStorage.getItem('testePoliticoProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Só oferecer resume se não estiver no fim
        if (parsed && parsed.index > 0 && parsed.index < questions.length && Array.isArray(parsed.ans)) {
          setSavedData(parsed);
          setShowResumePrompt(true);
        }
      } catch (e) {
        console.error("Failed to parse saved progress", e);
        localStorage.removeItem('testePoliticoProgress');
      }
    }

    if (!quizStarted) {
      quizEvents.started();
      setQuizStarted(true);
    }
  }, [quizStarted]);

  // Track quiz abandonment on unmount
  useEffect(() => {
    return () => {
      if (questionIndex < questions.length - 1 && answers.length > 0) {
        quizEvents.abandon(questionIndex + 1, questions.length);
      }
    };
  }, [questionIndex, answers]);

  const handleAnswer = (multiplier: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = multiplier;
    setAnswers(newAnswers);

    // Save progress to LocalStorage
    localStorage.setItem('testePoliticoProgress', JSON.stringify({
      index: questionIndex + 1 < questions.length ? questionIndex + 1 : questionIndex,
      ans: newAnswers
    }));

    // Track answer
    quizEvents.answer(questionIndex + 1, multiplier);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      const newIndex = questionIndex - 1;
      setQuestionIndex(newIndex);

      // Update LocalStorage to reflect moving back
      localStorage.setItem('testePoliticoProgress', JSON.stringify({
        index: newIndex,
        ans: answers
      }));
    }
  };

  const clearSavedProgress = () => {
    localStorage.removeItem('testePoliticoProgress');
  };

  const handleResume = (resume: boolean) => {
    if (resume && savedData) {
      setQuestionIndex(savedData.index);
      setAnswers(savedData.ans);
    } else {
      clearSavedProgress();
      setQuestionIndex(0);
      setAnswers([]);
    }
    setShowResumePrompt(false);
  };

  const calculateResults = () => {
    clearSavedProgress();
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

    const queryParams = new URLSearchParams({
      e: results.e,
      d: results.d,
      g: results.g,
      s: results.s,
    });

    // Preservar parâmetros de comparação se existirem
    const compareE = searchParams.get('compareE');
    if (compareE) queryParams.set('compareE', compareE);

    const compareD = searchParams.get('compareD');
    if (compareD) queryParams.set('compareD', compareD);

    const compareG = searchParams.get('compareG');
    if (compareG) queryParams.set('compareG', compareG);

    const compareS = searchParams.get('compareS');
    if (compareS) queryParams.set('compareS', compareS);

    router.push(`/results?${queryParams.toString()}`);
  };

  // Progress percentage
  const progress = ((questionIndex) / questions.length) * 100;

  // Check if in challenge mode
  const isChallengeMode = searchParams.get('compareE') !== null;

  // Evitar hidration mismatch travando a renderização até montar no client
  if (!isClientLoaded) return null;

  // Se tem prompt pendente, renderizar overlay de aviso
  if (showResumePrompt) {
    return (
      <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border border-gray-100 dark:border-gray-700"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Swords className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black mb-4 dark:text-gray-100">Teste em Andamento</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Detectamos que você já havia respondido <strong>{savedData?.index}</strong> de {questions.length} perguntas. Deseja continuar de onde parou ou recomeçar?
          </p>
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              onClick={() => handleResume(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-bold shadow-lg"
            >
              Continuar Teste
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleResume(false)}
              className="w-full rounded-xl py-6 text-lg font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            >
              Recomeçar do Zero
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="text-center my-8 w-full max-w-2xl">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">Teste Político</h1>
        </div>

        {isChallengeMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4 flex items-center justify-center gap-3 text-yellow-800 dark:text-yellow-200"
          >
            <Swords className="w-6 h-6" />
            <div>
              <p className="font-bold text-base">Modo Desafio</p>
              <p className="text-sm opacity-90">Você foi desafiado! Complete o teste para comparar seus resultados.</p>
            </div>
          </motion.div>
        )}

        {/* Barra de Progresso */}
        <div
          className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-2"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do Teste"
        >
          <motion.div
            className="bg-blue-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
          {Math.round(progress)}% completo
        </p>
      </header>

      <main className="text-center w-full max-w-2xl px-2">
        <h2 className="text-base text-gray-500 dark:text-gray-400 font-normal mb-2 uppercase tracking-wider">
          Pergunta {questionIndex + 1} de {questions.length}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            <div
              className="px-8 py-10 border border-gray-200 dark:border-gray-700 rounded-2xl min-h-[160px] flex items-center justify-center bg-white dark:bg-gray-800 shadow-xl mb-8"
              aria-live="polite"
              aria-atomic="true"
            >
              <p
                className="text-2xl text-gray-900 dark:text-gray-100 font-medium text-center leading-relaxed"
                id="question-text"
              >
                {questions[questionIndex].question}
              </p>
            </div>

            <div
              className="space-y-3"
              role="group"
              aria-labelledby="question-text"
            >
              <Button
                onClick={() => handleAnswer(1.0)}
                aria-label="Concordo Totalmente com a afirmação"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-base md:text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md focus-visible:ring-4 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                Concordo Totalmente
              </Button>
              <Button
                onClick={() => handleAnswer(0.5)}
                aria-label="Concordo parcialmente com a afirmação"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-base md:text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] opacity-90 hover:opacity-100 focus-visible:ring-4 focus-visible:ring-emerald-400 focus-visible:outline-none"
              >
                Concordo
              </Button>
              <Button
                onClick={() => handleAnswer(0.0)}
                aria-label="Sem opinião formada ou neutro sobre a afirmação"
                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 text-base md:text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-gray-400 focus-visible:outline-none"
              >
                Neutro / Não sei
              </Button>
              <Button
                onClick={() => handleAnswer(-0.5)}
                aria-label="Discordo parcialmente da afirmação"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white text-base md:text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] opacity-90 hover:opacity-100 focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:outline-none"
              >
                Discordo
              </Button>
              <Button
                onClick={() => handleAnswer(-1.0)}
                aria-label="Discordo Totalmente da afirmação"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-base md:text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md focus-visible:ring-4 focus-visible:ring-rose-500 focus-visible:outline-none"
              >
                Discordo Totalmente
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-start">
          <Button
            onClick={handlePrev}
            disabled={questionIndex === 0}
            variant="ghost"
            aria-label="Voltar para a pergunta anterior"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none"
          >
            ← Voltar
          </Button>
        </div>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-800 w-full text-gray-500 dark:text-gray-400 text-sm hidden">
        <p>&copy; 2025 - Teste Político 8 Valores</p>
      </footer>
    </div>
  );
};

export default function Quiz() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <QuizContent />
    </Suspense>
  );
}
