import type { Metadata } from "next";
import { Fraunces, Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
const serif = Fraunces({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });
export const metadata: Metadata = { title: "Oryx: Your first missions on Injective", description: "Start on Injective from Africa. A quest board of official Injective apps." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}><body>{children}</body></html>;
}
