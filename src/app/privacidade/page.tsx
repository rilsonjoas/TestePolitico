import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Teste Político 8 Valores",
  description: "Política de Privacidade e Cookies do Teste Político 8 Valores",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacidade e Cookies</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Introdução</h2>
          <p className="mb-3">
            O <strong>Teste Político 8 Valores</strong> respeita sua privacidade e está comprometido
            em proteger seus dados pessoais. Esta política descreve como coletamos, usamos e
            protegemos suas informações quando você utiliza nosso site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Dados que Coletamos</h2>
          <p className="mb-3">Podemos coletar os seguintes tipos de informações:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Dados de uso:</strong> informações sobre como você interage com o site,
              incluindo páginas visitadas, tempo de permanência e ações realizadas.
            </li>
            <li>
              <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, sistema operacional,
              provedor de internet e informações do dispositivo.
            </li>
            <li>
              <strong>Preferências:</strong> configurações como tema (claro/escuro) armazenadas
              localmente no seu navegador.
            </li>
          </ul>
          <p className="mt-3">
            <strong>Importante:</strong> As respostas do quiz são processadas localmente no seu
            navegador e <strong>não são enviadas ou armazenadas em nossos servidores</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Cookies e Tecnologias Similares</h2>
          <p className="mb-3">Utilizamos cookies e tecnologias similares para:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site,
              como salvar suas preferências de tema.
            </li>
            <li>
              <strong>Cookies de análise:</strong> utilizados para entender como os visitantes
              interagem com o site, permitindo melhorias contínuas.
            </li>
            <li>
              <strong>Cookies de publicidade:</strong> utilizados por parceiros de publicidade
              (como Google AdSense) para exibir anúncios relevantes com base nos seus interesses.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Google AdSense e Publicidade</h2>
          <p className="mb-3">
            Este site utiliza o Google AdSense para exibir anúncios. O Google e seus parceiros
            podem usar cookies para exibir anúncios com base em visitas anteriores a este ou
            outros sites.
          </p>
          <p className="mb-3">
            Você pode desativar a publicidade personalizada visitando as{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Configurações de Anúncios do Google
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Seus Direitos (LGPD)</h2>
          <p className="mb-3">
            De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018),
            você tem os seguintes direitos:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
            <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
            <li>Revogar o consentimento a qualquer momento</li>
            <li>Solicitar a portabilidade dos dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Como Gerenciar Cookies</h2>
          <p className="mb-3">
            Você pode gerenciar ou desativar cookies através das configurações do seu navegador.
            Note que desativar certos cookies pode afetar a funcionalidade do site.
          </p>
          <p className="mb-3">
            Para gerenciar suas preferências de cookies neste site, você pode usar o banner de
            consentimento exibido na sua primeira visita ou limpar os dados do site nas
            configurações do navegador.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Alterações nesta Política</h2>
          <p className="mb-3">
            Podemos atualizar esta política periodicamente. Recomendamos que você revise esta
            página regularmente para se manter informado sobre como protegemos suas informações.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">8. Contato</h2>
          <p className="mb-3">
            Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento de
            seus dados, entre em contato através do nosso{" "}
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

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
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
