'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { JsonLd } from './JsonLd';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export function FAQSection({
  title = 'Perguntas Frequentes',
  subtitle = 'Tire suas dúvidas técnicas e teóricas sobre a metodologia e o funcionamento.',
  items,
}: FAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white dark:bg-gray-800/80 rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 dark:border-gray-700/60 my-12">
      <JsonLd data={faqSchema} />
      
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 rounded-xl text-blue-600 dark:text-blue-400">
          <HelpCircle size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-8">
          {subtitle}
        </p>
      )}

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-200 bg-gray-50/50 dark:bg-gray-900/30"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors gap-4"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg leading-snug">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed border-t border-gray-100 dark:border-gray-800">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
