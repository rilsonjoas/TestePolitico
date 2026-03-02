import Link from "next/link";
import { Metadata } from "next";
import { Mail, Github, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contato | Teste Político 8 Valores",
  description: "Entre em contato com a equipe do Teste Político 8 Valores para dúvidas, sugestões ou correções.",
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100">
          Fale conosco
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Tem alguma dúvida, encontrou um erro ou quer sugerir uma melhoria?
          Estamos sempre abertos a feedback da comunidade.
        </p>

        <div className="grid gap-6 mt-12 text-left">

          <a
            href="mailto:rilsonjoas10@gmail.com"
            className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">E-mail</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Para contato direto e parcerias</p>
                <p className="text-blue-600 dark:text-blue-400 mt-1 font-medium">rilsonjoas10@gmail.com</p>
              </div>
            </div>
          </a>

          <a
            href="https://github.com/rilsonjoas/TestePolitico/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-colors">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">GitHub Issues</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Para reportar bugs ou sugerir features</p>
                <p className="text-blue-600 dark:text-blue-400 mt-1 font-medium">Abrir uma Issue</p>
              </div>
            </div>
          </a>

          <Link href="/sobre" className="block p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-blue-900 dark:text-blue-300">
                Quer entender como o teste funciona? Visite nossa página Sobre.
              </span>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
