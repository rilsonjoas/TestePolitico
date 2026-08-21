import Link from "next/link";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Scale, CircleDollarSign, Globe, Landmark, Users, Lightbulb, ShieldCheck } from "lucide-react";
import { questions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sobre o método | Teste Político",
  description: "Entenda como funciona o Teste Político 8 Valores, nossa metodologia, o significado de cada um dos 8 valores políticos analisados e como garantimos neutralidade.",
};

export default function SobrePage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100">
            Sobre o <span className="text-blue-600">Teste Político</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            O Teste Político é uma ferramenta de análise ideológica projetada para mapear
            posicionamentos políticos através de 4 eixos fundamentais, oferecendo uma alternativa
            mais detalhada e precisa ao tradicional espectro esquerda-direita de um único eixo.
          </p>
        </section>

        {/* Por que existe */}
        <section className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Lightbulb size={28} />
            </div>
            <h2 className="text-2xl font-bold">Por que este teste existe?</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              A maioria das pessoas é reduzida a um único rótulo — &ldquo;esquerda&rdquo; ou &ldquo;direita&rdquo; —
              como se suas opiniões sobre economia, diplomacia, liberdades civis e costumes sociais
              pudessem ser comprimidas em uma única dimensão. Na prática, ninguém se encaixa
              perfeitamente nesse modelo simplificado.
            </p>
            <p>
              O Teste Político foi criado para oferecer uma alternativa mais fiel à realidade:
              um sistema multidimensional que analisa suas opiniões em <strong>8 valores distintos</strong>,
              agrupados em <strong>4 eixos independentes</strong>. Assim, é possível identificar
              não apenas se você tende à esquerda ou à direita, mas também como você se posiciona
              em relação à soberania nacional, às liberdades civis e aos valores tradicionais
              versus progressistas.
            </p>
            <p>
              O objetivo não é rotulá-lo, mas ajudá-lo a compreender melhor o próprio posicionamento
              político — e, quem sabe, entender por que pessoas com opiniões diferentes das suas
              pensam como pensam.
            </p>
          </div>
        </section>

        {/* Metodologia */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 md:gap-4 mb-8">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Scale size={32} />
            </div>
            <h2 className="text-3xl font-bold">Nossa metodologia</h2>
          </div>

          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p className="mb-4">
              Diferente de testes simplistas que tentam encaixar todas as visões políticas em uma linha reta
              (Esquerda vs Direita) ou em um quadrado (Political Compass), nosso sistema utiliza um modelo
              multidimensional baseado em <strong>8 valores políticos opostos</strong>, agrupados em <strong>4 eixos independentes</strong>.
            </p>
            <p className="mb-4">
              O teste consiste em <strong>{questions.length} perguntas</strong> cuidadosamente selecionadas para avaliar opiniões sobre economia,
              diplomacia, estado e sociedade. Cada resposta afeta a pontuação do usuário em um ou mais eixos,
              resultando em um perfil político único e detalhado.
            </p>
            <p className="mb-4">
              Ao final, o algoritmo compara seus percentuais em cada eixo com nossa base de dados de mais de
              <strong>40 ideologias políticas</strong> distintas para encontrar aquela que mais se aproxima das suas visões.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Como funciona o cálculo</h3>
            <p className="mb-4">
              Cada pergunta do teste é associada a um ou mais valores políticos. Quando você responde
              o quanto concorda ou discorda de uma afirmação, sua resposta é convertida em pontos
              que são distribuídos entre os valores correspondentes. Por exemplo, uma pergunta sobre
              impostos progressivos pode pontuar nos valores de &ldquo;Igualdade&rdquo; (eixo econômico)
              e &ldquo;Autoridade&rdquo; (eixo civil), dependendo do contexto.
            </p>
            <p className="mb-4">
              Ao final das {questions.length} perguntas, seus pontos são normalizados em percentuais para cada um
              dos 8 valores. Esses percentuais são comparados com os perfis ideológicos da nossa
              base de dados usando uma métrica de distância estatística, determinando qual
              ideologia mais se aproxima do seu posicionamento.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Limitações importantes</h3>
            <p>
              Nenhum teste político pode capturar a totalidade do pensamento humano. Nossa ferramenta
              é uma <strong>aproximação educacional</strong>, não um diagnóstico definitivo. Ela pode
              não refletir nuances culturais, contextos históricos específicos ou posições que fogem
              dos eixos tradicionais. Use os resultados como um ponto de partida para reflexão,
              não como uma etiqueta definitiva.
            </p>
          </div>
        </section>

        {/* Os 4 Eixos */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Os 4 eixos analisados</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Cada eixo representa um espectro entre dois valores políticos opostos.
            Seu posicionamento em cada eixo é calculado independentemente dos outros.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-red-500"><CircleDollarSign size={24} /></span> Eixo econômico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Igualdade vs. Mercado</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mede a preferência entre distribuição de riqueza e intervenção estatal (Igualdade)
                  versus livre mercado e desregulamentação (Mercado). Este eixo reflete visões sobre
                  impostos, propriedade privada, programas sociais e o papel do Estado na economia.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-orange-500"><Globe size={24} /></span> Eixo diplomático
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Nação vs. Global</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avalia a inclinação entre patriotismo e prioridade nacional (Nação) versus
                  cooperação internacional e globalismo (Global). Este eixo reflete visões sobre
                  política externa, soberania, tratados internacionais e ajuda humanitária.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-yellow-500"><Scale size={24} /></span> Eixo civil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Liberdade vs. Autoridade</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analisa a preferência por liberdades civis e direitos individuais (Liberdade)
                  versus ordem social e força estatal (Autoridade). Este eixo reflete visões sobre
                  vigilância, direitos armados, liberdade de expressão e segurança pública.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="text-purple-500"><Landmark size={24} /></span> Eixo social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold mb-2">Tradição vs. Progresso</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mede o apego a valores tradicionais e religiosos (Tradição) versus
                  mudança social, secularismo e inovação (Progresso). Este eixo reflete visões sobre
                  casamento, religião, educação, drogas e mudanças culturais.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Neutralidade */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold">Compromisso com a neutralidade</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Garantir a neutralidade em um teste político é um desafio inerente — toda pergunta
              carrega algum grau de pressuposto. No entanto, adotamos diversas práticas para
              minimizar vieses:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Formulação equilibrada:</strong> as perguntas são escritas para não pressupor
                que uma resposta é &ldquo;correta&rdquo; ou &ldquo;moralmente superior&rdquo;. Evitamos
                linguagem carregada ou emocional.
              </li>
              <li>
                <strong>Distribuição simétrica:</strong> o número de perguntas que pontuam para cada
                valor do eixo é balanceado, evitando que um lado tenha mais oportunidades de pontuar.
              </li>
              <li>
                <strong>Base de dados diversificada:</strong> as 40+ ideologias mapeadas incluem
                posicionamentos de todo o espectro, desde anarquismo até autoritarismo, passando
                por centrismo e libertarianismo.
              </li>
              <li>
                <strong>Revisão contínua:</strong> analisamos estatisticamente as respostas dos
                usuários para identificar e corrigir eventuais desequilíbrios nas perguntas.
              </li>
            </ul>
            <p>
              Ainda assim, recomendamos que os resultados sejam usados como ferramenta de reflexão,
              não como classificação definitiva. O pensamento político humano é complexo demais
              para ser completamente capturado por qualquer questionário.
            </p>
          </div>
        </section>

        {/* Sobre a equipe */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 md:gap-4 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
              <Users size={28} />
            </div>
            <h2 className="text-2xl font-bold">Quem está por trás</h2>
          </div>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              O Teste Político é um projeto open source desenvolvido por Rilson Joás, um desenvolvedor
              brasileiro apaixonado por tecnologia e ciência política. O projeto surgiu da necessidade
              de oferecer ao público lusófono uma ferramenta de análise ideológica mais completa e
              acessível do que as disponíveis em inglês.
            </p>
            <p>
              Todo o código-fonte é público e pode ser auditado, contribuído ou adaptado. Acreditamos
              na transparência como principio fundamental — especialmente quando o assunto é política.
            </p>
            <p>
              Se você encontrou um erro, tem uma sugestão ou quer contribuir com o projeto, visite nosso{" "}
              <a
                href="https://github.com/rilsonjoas/TestePolitico"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                repositório no GitHub
              </a>.
            </p>
          </div>
        </section>

        {/* FAQ - Importante para "Value Content" */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold">Perguntas frequentes</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Meus resultados são salvos?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Não. Nós levamos sua privacidade a sério. Todo o cálculo é feito no seu próprio navegador
                e nenhum dado pessoal ou resposta é enviado para nossos servidores. Suas respostas
                existem apenas no seu dispositivo enquanto o navegador estiver aberto.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Este teste é isento?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Todo teste político possui algum viés inerente em suas perguntas. No entanto, nos esforçamos
                para criar questões equilibradas que permitam a expressão de todo o espectro político, sem
                favorecer uma ideologia específica. Publicamos nossa metodologia e o código-fonte para
                que qualquer pessoa possa auditar o processo.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Posso refazer o teste?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sim! Você pode refazer o teste quantas vezes quiser. Cada vez que você responde,
                o cálculo é feito com base nas suas respostas daquele momento. Suas opiniões podem
                mudar ao longo do tempo, e o teste reflete isso.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Por que {questions.length} perguntas e não menos?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Um número maior de perguntas permite uma medição mais precisa e confiável. Com {questions.length}
                {" "}questões distribuídas entre 8 valores, cada valor recebe em média {Math.round(questions.length / 8)} perguntas,
                o que reduz o impacto de respostas aleatórias ou inconsistentes. Testes com poucas
                perguntas tendem a ser menos confiáveis.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl">
              <h3 className="font-bold text-lg mb-2">Posso usar este teste em sala de aula?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sim! O teste pode ser uma ferramenta educacional valiosa para discutir espectros
                políticos, pensar criticamente sobre posicionamentos e entender a complexidade
                do pensamento político. Recomendamos que o professor contextualize os resultados
                e enfatize que são aproximaciones, não definitivas.
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
            Começar o teste agora
            <CheckCircle2 className="ml-2" />
          </Link>
        </div>
      </div>
    </main>
  );
}
