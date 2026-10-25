export type PathId = "first-trade" | "earn-yield" | "launch-token" | "cash-out";
export type App = { id: string; name: string; job: string; path: PathId[]; difficulty: string; gasInj: number; url: string; watchUrl: string; logo: string; verified: boolean };
export const PATHS: { id: PathId; label: string }[] = [
  { id: "first-trade", label: "First trade" }, { id: "earn-yield", label: "Earn yield" },
  { id: "launch-token", label: "Launch a token" }, { id: "cash-out", label: "Cash out" } ];
