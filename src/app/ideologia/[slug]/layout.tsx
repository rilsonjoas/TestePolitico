import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Detalhes da Ideologia',
  description: 'Conheça detalhes sobre ideologias políticas, seus valores, história e representantes.',
};

export default function IdeologyDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
