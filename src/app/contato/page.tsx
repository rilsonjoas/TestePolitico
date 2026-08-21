import Link from "next/link";
import { Metadata } from "next";
import { Mail, Github, MessageSquare, Handshake, Bug, Lightbulb, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato | Teste Político 8 Valores",
  description: "Entre em contato com a equipe do Teste Político para dúvidas, sugestões, correções ou parcerias. Contribuições open source são bem-vindas.",
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-gray-100">
            Fale conosco
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tem alguma dúvida, encontrou um erro ou quer sugerir uma melhoria?
            Estamos sempre abertos a feedback da comunidade.
          </p>
        </section>

        {/* Canais de contato */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Canais de contato</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="mailto:rilsonjoas10@gmail.com"
              className="group block p-5 md:p-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">E-mail</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Contato direto, parcerias e imprensa</p>
                  <p className="text-blue-600 dark:text-blue-400 mt-1 font-medium">rilsonjoas10@gmail.com</p>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/rilsonjoas/TestePolitico/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-5 md:p-6 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors shrink-0">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">GitHub Issues</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Reportar bugs, sugerir features ou discutir melhorias</p>
                  <p className="text-blue-600 dark:text-blue-400 mt-1 font-medium">Abrir uma Issue</p>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Como você pode ajudar */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Como você pode ajudar</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            O Teste Político é um projeto open source e depende da participação da comunidade
            para melhorar continuamente. Aqui estão algumas formas de contribuir:
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Bug className="text-red-500" size={20} />
                <h3 className="font-bold">Reportar bugs</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encontrou algo que não funciona como esperado? Abra uma issue no GitHub
                com uma descrição do problema, o navegador que você está usando e, se possível,
                prints de tela.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="text-yellow-500" size={20} />
                <h3 className="font-bold">Sugerir melhorias</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tem uma ideia para tornar o teste mais preciso, adicionar novas ideologias ou
                melhorar a experiência do usuário? Crie uma issue com a tag &ldquo;enhancement&rdquo;.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="text-blue-500" size={20} />
                <h3 className="font-bold">Revisar conteúdo</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encontrou uma definição incorreta de uma ideologia, uma pergunta enviesada ou
                um erro de português? Nos ajude a manter a qualidade do conteúdo.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <Handshake className="text-green-500" size={20} />
                <h3 className="font-bold">Contribuir com código</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Se você é desenvolvedor, contribuições de código são muito bem-vindas! Fork
                o repositório, faça suas alterações e envie um Pull Request.
              </p>
            </div>
          </div>
        </section>

        {/* Links úteis */}
        <section className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-blue-100 dark:border-blue-900/30">
          <h2 className="text-2xl font-bold mb-6 text-center">Links úteis</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <Link href="/sobre" className="block p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center gap-2">
                <MessageSquare className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Como funciona o teste</span>
                <span className="text-sm text-gray-500">Metodologia e limitações</span>
              </div>
            </Link>

            <Link href="/instructions" className="block p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center gap-2">
                <FileText className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Instruções</span>
                <span className="text-sm text-gray-500">Como responder ao teste</span>
              </div>
            </Link>

            <Link href="/ideologia" className="block p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col items-center gap-2">
                <Lightbulb className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold">Ideologias</span>
                <span className="text-sm text-gray-500">Explore todas as ideologias</span>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4 pb-8">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            Fazer o teste agora
          </Link>
        </div>
      </div>
    </main>
  );
}
