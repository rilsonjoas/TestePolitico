
import { Suspense } from 'react';
import ResultsClient from './ResultsClient';
import { getMatchedIdeology } from '@/lib/data';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const eStr = typeof resolvedSearchParams.e === 'string' ? resolvedSearchParams.e : '50';
  const dStr = typeof resolvedSearchParams.d === 'string' ? resolvedSearchParams.d : '50';
  const gStr = typeof resolvedSearchParams.g === 'string' ? resolvedSearchParams.g : '50';
  const sStr = typeof resolvedSearchParams.s === 'string' ? resolvedSearchParams.s : '50';

  const e = parseFloat(eStr) || 50;
  const d = parseFloat(dStr) || 50;
  const g = parseFloat(gStr) || 50;
  const s = parseFloat(sStr) || 50;

  const matched = getMatchedIdeology(e, d, g, s);
  const ideologyName = matched?.name || 'Inconclusivo';

  const query = new URLSearchParams({
    e: e.toFixed(1),
    d: d.toFixed(1),
    g: g.toFixed(1),
    s: s.toFixed(1),
  });

  const title = `Meu Resultado: ${ideologyName} | Teste Político 8 Valores`;
  const description = `Fiz o Teste Político e descobri que minha ideologia mais próxima é ${ideologyName}! Descubra a sua também.`;
  const imageUrl = `https://www.testepolitico.com.br/api/og?${query.toString()}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://www.testepolitico.com.br/results?${query.toString()}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Resultado do Teste Político: ${ideologyName}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function Results() {
  return (
    <Suspense fallback={<div>Carregando resultados...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
