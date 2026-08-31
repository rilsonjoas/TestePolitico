import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { eixosData } from '@/lib/eixosData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Scale, CircleDollarSign, Globe, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guia dos 4 Eixos Políticos | Teste Político 8 Valores',
  description: 'Entenda como funcionam os 4 eixos políticos da nossa bússola: Econômico, Diplomático, Civil e Social. Descubra os valores e teorias por trás do espectro político.',
  openGraph: {
    title: 'Guia Completo dos 4 Eixos do Espectro Político',
    description: 'Aprenda sobre Igualdade vs Mercado, Nação vs Global, Liberdade vs Autoridade e Tradição vs Progresso.',
    type: 'website',
  },
};

const axisIcons: Record<string, React.ReactNode> = {
  economico: <CircleDollarSign className="text-red-500" size={32} />,
  diplomatico: <Globe className="text-orange-500" size={32} />,
  civil: <Scale className="text-yellow-500" size={32} />,
  social: <Landmark className="text-purple-500" size={32} />,
};

export default function EixosIndexPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <header className="flex flex-col items-center text-center mb-16">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
            Enciclopédia dos <span className="text-blue-600 dark:text-blue-400">4 Eixos Políticos</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2 mb-4">
            Compreenda a estrutura quadridimensional do pensamento político
          </p>
        </Link>
        <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mt-2" />
      </header>

      <main className="space-y-12">
        {/* Introdução Teórica */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <BookOpen size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Por que 4 eixos em vez de uma linha reta?
            </h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              Classificar ideologias e eleitores apenas entre &ldquo;Esquerda&rdquo; e &ldquo;Direita&rdquo; é uma simplificação histórica herdada da Revolução Francesa de 1789. Na sociedade contemporânea, esse modelo unidimensional esconde contradições fundamentais.
            </p>
            <p>
              Por exemplo, alguém pode apoiar o livre mercado na economia (visão liberal) e ao mesmo tempo defender fronteiras abertas e causas ambientais mundiais (visão globalista). Outra pessoa pode ser a favor da redistribuição de renda estatal (visão socialista) e simultaneamente defender valores tradicionais morais e religiosos (visão conservadora).
            </p>
            <p>
              Nosso modelo utiliza <strong>4 eixos independentes</strong> (que resultam em <strong>8 valores opostos</strong>), permitindo mapear a complexidade do pensamento humano com rigor matemático e imparcialidade.
            </p>
          </div>
        </section>

        {/* Grid dos 4 Eixos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eixosData.map((axis) => (
            <Card
              key={axis.slug}
              className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between rounded-3xl overflow-hidden"
            >
              <div>
                <CardHeader className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                      {axisIcons[axis.slug]}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
                      {axis.leftValue.name} vs {axis.rightValue.name}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {axis.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 md:p-8 space-y-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                    {axis.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-300">
                      <div className="font-bold uppercase tracking-wider mb-1" style={{ color: axis.leftValue.color }}>
                        {axis.leftValue.name}
                      </div>
                      <p className="line-clamp-2 text-gray-600 dark:text-gray-400 font-normal">
                        {axis.leftValue.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-300">
                      <div className="font-bold uppercase tracking-wider mb-1" style={{ color: axis.rightValue.color }}>
                        {axis.rightValue.name}
                      </div>
                      <p className="line-clamp-2 text-gray-600 dark:text-gray-400 font-normal">
                        {axis.rightValue.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="p-6 md:p-8 pt-0">
                <Link href={`/eixos/${axis.slug}`}>
                  <Button className="w-full font-bold flex items-center justify-center gap-2 py-6 rounded-2xl text-base shadow-md">
                    Explorar {axis.name} em detalhes
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </section>

        {/* CTA para Teste & Metodologia */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center space-y-6">
          <h3 className="text-2xl md:text-4xl font-black">
            Pronto para descobrir onde você se posiciona nesses 4 eixos?
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Nosso questionário analisa suas respostas e calcula exatamente o percentual do seu perfil em cada um dos 8 valores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/quiz">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-black text-blue-900 px-8 py-6 text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform">
                FAZER O TESTE AGORA
              </Button>
            </Link>
            <Link href="/metodologia">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl">
                Ver Metodologia Matemática
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
