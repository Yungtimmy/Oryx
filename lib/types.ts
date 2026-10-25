export type PathId = "first-trade" | "earn-yield" | "launch-token" | "cash-out";
export type Category = "Trading" | "Launch" | "Lending" | "DeFi" | "Cash out";
export type Difficulty = "easy" | "medium" | "hard";
export type App = { id: string; name: string; initial: string; job: string; difficulty: Difficulty; paths: PathId[]; cats: Category[]; reward: string; gasInj: number; url: string | null; verified: boolean; watchUrl: string | null; crest?: string; note?: string };
export const PATHS: { id: PathId; label: string }[] = [
  { id: "first-trade", label: "First trade" }, { id: "earn-yield", label: "Earn yield" },
  { id: "launch-token", label: "Launch a token" }, { id: "cash-out", label: "Cash out" } ];
export const CATEGORIES: Category[] = ["Trading", "Launch", "Lending", "DeFi", "Cash out"];
