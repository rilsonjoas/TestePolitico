"use client";

import { useEffect, useState } from "react";

interface AdUnitProps {
  pId: string;
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
}

export const AdUnit = ({ pId, slot, format = "auto", responsive = true }: AdUnitProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      // @ts-expect-error: adsbygoogle is added by the global script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Avoid rendering the <ins> tag on the server to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="my-8 flex justify-center overflow-hidden min-h-[100px] bg-gray-50/50 dark:bg-gray-800/20 rounded-xl animate-pulse">
        {/* Ad Placeholder */}
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={pId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};
