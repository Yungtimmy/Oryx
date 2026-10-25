import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
export const metadata: Metadata = { title: "Oryx: Start on Injective from Africa", description: "Africa-first Injective dApp directory." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
