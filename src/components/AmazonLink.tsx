"use client";

import { ExternalLink, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface AmazonLinkProps {
  title: string;
  author?: string;
  description: string;
  url: string;
  imageUrl?: string;
  trackingId: string;
}

export const AmazonLink = ({
  title,
  author,
  description,
  url,
  imageUrl,
  trackingId,
}: AmazonLinkProps) => {
  // Append tracking ID if not already present
  const affiliateUrl = url.includes("?") 
    ? `${url}&tag=${trackingId}` 
    : `${url}?tag=${trackingId}`;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-blue-400">
      <div className="flex flex-col sm:flex-row">
        {imageUrl && (
          <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-32 md:w-40">
            <Image
              src={imageUrl}
              alt={title}
              width={160}
              height={200}
              unoptimized
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {title}
              </h3>
              {author && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  por {author}
                </p>
              )}
            </div>
          </div>
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="flex items-center text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Ver na Amazon
            </span>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Comprar Agora
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
