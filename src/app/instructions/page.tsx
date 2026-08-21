import type { Metadata } from 'next';
import { InstructionsClient } from './InstructionsClient';
import { questions } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Instruções do Teste',
  description: `Saiba como funciona o Teste Político. Responda ${questions.length} perguntas e descubra sua ideologia política em 5 minutos.`,
};

export default function Instructions() {
  return <InstructionsClient />;
}
