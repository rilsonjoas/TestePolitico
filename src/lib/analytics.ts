/**
 * Google Analytics 4 Event Tracking
 * 
 * This module provides type-safe event tracking for GA4.
 * All events are tracked only in production and when GA_ID is configured.
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * GA4 Event Names
 */
export const GA_EVENTS = {
  // Quiz Events
  QUIZ_START: 'quiz_start',
  QUIZ_COMPLETE: 'quiz_complete',
  QUIZ_ABANDON: 'quiz_abandon',
  QUESTION_ANSWER: 'question_answer',
  
  // Result Events
  RESULT_VIEW: 'result_view',
  RESULT_SHARE: 'result_share',
  RESULT_DOWNLOAD: 'result_download',
  
  // Navigation Events
  PAGE_VIEW: 'page_view',
  
  // Engagement Events
  THEME_TOGGLE: 'theme_toggle',
  EXTERNAL_LINK_CLICK: 'external_link_click',
} as const;

export type GAEventName = typeof GA_EVENTS[keyof typeof GA_EVENTS];

/**
 * Check if GA4 is available and configured
 */
export function isGAAvailable(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.gtag === 'function' &&
    !!process.env.NEXT_PUBLIC_GA_ID
  );
}

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(
  eventName: GAEventName | string,
  eventParams?: Record<string, string | number | boolean | undefined>
): void {
  if (!isGAAvailable()) {
    // Log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA4 Event]', eventName, eventParams);
    }
    return;
  }

  try {
    window.gtag!('event', eventName, eventParams as Record<string, string | number | boolean>);
  } catch (error) {
    console.error('[GA4] Error tracking event:', error);
  }
}

/**
 * Track page view
 * @param url - Page URL
 * @param title - Page title
 */
export function trackPageView(url: string, title?: string): void {
  if (!isGAAvailable()) return;

  try {
    const config: Record<string, string> = { page_path: url };
    if (title) {
      config.page_title = title;
    }
    window.gtag!('config', process.env.NEXT_PUBLIC_GA_ID!, config);
  } catch (error) {
    console.error('[GA4] Error tracking page view:', error);
  }
}

/**
 * Quiz Event Trackers
 */
export const quizEvents = {
  /**
   * Track quiz start
   */
  start: () => {
    trackEvent(GA_EVENTS.QUIZ_START, {
      event_category: 'engagement',
      event_label: 'Quiz Started',
    });
  },

  /**
   * Track quiz completion
   * @param ideology - The ideology result
   */
  complete: (ideology: string) => {
    trackEvent(GA_EVENTS.QUIZ_COMPLETE, {
      event_category: 'conversion',
      event_label: ideology,
      ideology,
      value: 1,
    });
  },

  /**
   * Track quiz abandonment
   * @param questionNumber - Question number where user abandoned
   * @param totalQuestions - Total number of questions
   */
  abandon: (questionNumber: number, totalQuestions: number) => {
    trackEvent(GA_EVENTS.QUIZ_ABANDON, {
      event_category: 'engagement',
      event_label: `Abandoned at question ${questionNumber}`,
      question_number: questionNumber,
      total_questions: totalQuestions,
      completion_percentage: Math.round((questionNumber / totalQuestions) * 100),
    });
  },

  /**
   * Track individual question answer
   * @param questionNumber - Question number (1-indexed)
   * @param answer - Answer value (-1.0 to 1.0)
   */
  answer: (questionNumber: number, answer: number) => {
    trackEvent(GA_EVENTS.QUESTION_ANSWER, {
      event_category: 'engagement',
      question_number: questionNumber,
      answer_value: answer,
      non_interaction: true, // Don't affect bounce rate
    });
  },
};

/**
 * Result Event Trackers
 */
export const resultEvents = {
  /**
   * Track result view
   * @param ideology - The ideology result
   * @param scores - User's scores
   */
  view: (ideology: string, scores: { e: string; d: string; g: string; s: string }) => {
    trackEvent(GA_EVENTS.RESULT_VIEW, {
      event_category: 'engagement',
      event_label: ideology,
      ideology,
      economic_score: parseFloat(scores.e),
      diplomatic_score: parseFloat(scores.d),
      government_score: parseFloat(scores.g),
      society_score: parseFloat(scores.s),
    });
  },

  /**
   * Track result share
   * @param method - Share method (e.g., 'twitter', 'facebook', 'copy_link')
   */
  share: (method: string) => {
    trackEvent(GA_EVENTS.RESULT_SHARE, {
      event_category: 'engagement',
      event_label: method,
      method,
    });
  },

  /**
   * Track result download
   * @param format - Download format (e.g., 'png', 'jpg')
   */
  download: (format: string = 'png') => {
    trackEvent(GA_EVENTS.RESULT_DOWNLOAD, {
      event_category: 'engagement',
      event_label: format,
      format,
    });
  },
};

/**
 * UI Event Trackers
 */
export const uiEvents = {
  /**
   * Track theme toggle
   * @param theme - New theme value ('light', 'dark', 'system')
   */
  themeToggle: (theme: string) => {
    trackEvent(GA_EVENTS.THEME_TOGGLE, {
      event_category: 'engagement',
      event_label: theme,
      theme,
    });
  },

  /**
   * Track external link click
   * @param url - External URL
   * @param label - Link label/description
   */
  externalLinkClick: (url: string, label?: string) => {
    trackEvent(GA_EVENTS.EXTERNAL_LINK_CLICK, {
      event_category: 'engagement',
      event_label: label || url,
      url,
      outbound: true,
    });
  },
};
