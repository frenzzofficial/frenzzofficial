"use client";

import Script from "next/script";
import { adsConfig } from "@/packages/configs/ads.config";

interface GoogleAdsSenseProps {
  children?: React.ReactNode;
}

/**
 * Mounts the AdSense loader script once (per page load) and renders any
 * children alongside it. Reads everything from `adsConfig` — nothing is
 * hardcoded here.
 *
 * Usage: drop this once near the top of a layout, wrapping the page
 * content. Individual ad units (e.g. `<SidebarAdsSense />`) can then be
 * placed anywhere further down the tree and will pick up the same script.
 */
const GoogleAdsSense = ({ children }: GoogleAdsSenseProps) => {
  if (!adsConfig.enabled || !adsConfig.clientId) {
    return <>{children}</>;
  }

  return (
    <>
      <Script
        id="google-adsense-script"
        strategy="afterInteractive"
        async
        crossOrigin="anonymous"
        src={`${adsConfig.scriptSrc}?client=${adsConfig.clientId}`}
      />
      {children}
    </>
  );
};

export default GoogleAdsSense;
