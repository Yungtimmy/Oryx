import { CURRENCIES, Currency } from "@/lib/currency";
export default function Hero({ currency, onChange }: { currency: Currency; onChange: (c: Currency) => void }) {
  return (<section className="hero">
    <h1>Start on Injective from Africa</h1>
    <p className="muted">Pick a path. Open an app. See costs in your own money.</p>
    <div className="row" role="radiogroup" aria-label="Currency">
      {CURRENCIES.map(c => <button key={c} role="radio" aria-checked={c===currency} className={c===currency?"chip on":"chip"} onClick={()=>onChange(c)}>{c}</button>)}
    </div></section>);
}
