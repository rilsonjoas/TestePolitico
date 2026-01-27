'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { trackPageView } from '@/lib/analytics';

/**
 * RouteTracker Component
 * 
 * Tracks route changes in Next.js App Router (SPA navigation).
 * This component should be included in the root layout.
 */
function RouteTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
      trackPageView(url);
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
