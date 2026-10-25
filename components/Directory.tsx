"use client";
import { useState } from "react";
import apps from "@/data/apps.json";
import { App, PathId, PATHS } from "@/lib/types";
import { CURRENCIES, Currency, gasLabel } from "@/lib/currency";

const RANK = { easy: ["r1", "Rank I"], medium: ["r2", "Rank II"], hard: ["r3", "Rank III"] } as const;
const ICON: Record<PathId, string> = { "first-trade": "↗", "earn-yield": "◎", "launch-token": "✶", "cash-out": "⇄" };
const trail = [["Get a wallet","Keplr or Leap. Phrase stays offline."],["Fund it","Bridge or buy a little INJ."],["First mission","Start with Helix."],["Cash out","INJ to naira via Injara."]];
// TODO: confirm official URLs before enabling the null ones.
const footer: [string, [string, string | null][]][] = [["Cash out",[["Injara community","https://t.me/injaratg"]]],["Bots",[["InjpulseBot",null]]],["Community",[["Injective Africa Telegram",null],["Discord",null]]]];

function L({ href, children, className }: { href: string | null; children: React.ReactNode; className?: string }) {
  return href ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
              : <a className={className} aria-disabled="true" title="Link not confirmed yet">{children}</a>;
}

export default function Directory() {
  const [ccy, setCcy] = useState<Currency>("NGN");
  const [path, setPath] = useState<PathId | "all">("all");
  const list = (apps as App[]).filter(a => path === "all" || a.paths.includes(path));
  return (<div className="wrap">
    <header>
      <div className="brand"><img src="/logo-oryx.svg" alt="" width={40} height={40} /><div className="name">Oryx <b>Africa</b></div></div>
      <div className="badge-live">Night market</div>
    </header>
    <div className="kente" aria-hidden />
    <section className="hero">
      <div className="eyebrow">Injective · from the continent</div>
      <h1>Your first <em>missions</em> on Injective</h1>
      <p>Pick your market. Choose a lane. Enter only official apps, with gas shown in money you already use.</p>
      <div className="market">
        <span className="label">Market</span>
        <div className="row" role="group" aria-label="Currency">
          {CURRENCIES.map(c => <button key={c} type="button" aria-pressed={c === ccy} onClick={() => setCcy(c)}>{c}</button>)}
        </div>
      </div>
    </section>
    <div className="lanes" role="group" aria-label="Quest lanes">
      <button type="button" className="lane" aria-pressed={path === "all"} onClick={() => setPath("all")}><span className="ico">◆</span>All lanes</button>
      {PATHS.map(p => <button key={p.id} type="button" className="lane" aria-pressed={path === p.id} onClick={() => setPath(p.id)}><span className="ico">{ICON[p.id]}</span>{p.label}</button>)}
    </div>
    <div className="grid">{list.map(a => (
      <article className="mission" key={a.id}>
        <div className="mission-top"><div className="crest" aria-hidden>{a.initial}</div>
          <div><h3>{a.name}</h3><p className="job">{a.job}</p></div></div>
        <div className="meta">
          <span className={`seal ${RANK[a.difficulty][0]}`}>{RANK[a.difficulty][1]}</span>
          <span className="gas">{gasLabel(ccy, a.gasInj)}</span>
          {!a.verified && <span className="warn">Link unconfirmed</span>}
        </div>
        <div className="actions"><L className="btn btn-enter" href={a.url}>Enter</L><L className="btn btn-replay" href={a.watchUrl}>Replay</L></div>
      </article>))}</div>
    <p className="note">Gas in {ccy} is an estimate from placeholder rates.</p>
    <section className="section"><h2>The Trail</h2><p className="sub">Four stops from wallet to naira. Small amounts first.</p>
      <div className="trail">{trail.map(([t, d], i) => <div className="node" key={t}><div className="shield">{i + 1}</div><div className="t">{t}</div><div className="d">{d}</div></div>)}</div>
    </section>
    <aside className="rules"><h3>Market rules</h3><ul>
      <li>Only enter missions listed here. Links go to official domains.</li>
      <li>Nobody legit asks for a seed phrase.</li>
      <li>Check the URL before you connect.</li>
      <li>Read <a href="https://docs.injective.network" target="_blank" rel="noopener noreferrer">Injective docs</a> before bridging sizeable funds.</li>
    </ul></aside>
    <footer>{footer.map(([h, ls]) => <div key={h}><strong>{h}</strong>{ls.map(([n, u], i) => <span key={n}>{i > 0 && " · "}<L href={u}>{n}</L></span>)}</div>)}</footer>
  </div>);
}
