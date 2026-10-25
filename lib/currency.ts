// ESTIMATES ONLY. Placeholder rates; replace with a live price feed.
export const CURRENCIES = ["NGN", "GHS", "KES", "ZAR", "USD"] as const;
export type Currency = (typeof CURRENCIES)[number];
export const INJ_USD_ESTIMATE = 20;
export const USD_RATES: Record<Currency, number> = { NGN: 1550, GHS: 15.5, KES: 129, ZAR: 18, USD: 1 };
export function gasIn(c: Currency, inj: number) {
  const v = inj * INJ_USD_ESTIMATE * USD_RATES[c];
  return `~${v < 0.01 ? v.toFixed(4) : v.toFixed(2)} ${c}`;
}
