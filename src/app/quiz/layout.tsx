import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quiz Político',
  description: 'Responda 70 perguntas e descubra sua ideologia política. Teste completo baseado no modelo 8values.',
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
