import type { Metadata } from 'next';
import { questions } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Quiz Político',
  description: `Responda ${questions.length} perguntas e descubra sua ideologia política. Teste completo baseado no modelo 8values.`,
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
