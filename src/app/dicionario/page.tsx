import { Metadata } from 'next';
import DicionarioClient from './DicionarioClient';
import { JsonLd } from '@/components/JsonLd';
import { dictionaryTerms } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Dicionário de Ciência Política & Conceitos | Teste Político',
  description: 'Glossário educacional completo com definições claras sobre mais-valia, laissez-faire, welfare state, soberania, autoritarismo, progressismo e mais.',
  openGraph: {
    title: 'Dicionário de Ciência Política - Conceitos & Termos Chave',
    description: 'Entenda os principais termos e conceitos de economia, diplomacia, governo e sociedade em um glossário acessível e completo.',
    type: 'article',
  },
};

export default function DicionarioPage() {
  const baseUrl = 'https://testepolitico.com.br';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Dicionário de Ciência Política do Teste Político',
    description: 'Glossário de conceitos teóricos e práticos de ciência política, economia e sociologia.',
    url: `${baseUrl}/dicionario`,
    hasDefinedTerm: dictionaryTerms.map((term) => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.definition,
      url: `${baseUrl}/dicionario#${term.slug}`,
      inDefinedTermSet: `${baseUrl}/dicionario`,
    })),
  };

  return (
    <>
      <JsonLd data={schemaData} />
      <DicionarioClient />
    </>
  );
}
