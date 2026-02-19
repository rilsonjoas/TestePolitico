type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

// Variável global do GTM/GA4
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: {
        event_category?: string;
        event_label?: string;
        value?: number;
        page_title?: string;
        page_location?: string;
        send_to?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: url,
      send_to: process.env.NEXT_PUBLIC_GA_ID,
    });
  }
};

export const trackEvent = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NEXT_PUBLIC_GA_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const quizEvents = {
  start: () => trackEvent({
    action: 'start',
    category: 'quiz',
    label: 'Quiz Started'
  }),
  complete: (result: string) => trackEvent({
    action: 'complete',
    category: 'quiz',
    label: result
  }),
  answer: (question: number, value: number) => trackEvent({
    action: 'answer_question',
    category: 'quiz',
    label: `Q${question}`,
    value: value
  }),
  abandon: (question: number, total: number) => trackEvent({
    action: 'abandon_quiz',
    category: 'quiz',
    label: `Abandoned at Q${question}/${total}`,
    value: question
  })
};

export const resultEvents = {
  view: (ideology: string, scores: any) => trackEvent({
    action: 'view_result',
    category: 'results',
    label: ideology,
    value: undefined // Scores could be sent as custom params if needed in future
  })
};

export const shareEvents = {
  share: (method: string, ideology: string) => trackEvent({
    action: 'share',
    category: 'engagement',
    label: `${method} - ${ideology}`
  }),
  download: (format: string) => trackEvent({
    action: 'download_image',
    category: 'engagement',
    label: format
  })
};

export const uiEvents = {
  themeToggle: (theme: string) => trackEvent({
    action: 'toggle_theme',
    category: 'ui',
    label: theme
  })
};
