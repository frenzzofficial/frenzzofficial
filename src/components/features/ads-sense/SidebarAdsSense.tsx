"use client";

import { adsConfig } from "@/packages/configs/ads.config";
import { useAdsSense } from "@/packages/hooks/useAdsSense";

interface SidebarAdsSenseProps {
  side: "left" | "right";
  /** Override the slot id from adsConfig (defaults to adsConfig.sidebar[side].slot). */
  slot?: string;
  /** Override the unit width in px (defaults to adsConfig.sidebar.width, 160). */
  width?: number;
  /** Override the unit height in px (defaults to adsConfig.sidebar.height, 600). */
  height?: number;
  /** Extra class name(s) appended to the wrapper div. */
  className?: string;
  /** Extra inline styles merged onto the wrapper div (e.g. custom top offset). */
  style?: React.CSSProperties;
}

/**
 * Fixed-position skyscraper ad rendered in the left or right gutter of a
 * page. Stays put ("static") while the page scrolls — it's pinned to the
 * viewport, not the document. Defaults to the 160x600 size, but width/height
 * (and slot) can be overridden per-usage via props.
 *
 * Slot ids and the publisher client id come from `adsConfig`, the single
 * source of truth, unless explicitly overridden via props. Renders nothing
 * if ads are disabled, no client id is set, or the relevant slot id is
 * missing.
 *
 * Requires `<GoogleAdsSense />` to be mounted somewhere higher in the tree
 * so the adsbygoogle loader script is present on the page.
 */
const SidebarAdsSense = ({
  side,
  slot,
  width,
  height,
  className,
  style,
}: SidebarAdsSenseProps) => {
  const resolvedSlot = slot ?? adsConfig.sidebar[side].slot;
  const resolvedWidth = width ?? adsConfig.sidebar.width;
  const resolvedHeight = height ?? adsConfig.sidebar.height;
  const canRender = adsConfig.enabled && !!adsConfig.clientId && !!resolvedSlot;

  useAdsSense(canRender);

  if (!canRender) return null;

  return (
    <div
      className={`sidebar-adsense sidebar-adsense-${side}${
        className ? ` ${className}` : ""
      }`}
      style={style}
      aria-hidden={false}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: `${resolvedWidth}px`,
          height: `${resolvedHeight}px`,
        }}
        data-ad-client={adsConfig.clientId}
        data-ad-slot={resolvedSlot}
      />
    </div>
  );
};

export default SidebarAdsSense;
