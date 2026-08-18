"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Pushes a `{}` onto `window.adsbygoogle` exactly once per mounted ad unit,
 * as soon as `canRender` is true. This is the bit every AdSense `<ins>`
 * unit needs to do to actually ask Google to fill the slot.
 *
 * Shared by any ad component (sidebar, in-content, footer, etc.) so the
 * push-once-and-fail-silently logic lives in one place.
 */
export const useAdsSense = (canRender: boolean) => {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!canRender || pushedRef.current) return;
    if (typeof window === "undefined") return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // AdSense script not ready yet (e.g. ad blocker) — fail silently.
    }
  }, [canRender]);
};

export default useAdsSense;
