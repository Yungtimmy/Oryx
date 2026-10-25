import { App } from "@/lib/types";
import { Currency, gasIn } from "@/lib/currency";
const link = (u: string) => (u.startsWith("http") ? u : undefined);
export default function AppCard({ app, currency }: { app: App; currency: Currency }) {
  return (<article className="card">
    <div className="logo" aria-hidden>{app.name[0]}</div>
    <div className="grow">
      <h3>{app.name} {!app.verified && <span className="tag">URL unverified</span>}</h3>
      <p className="muted">{app.job}</p>
      <p className="meta">{app.difficulty} · Gas {gasIn(currency, app.gasInj)} (est.)</p>
    </div>
    <div className="actions">
      <a className="btn" href={link(app.url)} target="_blank" rel="noopener noreferrer" aria-disabled={!link(app.url)}>Open</a>
      <a className="btn ghost" href={link(app.watchUrl)} target="_blank" rel="noopener noreferrer" aria-disabled={!link(app.watchUrl)}>Watch how</a>
    </div></article>);
}
