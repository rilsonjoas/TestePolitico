import { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { questions, ideologies } from '@/lib/data';
import { Scale, Binary, Sigma, ShieldCheck } from 'lucide-react';
import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { FAQSection, FAQItem } from '@/components/FAQSection';
import { JsonLd } from '@/components/JsonLd';

const metodologiaFaqs: FAQItem[] = [
  {
    question: "Como o algoritmo calcula a porcentagem de afinidade com uma ideologia?",
    answer: "Usamos a fórmula da Distância Euclidiana quadridimensional para medir a distância entre suas coordenadas nos 4 eixos e as coordenadas teóricas de cada ideologia. Essa distância é normalizada estatisticamente para gerar uma afinidade de 0% a 100%."
  },
  {
    question: "O Teste Político armazena minhas respostas ou dados pessoais?",
    answer: "Não. O teste é 100% privado e executado client-side no seu navegador. Suas respostas não são salvas em nenhum servidor ou banco de dados."
  },
  {
    question: "O que acontece se eu escolher a opção 'Neutro' nas perguntas?",
    answer: "Respostas neutras mantêm sua pontuação próxima do centro (50%), resultando em maior afinidade com ideologias de centro, moderadas ou sincréticas."
  },
  {
    question: "De onde vêm os 4 eixos do teste?",
    answer: "Os 4 eixos (Econômico, Diplomático, Civil e Social) baseiam-se nos modelos clássicos da Ciência Política e em projetos de código aberto como 8values e Politiscales, com adaptações conceituais para a realidade brasileira."
  },
  {
    question: "Como é garantida a imparcialidade das perguntas?",
    answer: "Cada enunciado é formulado sem adjetivos pejorativos ou juízos de valor, permitindo que defensores de ambos os lados se identifiquem com as opções."
  }
];

export const metadata: Metadata = {
  title: 'Metodologia Matemática & Algoritmo | Teste Político',
  description: 'Conheça o rigor matemático por trás do Teste Político: álgebra linear em espaço quadridimensional, distância euclidiana e cálculo de afinidade ideológica.',
  openGraph: {
    title: 'Metodologia Matemática do Teste Político 8 Valores',
    description: 'Entenda como calculamos seu posicionamento político usando distância euclidiana em 4D e normalização estatística.',
    type: 'article',
  },
};

export default function MetodologiaPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Metodologia Matemática do Teste Político 8 Valores',
    description: 'Entenda o algoritmo determinístico de Álgebra Linear em espaço quadridimensional R4 e cálculo de Distância Euclidiana.',
    url: 'https://testepolitico.com.br/metodologia',
    publisher: {
      '@type': 'Organization',
      name: 'Teste Político',
      url: 'https://testepolitico.com.br',
    },
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <JsonLd data={schemaData} />
      <BreadcrumbNav items={[{ label: 'Metodologia' }]} />

      <header className="flex flex-col items-center text-center mb-16">
        <Link href="/" className="group flex flex-col items-center gap-4 transition-all duration-300">
          <Logo size={80} showText={false} className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mt-4 tracking-tight">
            Metodologia <span className="text-blue-600 dark:text-blue-400">Matemática</span>
          </h1>
          <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2 mb-4">
            Álgebra Linear e Estatística a Serviço da Ciência Política
          </p>
        </Link>
        <div className="h-1 w-24 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mt-2" />
      </header>

      <main className="space-y-12">
        {/* Resumo da Abordagem */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400">
              <Binary size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Sem Caixas-Pretas ou IAs Ocultas
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            O **Teste Político 8 Valores** foi desenhado com o compromisso da transparência matemática. Diferente de algoritmos opacos de redes sociais ou ferramentas baseadas em IA generativa sem regras fixas, cada resultado neste teste é calculado através de **Álgebra Linear determinística em um espaço Euclidiano quadridimensional (ℝ⁴)**.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ao responder às **{questions.length} perguntas**, o sistema gera um vetor de coordenadas únicas que é comparado com os perfis exatos de **{ideologies.length} ideologias catalogadas** na base de dados.
          </p>
        </section>

        {/* Passo 1: O Espaço Quadridimensional */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800">
              Etapa 1
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              O Espaço Vetorial (ℝ⁴)
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cada indivíduo ou ideologia é representado por um vetor de 4 coordenadas no intervalo [-100, +100] (posteriormente normalizado para [0%, 100%]):
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 font-mono text-sm space-y-2 text-gray-800 dark:text-gray-200">
            <p className="font-bold text-blue-600 dark:text-blue-400">Vetor = (Econômico, Diplomático, Civil, Social)</p>
            <p>• Econômico (E): 0% (Igualdade) → 100% (Mercado)</p>
            <p>• Diplomático (D): 0% (Global) → 100% (Nação)</p>
            <p>• Civil (G): 0% (Liberdade) → 100% (Autoridade)</p>
            <p>• Social (S): 0% (Progresso) → 100% (Tradição)</p>
          </div>
        </section>

        {/* Passo 2: O Algoritmo de Distância Euclidiana */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800">
              Etapa 2
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sigma size={28} />
              Cálculo da Distância Euclidiana em 4D
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Para encontrar com qual ideologia um usuário mais se assemelha, o algoritmo calcula a **Distância Euclidiana** entre o vetor do usuário U = (E_u, D_u, G_u, S_u) e o vetor de referência de cada ideologia I = (E_i, D_i, G_i, S_i):
          </p>

          {/* Math Box */}
          <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-inner font-mono text-center space-y-4 overflow-x-auto">
            <p className="text-gray-400 text-xs uppercase tracking-widest">Fórmula da Distância Euclidiana em ℝ⁴</p>
            <div className="text-xl md:text-2xl font-bold text-emerald-400">
              {`d(U, I) = √[ (E_u - E_i)² + (D_u - D_i)² + (G_u - G_i)² + (S_u - S_i)² ]`}
            </div>
            <p className="text-xs text-gray-400">
              Quanto menor a distância geométrica d, mais semelhantes são as visões políticas.
            </p>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Normalização em Porcentagem de Match</h3>
            <p>
              Como a distância geométrica bruta não é intuitiva para o público geral, o sistema aplica um normalizador linear onde a distância máxima teórica entre dois polos opostos em 4 dimensões é dada por:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl font-mono text-sm text-center border border-gray-200 dark:border-gray-700">
              {`d_máxima = √[ 100² × 4 ] = √40000 = 200`}
            </div>
            <p>
              A porcentagem final de afinidade (ou *Match Percentage*) é calculada por:
            </p>
            <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl font-mono text-sm text-center border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-bold">
              {`Afinidade (%) = max( 0, 100 × ( 1 - d / 200 ) )`}
            </div>
          </div>
        </section>

        {/* Passo 3: Pesos Elásticos das Perguntas */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
            <span className="text-xs font-black uppercase tracking-widest px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-100 dark:border-blue-800">
              Etapa 3
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pesos Elásticos das Perguntas
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nem todas as afirmações possuem a mesma relevância ideológica. Para garantir precisão, cada uma das {questions.length} perguntas possui um vetor de efeito pré-definido com pesos elásticos (normalmente de 5 a 20 pontos de impacto por eixo):
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-2xl font-black text-blue-600">5 pts</span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Impacto Suave</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Afirmações de tendência secundária ou nuances morais gentis.</p>
            </div>
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-2xl font-black text-blue-600">10 pts</span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Impacto Padrão</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Perguntas estruturais sobre economia, impostos e leis civis.</p>
            </div>
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <span className="text-2xl font-black text-blue-600">20 pts</span>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">Impacto Crítico</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Questões divisórias profundas que definem extremidades ideológicas.</p>
            </div>
          </div>
        </section>

        {/* Tabela Comparativa de Modelos */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Scale className="text-blue-600 dark:text-blue-400" size={24} />
            Comparativo de Sistemas de Mapeamento Político
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold bg-gray-50 dark:bg-gray-900/50">
                  <th className="p-4 rounded-tl-xl">Modelo</th>
                  <th className="p-4">Dimensões</th>
                  <th className="p-4">Vantagens</th>
                  <th className="p-4 rounded-tr-xl">Limitações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">1 Eixo (Esquerda / Direita)</td>
                  <td className="p-4">1D (ℝ¹)</td>
                  <td className="p-4">Simplicidade de comunicação jornalística.</td>
                  <td className="p-4">Mistura economia, diplomacia e costumes no mesmo pacote.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">Political Compass Clássico</td>
                  <td className="p-4">2D (ℝ²)</td>
                  <td className="p-4">Separa economia de autoridade estatal.</td>
                  <td className="p-4">Ignora a diplomacia (globalismo) e a guerra cultural (tradição).</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-900/20 font-medium">
                  <td className="p-4 font-black text-blue-600 dark:text-blue-400">Teste Político 8 Valores</td>
                  <td className="p-4 font-bold">4D (ℝ⁴)</td>
                  <td className="p-4 font-semibold text-gray-900 dark:text-white">Mapeamento completo (Econômico, Diplomático, Civil, Social).</td>
                  <td className="p-4">Exige maior número de perguntas ({questions.length}) para precisão.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Compromisso com Neutralidade e Auditabilidade */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck size={28} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Código Aberto e Auditabilidade
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Todo o código que executa o cálculo de distância euclidiana e normalização é **100% público e de código aberto**. Qualquer pesquisador, estudante ou cientista político pode inspecionar exatamente o algoritmo no nosso repositório no GitHub:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
              <code>src/lib/data.ts — function getClosestPolitician() & getMatchPercentage()</code>
            </div>
            <a
              href="https://github.com/rilsonjoas/TestePolitico"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Auditar no GitHub
            </a>
          </div>
        </section>

        {/* Perguntas Frequentes da Metodologia */}
        <FAQSection items={metodologiaFaqs} />

        {/* CTAs */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center space-y-6">
          <h3 className="text-2xl md:text-4xl font-black">
            Veja a matemática em ação no seu perfil
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Responda o teste de 5 minutos e receba seu relatório com gráfico cartesiano e afinidade matemática com 40+ ideologias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/quiz">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto font-black text-blue-900 px-8 py-6 text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform">
                INICIAR O TESTE
              </Button>
            </Link>
            <Link href="/eixos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-bold border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-2xl">
                Explorar os 4 Eixos Políticos
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
