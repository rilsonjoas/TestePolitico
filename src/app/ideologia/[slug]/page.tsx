import { ideologies, slugify } from '@/lib/data';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';



// Gera os parâmetros estáticos para todas as ideologias no build time
export async function generateStaticParams() {
  return ideologies.map((ideology) => ({
    slug: slugify(ideology.name),
  }));
}

// Gera metadados dinâmicos para SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ideology = ideologies.find((i) => slugify(i.name) === slug);

  if (!ideology) {
    return {
      title: 'Ideologia Não Encontrada',
    };
  }

  return {
    title: `O que é ${ideology.name}? - Teste Político 8 Valores`,
    description: ideology.desc,
    openGraph: {
      title: `Saiba tudo sobre ${ideology.name}`,
      description: ideology.desc,
      type: 'article',
    },
  };
}

export default async function IdeologyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ideology = ideologies.find((i) => slugify(i.name) === slug);

  if (!ideology) {
    notFound();
  }

  const stats = ideology.stats || { econ: 50, dipl: 50, govt: 50, scty: 50 };

  const axes = [
    { name: 'Econômico', value: stats.econ, label1: 'Igualdade', label2: 'Mercado', color1: '#e63946', color2: '#1d3557' },
    { name: 'Diplomático', value: stats.dipl, label1: 'Nação', label2: 'Global', color1: '#f77f00', color2: '#a8dadc' },
    { name: 'Civil', value: stats.govt, label1: 'Liberdade', label2: 'Autoridade', color1: '#ffc300', color2: '#457b9d' },
    { name: 'Social', value: stats.scty, label1: 'Tradição', label2: 'Progresso', color1: '#8338ec', color2: '#3a86ff' },
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
        <h1 className="text-4xl md:text-6xl font-black mt-8 mb-4 text-gray-900 dark:text-white">
          {ideology.name}
        </h1>
        <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full" />
      </header>

      <main className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        
        {/* Descrição */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">O que é?</h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">
            {ideology.desc}
          </p>
        </section>

        {/* Estatísticas Médias */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">Valores Médios</h2>
          <div className="space-y-6">
            {axes.map((axis) => (
              <div key={axis.name}>
                <div className="flex justify-between mb-2 font-medium text-sm text-gray-500 dark:text-gray-400">
                  <span>{axis.label1}</span>
                  <span>{axis.label2}</span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${axis.value}%`, background: axis.color1 }} 
                    className="h-full"
                  />
                  <div 
                    style={{ width: `${100 - axis.value}%`, background: axis.color2 }} 
                    className="h-full"
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs font-bold text-gray-700 dark:text-gray-300">
                  <span>{axis.value}%</span>
                  <span>{100 - axis.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Figuras Políticas e Livros */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🏛️</span> Figuras Associadas
            </h2>
            <ul className="space-y-3">
              {ideology.politicians.map((p, i) => (
                <li key={i} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      {p.name}
                    </a>
                  ) : (
                    <span className="font-medium">{p.name}</span>
                  )}
                </li>
              ))}
              {ideology.politicians.length === 0 && <li className="text-gray-500 italic">Nenhuma figura listada.</li>}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📚</span> Leituras Recomendadas
            </h2>
            <ul className="space-y-3">
              {ideology.books.map((b, i) => (
                <li key={i} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  {b.link ? (
                    <a href={b.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      {b.title}
                    </a>
                  ) : (
                    <span className="font-medium">{b.title}</span>
                  )}
                </li>
              ))}
               {ideology.books.length === 0 && <li className="text-gray-500 italic">Nenhuma leitura listada.</li>}
            </ul>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Você se identifica com o {ideology.name}?</h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            Faça nosso teste agora mesmo e descubra exatamente onde você se encaixa no espectro político.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 h-auto">
              Iniciar Teste Político
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
