import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

export default function Instructions() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen">
      <header className="text-center my-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Logo size={64} showText={false} />
          <h1 className="text-4xl md:text-5xl font-bold">Teste Político 8 Valores</h1>
        </div>
      </header>

      <main className="text-center">
        <h2 className="text-3xl font-bold mb-4">Instruções</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Você será apresentado a uma série de afirmações. Para cada uma, clique no botão que representa a sua opinião sobre ela.
        </p>

        <div className="mt-8 space-y-4">
          <Link href="/quiz">
            <Button size="lg">Entendi!</Button>
          </Link>
          <br />
          <Link href="/">
            <Button size="lg" variant="outline">Voltar</Button>
          </Link>
        </div>
      </main>

      <footer className="text-center mt-12 py-4 border-t w-full">
        <p>&copy; 2025 - Desenvolvido por <a href="https://github.com/rilsonjoas" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Rilson Joás</a></p>
      </footer>
    </div>
  );
}
