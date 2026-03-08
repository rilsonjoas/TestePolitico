'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { ThemeToggleButton } from './ThemeToggleButton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, BarChart2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastResult');
    setResultUrl(saved ? `/results?${saved}` : null);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre o Método' },
    { href: '/contato', label: 'Contato' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2">
          <Logo size={32} showText={false} />
          <span className="font-bold text-lg hidden sm:block text-gray-900 dark:text-white">
            Teste Político
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                pathname === link.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              {link.label}
            </Link>
          ))}
          {resultUrl && (
            <Link
              href={resultUrl}
              className={cn(
                "flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border transition-colors",
                pathname.startsWith('/results')
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              )}
            >
              <BarChart2 size={14} />
              Meu resultado
            </Link>
          )}
          <div className="pl-4 border-l border-gray-200 dark:border-gray-700">
            <ThemeToggleButton />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggleButton />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 absolute w-full left-0 animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 space-y-4">
            {resultUrl && (
              <Link
                href={resultUrl}
                onClick={handleLinkClick}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-bold transition-colors flex items-center gap-2",
                  pathname.startsWith('/results')
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                )}
              >
                <BarChart2 size={16} />
                Meu resultado
              </Link>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
