import { ideologies, slugify } from '@/lib/data';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookCard } from '@/components/BookCard';
import { Metadata } from 'next';
import {
  Users,
  BookOpen,
  ExternalLink,
  Shield,
  ArrowLeft,
  Info,
  History,
  Lightbulb,
} from 'lucide-react';

export async function generateStaticParams() {
  return ideologies.map((ideology) => ({
    slug: slugify(ideology.name),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const ideology = ideologies.find((i) => slugify(i.name) === p.slug);
  if (!ideology) return {};

  return {
    title: `O que é ${ideology.name}? | Teste Político 8 Valores`,
    description: ideology.desc,
    openGraph: {
      title: `${ideology.name} - Significado e Políticos Principais`,
      description: ideology.content?.history || ideology.desc,
      siteName: 'Teste Político 8 Valores',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ideology.name} | Enciclopédia Política`,
      description: ideology.desc,
    },
  };
}

export default async function IdeologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const ideology = ideologies.find((i) => slugify(i.name) === p.slug);

  if (!ideology) {
    notFound();
  }

  const stats = ideology.stats || { econ: 50, dipl: 50, govt: 50, scty: 50 };

  const axes = [
    { name: 'Econômico', value: stats.econ, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
    { name: 'Diplomático', value: stats.dipl, label1: 'Global', label2: 'Nação', color1: '#a8dadc', color2: '#f77f00' },
    { name: 'Civil', value: stats.govt, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
    { name: 'Social', value: stats.scty, label1: 'Progresso', label2: 'Tradição', color1: '#3a86ff', color2: '#8338ec' },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center min-h-screen">
      <header className="flex flex-col items-center mb-12 w-full max-w-2xl">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} />
          <p className="text-sm uppercase tracking-[0.3em] font-bold text-gray-500 dark:text-gray-500">
            Enciclopédia de Ideologias
          </p>
        </Link>
        <h1 className="text-4xl md:text-6xl font-black mt-8 mb-4 text-gray-900 dark:text-white text-center">
          {ideology.name}
        </h1>
        <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
      </header>

      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal: Conteúdo Expandido e Stats */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6 text-blue-600 dark:text-blue-400">
                <Info size={24} />
                <h2 className="text-2xl font-bold">Resumo</h2>
              </div>
              <div className="space-y-4">
                {ideology.desc.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {ideology.content && (
              <>
                <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6 text-indigo-600 dark:text-indigo-400">
                    <History size={24} />
                    <h2 className="text-2xl font-bold">Contexto Histórico</h2>
                  </div>
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {ideology.content.history}
                  </p>
                </section>

                <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6 text-teal-600 dark:text-teal-400">
                    <Shield size={24} />
                    <h2 className="text-2xl font-bold">Princípios Fundamentais</h2>
                  </div>
                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    {ideology.content.corePrinciples}
                  </p>
                </section>

                <section className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-8 border-2 border-dashed border-amber-200 dark:border-amber-800/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-400 dark:bg-amber-600" />
                  <div className="flex items-center gap-3 mb-4 text-amber-600 dark:text-amber-500">
                    <Lightbulb size={24} />
                    <h2 className="text-xl font-black">Curiosidade</h2>
                  </div>
                  <p className="text-base font-medium italic leading-relaxed text-amber-800 dark:text-amber-200">
                    &quot;{ideology.content.curiosities}&quot;
                  </p>
                </section>
              </>
            )}

            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-8 text-blue-600 dark:text-blue-400">
                <Shield size={24} />
                <h2 className="text-2xl font-bold">Valores matemáticos médios</h2>
              </div>
              <div className="space-y-8">
                {axes.map((axis) => (
                  <div key={axis.name} className="space-y-2">
                    <div className="flex justify-between font-bold text-xs uppercase tracking-widest text-gray-400">
                      <span>{axis.label1}</span>
                      <span>{axis.label2}</span>
                    </div>
                    <div className="h-4 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden flex p-0.5 border border-gray-200 dark:border-gray-700">
                      <div
                        style={{ width: `${axis.value}%`, background: axis.color1 }}
                        className="h-full rounded-l-full"
                      />
                      <div
                        style={{ width: `${100 - axis.value}%`, background: axis.color2 }}
                        className="h-full rounded-r-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm font-black italic">
                      <span style={{ color: axis.color1 }}>{axis.value}%</span>
                      <span style={{ color: axis.color2 }}>{100 - axis.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Coluna Lateral: Figuras e Livros */}
          <div className="space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white">
                <Users size={20} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold">Figuras associadas</h2>
              </div>
              <div className="space-y-3">
                {ideology.politicians.map((p, i) => (
                  <a
                    key={i}
                    href={p.link || '#'}
                    target={p.link ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${p.link
                      ? 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:shadow-md cursor-pointer'
                      : 'bg-white dark:bg-transparent border-gray-50 dark:border-gray-800 cursor-default'
                      }`}
                  >
                    <div className="flex items-center gap-3 w-4/5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Users size={14} />
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {p.name}
                      </span>
                    </div>
                    {p.link && <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />}
                  </a>
                ))}
                {ideology.politicians.length === 0 && <p className="text-gray-500 italic text-center py-4 text-sm">Nenhuma figura listada.</p>}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6 text-gray-900 dark:text-white px-2">
                <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold">Leituras recomendadas</h2>
              </div>
              <div className="space-y-4">
                {ideology.books.map((b, i) => (
                  <BookCard
                    key={i}
                    title={b.title}
                    link={b.link}
                  />
                ))}
                {ideology.books.length === 0 && <p className="text-gray-500 italic text-center py-4 text-sm px-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">Nenhuma leitura sugerida no momento.</p>}
              </div>
            </section>
          </div>
        </div>

        {/* CTA Integrado mais elegante */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1 rounded-3xl overflow-hidden shadow-2xl mt-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[1.4rem] text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Você se identifica com o {ideology.name}?
            </h3>
            <p className="mb-8 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Faça nosso teste agora mesmo e descubra exatamente onde você se encaixa no espectro político.
            </p>
            <Link href="/quiz">
              <Button size="lg" className="w-full sm:w-auto text-lg px-12 py-7 h-auto font-black shadow-lg hover:shadow-blue-500/25 transition-all">
                INICIAR TESTE AGORA
              </Button>
            </Link>
          </div>
        </section>

        <div className="mt-16 text-center pb-12">
          <Link href="/ideologia">
            <Button variant="ghost" className="text-gray-500 hover:text-blue-600 flex items-center gap-2 mx-auto font-bold">
              <ArrowLeft size={16} />
              Voltar para a lista completa de ideologias
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
