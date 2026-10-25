"use client";
import { useState } from "react";
import apps from "@/data/apps.json";
import { App, PathId, PATHS } from "@/lib/types";
import { CURRENCIES, Currency, gasLabel } from "@/lib/currency";

const steps = [["Get a wallet","Keplr or Leap on mobile or desktop"],["Fund it","Bridge or buy a little INJ"],["Open a first dApp","Start with Helix"],["Cash out via Injara","INJ to naira in Telegram"]];
// TODO: confirm official URLs before enabling.
const footer: [string, [string, string | null][]][] = [["Cash out",[["Injara",null]]],["Bots",[["InjpulseBot",null]]],["Community",[["Injective Africa Telegram",null],["Discord",null]]]];
const L = ({ href, children, className }: { href: string | null; children: React.ReactNode; className?: string }) =>
  href ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
       : <a className={className} aria-disabled="true" title="Link not confirmed yet">{children}</a>;

export default function Directory() {
  const [ccy, setCcy] = useState<Currency>("NGN");
  const [path, setPath] = useState<PathId | "all">("all");
  const list = (apps as App[]).filter(a => path === "all" || a.paths.includes(path));
  return (<div className="wrap">
    <header><div className="brand"><img src="/logo-mark.svg" alt="" width={32} height={32} className="mark" /><span>Oryx<em>Africa</em></span></div></header>
    <section className="hero">
      <h1>Start on Injective from Africa</h1>
      <p>Pick your currency. Follow a path. Open only official apps, with gas shown in money you recognize.</p>
      <div className="currency" role="group" aria-label="Currency">
        {CURRENCIES.map(c => <button key={c} type="button" aria-pressed={c === ccy} onClick={() => setCcy(c)}>{c}</button>)}
      </div>
    </section>
    <div className="chips" role="group" aria-label="Paths">
      <button type="button" className="chip" aria-pressed={path === "all"} onClick={() => setPath("all")}>All</button>
      {PATHS.map(p => <button key={p.id} type="button" className="chip" aria-pressed={path === p.id} onClick={() => setPath(p.id)}>{p.label}</button>)}
    </div>
    <div className="grid">{list.map(a => (
      <article className="card" key={a.id}>
        <div className="card-top"><div className="logo" aria-hidden>{a.initial}</div>
          <div><h3>{a.name}{!a.verified && <span className="tag">Link unconfirmed</span>}</h3><p className="job">{a.job}</p></div></div>
        <div className="meta"><span className={`pill ${a.difficulty}`}>{a.difficulty}</span><span className="gas">{gasLabel(ccy, a.gasInj)}</span></div>
        <div className="actions"><L className="btn btn-primary" href={a.url}>Open</L><L className="btn btn-ghost" href={a.watchUrl}>Watch how</L></div>
      </article>))}</div>
    <p className="note">Gas in {ccy} is an estimate from placeholder rates.</p>
    <section className="section"><h2>Starter path</h2><div className="steps">
      {steps.map(([t, d], i) => <div className="step" key={t}><div className="n">{i + 1}</div><div className="t">{t}</div><div className="d">{d}</div></div>)}
    </div></section>
    <aside className="safety"><h3>Stay safe</h3><ul>
      <li>Only open apps listed here. Links go to official domains.</li>
      <li>Never share a seed phrase or sign a blank permit.</li>
      <li>Ignore DMs offering help or airdrops.</li>
      <li>Read <a href="https://docs.injective.network" target="_blank" rel="noopener noreferrer">Injective docs</a> before bridging sizeable funds.</li>
    </ul></aside>
    <footer>{footer.map(([h, ls]) => <div key={h}><strong>{h}</strong>{ls.map(([n, u], i) => <span key={n}>{i > 0 && " · "}<L href={u}>{n}</L></span>)}</div>)}</footer>
  </div>);
}
