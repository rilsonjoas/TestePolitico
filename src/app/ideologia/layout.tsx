import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enciclopédia de Ideologias',
  description: 'Explore mais de 40 ideologias políticas. Entenda as diferenças entre esquerda, direita, liberalismo, conservadorismo e muito mais.',
};

export default function IdeologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
