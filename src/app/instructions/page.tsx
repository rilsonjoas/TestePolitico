import type { Metadata } from 'next';
import { InstructionsClient } from './InstructionsClient';

export const metadata: Metadata = {
  title: 'Instruções do Teste',
  description: 'Saiba como funciona o Teste Político 8 Valores. Responda 70 perguntas e descubra sua ideologia política em 5 minutos.',
};

export default function Instructions() {
  return <InstructionsClient />;
}
