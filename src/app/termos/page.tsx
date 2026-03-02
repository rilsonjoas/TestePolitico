import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de uso | Teste Político",
  description: "Termos de uso do Teste Político",
};

export default function TermosPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Termos de uso</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Aceitação dos termos</h2>
          <p className="mb-3">
            Ao acessar e utilizar o <strong>Teste Político</strong>, você concorda com
            estes Termos de Uso. Se você não concordar com qualquer parte destes termos, por favor,
            não utilize o site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Descrição do serviço</h2>
          <p className="mb-3">
            O Teste Político é uma ferramenta educacional e de entretenimento que permite
            aos usuários responderem a um questionário sobre temas políticos, econômicos e sociais.
            Com base nas respostas, o site calcula e apresenta um resultado indicando tendências
            ideológicas.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Natureza do conteúdo</h2>
          <p className="mb-3">
            <strong>Aviso importante:</strong> Os resultados apresentados por este teste são
            meramente indicativos e têm caráter educacional e de entretenimento. Eles:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Não constituem uma análise científica ou acadêmica definitiva</li>
            <li>Não devem ser usados como base única para decisões políticas</li>
            <li>Representam uma simplificação de espectros ideológicos complexos</li>
            <li>Podem não refletir com precisão todas as nuances do seu pensamento político</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Uso permitido</h2>
          <p className="mb-3">Você pode usar este site para:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Realizar o teste político para fins pessoais</li>
            <li>Compartilhar seus resultados em redes sociais</li>
            <li>Utilizar como ferramenta educacional em contextos apropriados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Uso proibido</h2>
          <p className="mb-3">É expressamente proibido:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Utilizar o site para disseminar discurso de ódio ou discriminação</li>
            <li>Tentar comprometer a segurança ou integridade do site</li>
            <li>Reproduzir o conteúdo para fins comerciais sem autorização</li>
            <li>Utilizar os resultados para difamar ou prejudicar terceiros</li>
            <li>Manipular ou interferir no funcionamento do site</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Propriedade intelectual</h2>
          <p className="mb-3">
            O código-fonte deste projeto é open source e está disponível sob a licença MIT.
            O design, textos, questões e metodologia são de propriedade do desenvolvedor e
            colaboradores do projeto.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Isenção de responsabilidade</h2>
          <p className="mb-3">
            O site é fornecido &quot;como está&quot;, sem garantias de qualquer tipo. Não nos
            responsabilizamos por:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Interpretações feitas com base nos resultados do teste</li>
            <li>Decisões tomadas com base nos resultados apresentados</li>
            <li>Eventuais indisponibilidades ou erros técnicos</li>
            <li>Conteúdo de sites de terceiros linkados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Publicidade</h2>
          <p className="mb-3">
            Este site pode exibir anúncios fornecidos por terceiros (como Google AdSense).
            Não temos controle sobre o conteúdo desses anúncios, embora busquemos garantir que
            sejam apropriados para o público geral.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">9. Modificações</h2>
          <p className="mb-3">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
            Alterações significativas serão comunicadas através do site. O uso continuado
            após modificações constitui aceitação dos novos termos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">10. Legislação aplicável</h2>
          <p className="mb-3">
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil.
            Qualquer disputa será submetida ao foro da comarca do desenvolvedor.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">11. Contato</h2>
          <p className="mb-3">
            Para dúvidas ou sugestões sobre estes Termos de Uso, entre em contato através do{" "}
            <a
              href="https://github.com/rilsonjoas/TestePolitico/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              repositório no GitHub
            </a>.
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-6">
          <Link
            href="/privacidade"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
}
