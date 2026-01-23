"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full mt-24 py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              &copy; {year || "2026"} <span className="mx-1">·</span> 
              <span className="text-gray-900 dark:text-white font-bold">Teste Político</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Desenvolvido por{" "}
              <a
                href="https://github.com/rilsonjoas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Rilson Joás
              </a>
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <Link 
              href="/ideologia" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Ideologias
            </Link>
            <Link 
              href="/privacidade" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacidade
            </Link>
            <Link 
              href="/termos" 
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Termos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
