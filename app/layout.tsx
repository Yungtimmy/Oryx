import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Oryx: start on Injective from Africa", description: "Africa-first Injective dApp directory." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
