import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";
import { fontMono, fontSans } from "@/packages/configs/fonts.config";
import { seo } from "@/packages/seo/seo.config";
import { themeInitScript } from "@/packages/utils/apply-theme";

export const metadata: Metadata = seo;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Runs before hydration so the correct .dark class is applied
            before first paint — prevents a flash of the wrong theme. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} min-h-screen w-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
