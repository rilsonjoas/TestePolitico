'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { questions } from '@/lib/data';

import { quizEvents } from '@/lib/analytics';

export function InstructionsClient() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
          Instruções do <span className="text-blue-600 dark:text-blue-400">Teste</span>
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] font-bold text-gray-500 dark:text-gray-500">
          Prepare-se para começar
        </p>
      </header>

      <main className="space-y-10">
        {/* O que é o teste */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">O que é o Teste Político?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
            O Teste Político é um questionário composto por <strong>{questions.length} perguntas</strong> que analisa suas opiniões sobre economia, diplomacia, estado e sociedade. Cada resposta afeta sua pontuação em um ou mais dos <strong>8 valores políticos</strong> que medimos. Ao final, você recebe um perfil detalhado do seu posicionamento ideológico, comparado com mais de <strong>40 ideologias</strong> mapeadas.
          </p>
        </section>

        {/* Como responder */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">Como responder cada pergunta</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
            Cada pergunta apresenta uma afirmação e cinco opções de resposta. Para cada uma,
            escolha o grau de concordância que melhor representa sua opinião:
          </p>
          <div className="grid sm:grid-cols-5 gap-3">
            {[
              { label: 'Discordo totalmente', color: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300', icon: '✕' },
              { label: 'Discordo', color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300', icon: '−' },
              { label: 'Neutro', color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300', icon: '=' },
              { label: 'Concordo', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300', icon: '+' },
              { label: 'Concordo totalmente', color: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300', icon: '✓' },
            ].map((option) => (
              <div
                key={option.label}
                className={`${option.color} rounded-xl p-3 text-center transition-all hover:scale-105`}
              >
                <div className="text-2xl font-bold mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 text-center">
            Dica: responda de forma consistente e sincera. Pense em como você reagiria se cada situação descrita na pergunta realmente acontecesse na sua vida.
          </p>
        </section>

        {/* O que impacta */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">O que impacta sua pontuação</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
            Cada pergunta está associada a um ou mais valores políticos. Quando você responde, seus pontos são distribuídos entre esses valores. Por exemplo:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 md:p-8 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Uma pergunta sobre <em>&ldquo;impostos progressivos&rdquo;</em> pode pontuar nos valores de <strong>Igualdade</strong> (eixo econômico) e também em <strong>Autoridade</strong> (eixo civil), dependendo do contexto. Outra pergunta sobre <em>&ldquo;cooperação internacional&rdquo;</em> pode impactar <strong>Global</strong> (eixo diplomático) e <strong>Progresso</strong> (eixo social).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Ao final das {questions.length} perguntas, seus pontos são normalizados em percentuais para cada um dos 8 valores. Esses percentuais são comparados com os perfis ideológicos da nossa base de dados usando uma métrica de distância estatística, determinando qual ideologia mais se aproxima do seu posicionamento.
            </p>
          </div>
        </section>

        {/* O que você vai receber */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">O que você vai receber</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
            Ao final do teste, você terá acesso a um relatório completo que inclui:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Mapa Political Compass</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Posicionamento visual no mapa político bidimensional (eixo econômico × social), permitindo ver onde suas opiniões se encaixam no espectro.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30">
              <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">Porcentagem de cada eixo</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Gráfico detalhado mostrando sua pontuação nos 8 valores: Igualdade, Mercado, Nação, Global, Liberdade, Autoridade, Tradição e Progresso.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-xl p-5 border border-green-100 dark:border-green-900/30">
              <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">Top 3 ideologias</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                As três ideologias que mais se aproximam das suas respostas, com explicação detalhada de cada uma e por que foram selecionadas.
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-5 border border-yellow-100 dark:border-yellow-900/30">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">40+ ideologias</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Lista completa das ideologias comparadas com suas porcentagens de compatibilidade, organizadas por afinidade.
              </p>
            </div>
          </div>
        </section>

        {/* Dicas para um melhor resultado */}
        <section className="bg-white dark:bg-gray-800/50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-center">Dicas para um melhor resultado</h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold text-xl shrink-0">1.</span>
              <p>Responda com sinceridade. Não existe resposta certa ou errada — o objetivo é mapear sua opinião real, não a que você acha que seria &ldquo;correta&rdquo;.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold text-xl shrink-0">2.</span>
              <p>Não tente &ldquo;hackear&rdquo; o teste respondendo de forma inconsistente para obter um resultado específico. Isso distorce os resultados e torna a experiência menos útil.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold text-xl shrink-0">3.</span>
              <p>Considere cada pergunta independentemente. Não pense em como uma resposta pode &ldquo;anular&rdquo; outra. Cada pergunta é avaliada separadamente.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold text-xl shrink-0">4.</span>
              <p>Leia cada pergunta com atenção. Afirmações com duplo sentido ou palavras como &ldquo;nunca&rdquo; e &ldquo;sempre&rdquo; podem mudar completamente o significado.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-500 font-bold text-xl shrink-0">5.</span>
              <p>Dedique cerca de 10-15 minutos para completar o teste com calma. Respostas rápidas demais podem não refletir sua opinião verdadeira.</p>
            </li>
          </ul>
        </section>

        {/* Privacidade */}
        <section className="bg-green-50 dark:bg-green-900/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-green-100 dark:border-green-900/30">
          <h2 className="text-2xl font-bold mb-4 text-center text-green-800 dark:text-green-300">
            Sua privacidade está protegida
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
            Todo o cálculo é feito <strong>inteiramente no seu navegador</strong>. Nenhuma resposta ou dado pessoal é enviado para nossos servidores. Suas respostas existem apenas no seu dispositivo enquanto o navegador estiver aberto. Saiba mais na nossa{" "}
            <Link href="/privacidade" className="text-green-700 dark:text-green-400 hover:underline">
              Política de Privacidade
            </Link>.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-4 pb-8">
          <Link href="/quiz">
            <Button
              size="lg"
              className="w-full sm:w-80 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
              onClick={() => quizEvents.started()}
            >
              Iniciar o Teste
            </Button>
          </Link>
          <Link href="/" className="inline-block mt-4">
            <Button size="lg" variant="ghost" className="font-semibold">
              ← Voltar para o início
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
