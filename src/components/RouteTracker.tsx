'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { trackPageView } from '@/lib/analytics';

/**
 * RouteTracker Component
 * 
 * Tracks route changes in Next.js App Router (SPA navigation)
 * and guarantees scrolling back to top on page navigation.
 */
function RouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
      trackPageView(url);

      // Garante que ao trocar de página o scroll volte ao topo caso não haja âncora (#)
      if (typeof window !== 'undefined' && !window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function RouteTracker() {
  return (
    <Suspense fallback={null}>
      <RouteTrackerInner />
    </Suspense>
  );
}

