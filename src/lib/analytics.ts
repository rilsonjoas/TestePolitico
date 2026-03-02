// Substitua SUA_TAG_AQUI pela tag do seu painel do Google Analytics
// Exemplo: G-1234567890
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-RILSON";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Variável global do GTM/GA4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// --- Funções Auxiliares Específicas para o Teste ---

export const trackQuizStart = () => {
  event({
    action: "started",
    category: "quiz",
    label: "Teste Iniciado",
    value: 1,
  });
};

export const trackQuizCompletion = () => {
  event({
    action: "completed",
    category: "quiz",
    label: "Teste Finalizado",
    value: 1,
  });
};

export const trackResultShare = (platform: "whatsapp" | "twitter" | "facebook") => {
  event({
    action: "share",
    category: "results",
    label: platform,
    value: 1,
  });
};

export const trackIdeologyClick = (ideologyName: string) => {
  event({
    action: "view_ideology",
    category: "encyclopedia",
    label: ideologyName,
    value: 1,
  });
};

export const quizEvents = {
  started: () => event({ action: "started", category: "quiz", label: "Started", value: 1 }),
  completed: () => event({ action: "completed", category: "quiz", label: "Completed", value: 1 }),
  abandon: (questionIndex: number, totalQuestions: number) => event({ action: "abandon", category: "quiz", label: `Abandoned at ${questionIndex}/${totalQuestions}`, value: 1 }),
  answer: (questionIndex: number, questionValue: number) => event({ action: "answer", category: "quiz", label: `Q${questionIndex}`, value: questionValue }),
};

export const shareEvents = {
  copyLink: () => event({ action: "copy_link", category: "share", label: "Copiar Link Result", value: 1 }),
  whatsapp: () => event({ action: "share_whatsapp", category: "share", label: "WhatsApp Share", value: 1 }),
  twitter: () => event({ action: "share_twitter", category: "share", label: "Twitter Share", value: 1 }),
  share: (platform: string, resultName: string) => event({ action: "share", category: "share", label: `${platform} - ${resultName}`, value: 1 }),
  download: (resultName: string) => event({ action: "download_result", category: "share", label: resultName, value: 1 })
};

export const uiEvents = {
  toggleTheme: (theme: string) => event({ action: "toggle_theme", category: "ui", label: theme, value: 1 })
};

export const resultEvents = {
  viewed: (ideology: string) => event({ action: "view_results", category: "results", label: ideology, value: 1 }),
};

export const trackPageView = (url: string) => {
  pageview(url);
};
