import { Chakra_Petch, IBM_Plex_Mono } from "next/font/google";

export const fontSans = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: "400",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});
