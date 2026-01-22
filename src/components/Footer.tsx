import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-center mt-16 py-4 border-t border-gray-300 dark:border-gray-700">
      <p className="dark:text-gray-400">
        &copy; 2025 - Desenvolvido por{" "}
        <a
          href="https://github.com/rilsonjoas"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Rilson Joás
        </a>
      </p>
      <p className="mt-2 text-sm dark:text-gray-500">
        <Link href="/privacidade" className="text-blue-500 hover:underline">
          Política de Privacidade
        </Link>
        {" · "}
        <Link href="/termos" className="text-blue-500 hover:underline">
          Termos de Uso
        </Link>
      </p>
    </footer>
  );
}
