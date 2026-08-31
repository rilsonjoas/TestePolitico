import { eixosData, getAxisBySlug } from '@/lib/eixosData';
import { ideologies, slugify } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { JsonLd } from '@/components/JsonLd';
import { ArrowLeft, BookOpen, CheckCircle2, Shield, Users, Layers } from 'lucide-react';

export async function generateStaticParams() {
  return eixosData.map((axis) => ({
    slug: axis.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const axis = getAxisBySlug(slug);
  if (!axis) return {};

  return {
    title: `${axis.name}: ${axis.leftValue.name} vs ${axis.rightValue.name} | Teste Político`,
    description: axis.shortDescription,
    openGraph: {
      title: `${axis.name} - Entenda os Espectros Políticos`,
      description: axis.overview,
      type: 'article',
    },
  };
}

export default async function AxisDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const axis = getAxisBySlug(slug);

  if (!axis) {
    notFound();
  }

  // Filtrar ideologias relacionadas que combinam com os nomes
  const matchedIdeologies = ideologies.filter((ideo) =>
    axis.relatedIdeologyNames.some((name) =>
      ideo.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(ideo.name.toLowerCase())
    )
  );

  const baseUrl = 'https://testepolitico.com.br';

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Eixo ${axis.name}: ${axis.leftValue.name} vs ${axis.rightValue.name}`,
    description: axis.overview,
    url: `${baseUrl}/eixos/${axis.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Teste Político',
      url: baseUrl,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={schemaData} />
      <BreadcrumbNav
        items={[
          { label: '4 Eixos', href: '/eixos' },
          { label: axis.name },
        ]}
      />

      <header className="flex flex-col items-center mb-12 text-center">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} />
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-gray-500 dark:text-gray-500">
            Enciclopédia dos Eixos Políticos
          </p>
        </Link>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mt-6 mb-4 text-gray-900 dark:text-white">
          {axis.name}
        </h1>
        <div className="flex items-center gap-3 text-lg font-bold text-blue-600 dark:text-blue-400">
          <span style={{ color: axis.leftValue.color }}>{axis.leftValue.name}</span>
          <span className="text-gray-400">vs</span>
          <span style={{ color: axis.rightValue.color }}>{axis.rightValue.name}</span>
        </div>
        <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mt-6" />
      </header>

      <main className="space-y-12">
        {/* Visão Geral */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
            <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
            Visão Geral do Eixo
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {axis.overview}
          </p>
          <div className="border-t border-gray-100 dark:border-gray-700/80 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Contexto Histórico</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {axis.historicalContext}
            </p>
          </div>
        </section>

        {/* Comparativo dos Dois Valores */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Valor Esquerdo */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border-t-8 border-gray-100 dark:border-gray-700 space-y-6" style={{ borderTopColor: axis.leftValue.color }}>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-gray-400">Polo A</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white" style={{ color: axis.leftValue.color }}>
                {axis.leftValue.name}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {axis.leftValue.description}
            </p>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" /> Princípios Chave
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {axis.leftValue.keyPrinciples.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Users size={14} /> Pensadores & Referências
              </h3>
              <div className="flex flex-wrap gap-2">
                {axis.leftValue.thinkers.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Valor Direito */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-xl border-t-8 border-gray-100 dark:border-gray-700 space-y-6" style={{ borderTopColor: axis.rightValue.color }}>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-gray-400">Polo B</span>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white" style={{ color: axis.rightValue.color }}>
                {axis.rightValue.name}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
              {axis.rightValue.description}
            </p>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-500" /> Princípios Chave
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {axis.rightValue.keyPrinciples.map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2">
                <Users size={14} /> Pensadores & Referências
              </h3>
              <div className="flex flex-wrap gap-2">
                {axis.rightValue.thinkers.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impacto Prático nas Políticas Públicas */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <Shield className="text-blue-600 dark:text-blue-400" size={24} />
            Impacto Prático nas Políticas Públicas
          </h2>
          <div className="space-y-6">
            {axis.policyImpacts.map((impact, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {impact.topic}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="font-bold block mb-1" style={{ color: axis.leftValue.color }}>
                      Visão de {axis.leftValue.name}:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">{impact.leftStance}</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span className="font-bold block mb-1" style={{ color: axis.rightValue.color }}>
                      Visão de {axis.rightValue.name}:
                    </span>
                    <p className="text-gray-600 dark:text-gray-300">{impact.rightStance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ideologias Relacionadas */}
        {matchedIdeologies.length > 0 && (
          <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Layers className="text-blue-600 dark:text-blue-400" size={24} />
              Ideologias Fortemente Influenciadas por este Eixo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchedIdeologies.map((ideo) => (
                <Link
                  key={ideo.name}
                  href={`/ideologia/${slugify(ideo.name)}`}
                  className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all group"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ideo.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                    {ideo.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Botão de Retorno */}
        <div className="text-center pt-8">
          <Link href="/eixos">
            <Button variant="ghost" className="text-gray-500 hover:text-blue-600 font-bold flex items-center gap-2 mx-auto">
              <ArrowLeft size={16} />
              Voltar para todos os 4 eixos
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
