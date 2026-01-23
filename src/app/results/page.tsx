
import { Suspense } from 'react';
import ResultsClient from './ResultsClient';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  const e = resolvedSearchParams.e ?? '50';
  const d = resolvedSearchParams.d ?? '50';
  const g = resolvedSearchParams.g ?? '50';
  const s = resolvedSearchParams.s ?? '50';
  
  const query = new URLSearchParams({ 
    e: e.toString(), 
    d: d.toString(), 
    g: g.toString(), 
    s: s.toString() 
  });

  return {
    openGraph: {
      images: [`/api/og?${query.toString()}`],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`/api/og?${query.toString()}`],
    }
  };
}

export default function Results() {
  return (
    <Suspense fallback={<div>Carregando resultados...</div>}>
      <ResultsClient />
    </Suspense>
  );
}
