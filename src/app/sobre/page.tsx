import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Scale, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre o Método | Teste Político 8 Valores",
  description: "Entenda como funciona o Teste Político 8 Valores, nossa metodologia e o significado de cada um dos 8 valores políticos analisados.",
};

export default function SobrePage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100">
            Sobre o <span className="text-blue-600">Teste Político</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            O Teste Político 8 Valores é uma ferramenta de análise ideológica projetada para mapear 
            posicionamentos políticos através de 4 eixos fundamentais, oferecendo uma alternativa 
            mais detalhada e precisa ao tradicional espectro esquerda-direita de um único eixo.
          </p>
        </section>

        {/* Metodologia */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Scale size={32} />
            </div>
            <h2 className="text-3xl font-bold">Nossa Metodologia</h2>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              Diferente de testes simplistas que tentam encaixar todas as visões políticas em uma linha reta
              (Esquerda vs Direita) ou em um quadrado (Political Compass), nosso sistema utiliza um modelo
              multidimensional baseado em <strong>8 valores políticos opostos</strong>, agrupados em <strong>4 eixos independentes</strong>.
            </p>
            <p className="mb-4">
              O teste consiste em <strong>70 perguntas</strong> cuidadosamente selecionadas para avaliar opiniões sobre economia, 
              diplomacia, estado e sociedade. Cada resposta afeta a pontuação do usuário em um ou mais eixos, 
              resultando em um perfil político único e detalhado.
            </p>
            <p>
              Ao final, o algoritmo compara seus percentuais em cada eixo com nossa base de dados de mais de 
              <strong>40 ideologias políticas</strong> distintas para encontrar aquela que mais se aproxima das suas visões.
            </p>
          </div>
        </section>

        {/* Os 4 Eixos */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Os 4 Eixos Analisados</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-red-500">💰</span> Eixo Econômico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Igualdade vs. Mercado</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mede a preferência entre distribuição de riqueza e intervenção estatal (Igualdade) 
                  versus livre mercado e desregulamentação (Mercado).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-orange-500">🌍</span> Eixo Diplomático
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Nação vs. Global</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avalia a inclinação entre patriotismo e prioridade nacional (Nação) versus 
                  cooperação internacional e globalismo (Global).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-yellow-500">⚖️</span> Eixo Civil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Liberdade vs. Autoridade</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analisa a preferência por liberdades civis e direitos individuais (Liberdade) 
                  versus ordem social e força estatal (Autoridade).
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-purple-500">🏛️</span> Eixo Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Tradição vs. Progresso</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mede o apego a valores tradicionais e religiosos (Tradição) versus 
                  mudança social, secularismo e inovação (Progresso).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ - Importante para "Value Content" */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <BookOpen className="text-blue-600" size={28} />
             <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>
          </div>
          
          <div className="space-y-4">
             <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Meus resultados são salvos?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                   Não. Nós levamos sua privacidade a sério. Todo o cálculo é feito no seu próprio navegador 
                   e nenhum dado pessoal ou resposta é enviado para nossos servidores.
                </p>
             </div>

             <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl">
                <h3 className="font-bold text-lg mb-2">Este teste é isento?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                   Todo teste político possui algum viés inerente em suas perguntas. No entanto, nos esforçamos 
                   para criar questões equilibradas que permitam a expressão de todo o espectro político, sem 
                   favorecer uma ideologia específica.
                </p>
             </div>
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center pt-8">
          <Link 
            href="/instructions"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1"
          >
            Começar o Teste Agora
            <CheckCircle2 className="ml-2" />
          </Link>
        </div>
      </div>
    </main>
  );
}
