"use client";

import { useEffect, useRef, useState } from "react";

interface AdUnitProps {
  pId: string;
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
}

export const AdUnit = ({ pId, slot, format = "auto", responsive = true }: AdUnitProps) => {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    if (!pushed.current) {
      pushed.current = true;
      try {
        // @ts-expect-error: adsbygoogle is added by the global script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        setIsUnfilled(true);
      }
    }

    const observer = new MutationObserver(() => {
      const status = el.getAttribute("data-ad-status");
      if (status === "unfilled") {
        setIsUnfilled(true);
      } else if (status === "filled") {
        setIsUnfilled(false);
      }
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-ad-status", "style"],
    });

    return () => observer.disconnect();
  }, []);

  if (isUnfilled) return null;

  return (
    <div className="my-8 flex justify-center overflow-hidden empty:hidden">
      <ins
        ref={insRef}
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
