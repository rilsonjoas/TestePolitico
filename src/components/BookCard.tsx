"use client";

import { useState, useEffect } from 'react';
import { ExternalLink, BookOpen, ShoppingCart } from 'lucide-react';

interface BookCardProps {
    title: string;
    link?: string;
    description?: string;
}

export const BookCard = ({ title, link, description }: BookCardProps) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCover() {
            try {
                // Limpa o título: remove textos entre parênteses (comumente autores no nosso data.ts)
                const cleanTitle = title.replace(/\s*\(.*?\)\s*/g, '').trim();
                const query = encodeURIComponent(cleanTitle);
                const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
                const data = await res.json();

                if (data.items && data.items.length > 0) {
                    const volumeInfo = data.items[0].volumeInfo;
                    if (volumeInfo.imageLinks?.thumbnail) {
                        // Garante uso de HTTPS para evitar bloqueios de conteúdo misto
                        setCoverUrl(volumeInfo.imageLinks.thumbnail.replace('http:', 'https:'));
                    } else if (volumeInfo.imageLinks?.smallThumbnail) {
                        setCoverUrl(volumeInfo.imageLinks.smallThumbnail.replace('http:', 'https:'));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch book cover from Google Books API", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCover();
    }, [title]);

    const affiliateUrl = link && link.includes('amazon') && !link.includes('tag=')
        ? (link.includes('?') ? `${link}&tag=rilson-20` : `${link}?tag=rilson-20`)
        : link;

    return (
        <div className="group flex flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-blue-400 h-full max-h-48 min-h-32">
            <div className="relative w-24 sm:w-28 md:w-32 shrink-0 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                {isLoading ? (
                    <div className="w-full h-full animate-pulse bg-gray-200 dark:bg-gray-800" />
                ) : coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={`Capa do livro ${title}`}
                        className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800/80 p-2 text-center">
                        <BookOpen size={28} className="text-gray-300 dark:text-gray-600" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-3 sm:p-4 justify-between min-w-0">
                <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 mb-1 sm:mb-2 leading-tight">
                        {title}
                    </h3>

                    {description && (
                        <p className="line-clamp-2 md:line-clamp-3 text-xs text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>

                {affiliateUrl && (
                    <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700/50">
                        <a
                            href={affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 ml-auto"
                        >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            Comprar
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
