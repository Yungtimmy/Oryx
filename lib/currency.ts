// ESTIMATES ONLY. Placeholder rates from data/fx.json; replace with a live feed.
import fx from "@/data/fx.json";
export const CURRENCIES = ["NGN", "GHS", "KES", "ZAR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export function gasLabel(c: Currency, inj: number) {
  if (inj === 0) return "No on-chain gas";
  const v = inj * fx.INJ_USD * fx[c];
  const fmt = new Intl.NumberFormat("en", { maximumFractionDigits: c === "USD" ? 2 : 0 });
  return `~${fmt.format(v)} ${c} gas`;
}
