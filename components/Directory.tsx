"use client";
import { useState } from "react";
import apps from "@/data/apps.json";
import { App, PathId, PATHS, Category, CATEGORIES } from "@/lib/types";
import { CURRENCIES, Currency, gasLabel } from "@/lib/currency";

const ALL = apps as App[];
const LANES = PATHS.map(p => p.id);
const RANK = { easy: ["r1", "I"], medium: ["r2", "II"], hard: ["r3", "III"] } as const;
const ICON: Record<PathId, string> = { "first-trade": "↗", "earn-yield": "◎", "launch-token": "✶", "cash-out": "⇄" };
const trail = [["Get a wallet","Keplr or Leap. Phrase stays offline."],["Fund it","Bridge or buy a little INJ."],["First mission","Start with Helix or Sprout."],["Cash out","INJ to naira via Injara."]];
// TODO: confirm official URLs before enabling the null ones.
const footer: [string, [string, string | null][]][] = [["Cash out",[["Injara community","https://t.me/injaratg"]]],["Bots",[["InjpulseBot",null]]],["Community",[["Injective Africa Telegram",null],["Discord",null]]]];

function L({ href, children, className }: { href: string | null; children: React.ReactNode; className?: string }) {
  return href ? <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
              : <a className={className} aria-disabled="true" title="Link not confirmed yet">{children}</a>;
}

export default function Directory() {
  const [ccy, setCcy] = useState<Currency>("NGN");
  const [path, setPath] = useState<PathId | "all">("all");
  const [cat, setCat] = useState<Category | "all">("all");
  const [cleared, setCleared] = useState<Set<string>>(new Set()); // all fresh in production
  const toggle = (id: string) => setCleared(s => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const list = ALL.filter(a => (path === "all" || a.paths.includes(path)) && (cat === "all" || a.cats.includes(cat)));

  return (<div className="wrap">
    <header>
      <div className="brand"><img src="/oryx-logo-A.jpg" alt="Oryx" width={44} height={44} /><div className="name">Oryx <b>Africa</b></div></div>
      <div className="badge-live">Night market</div>
    </header>
    <section className="hero">
      <div className="eyebrow">Injective from the continent</div>
      <h1>Your first <em>missions</em> on Injective</h1>
      <p>Pick your market. Choose a lane. Enter only official apps, with gas shown in money you already use.</p>
      <div className="market"><span className="label">Market</span>
        <div className="row" role="group" aria-label="Currency">
          {CURRENCIES.map(c => <button key={c} type="button" aria-pressed={c === ccy} onClick={() => setCcy(c)}>{c}</button>)}
        </div></div>
    </section>
    <div className="filters"><div className="label">Filter by category</div>
      <div className="filter-row" role="group" aria-label="Categories">
        <button type="button" className="filter" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All</button>
        {CATEGORIES.map(c => <button key={c} type="button" className="filter" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div></div>
    <div className="lanes" role="group" aria-label="Quest lanes">
      <button type="button" className="lane" aria-pressed={path === "all"} onClick={() => setPath("all")}><span className="ico">◆</span>All lanes</button>
      {PATHS.map(p => <button key={p.id} type="button" className="lane" aria-pressed={path === p.id} onClick={() => setPath(p.id)}><span className="ico">{ICON[p.id]}</span>{p.label}</button>)}
    </div>
    <div className="grid">{list.length === 0 && <p className="job">No missions in this filter.</p>}
      {list.map(a => {
        const n = ALL.indexOf(a) + 1, stop = Math.min(...a.paths.map(p => LANES.indexOf(p) + 1)), done = cleared.has(a.id), open = !!a.url && a.verified;
        const [rc, rl] = RANK[a.difficulty];
        return (<article key={a.id} className={`mission${open ? "" : " locked"}${done ? " cleared" : ""}`}>
          <div className="mission-rail">
            <div className="crest"><b>{a.initial}</b></div>
            <div className={`seal ${rc}`} aria-label={`Rank ${rl}`}><i><span>RANK<strong>{rl}</strong></span></i></div>
          </div>
          <div className="mission-body">
            {!open && <div className="stamp locked">LOCKED</div>}
            {done && <div className="stamp cleared">✓ CLEARED</div>}
            <div className="top"><span className="serial">M-0{n}</span>{a.cats.map(c => <span key={c} className="cat">{c}</span>)}</div>
            <div><h3>{a.name}</h3>
              <div className="pips" aria-label="Lanes">{LANES.map(l => <span key={l} className={a.paths.includes(l) ? "on" : ""} title={l} />)}</div></div>
            <p className="job">{a.job}</p>
            <div className="loot-row">
              <span className="loot">◆ <small>Reward</small> {a.reward}</span>
              <span className="entry">Entry <b>{gasLabel(ccy, a.gasInj)}</b></span>
              {!open && <span className="warn">Link pending</span>}
            </div>
            <div className="ctrail">Trail {stop}/4 {LANES.map((l, i) => <span key={l} className={i < stop ? "on" : ""} />)}</div>
            <div className="actions">
              {open ? <a className="btn btn-enter" href={a.url!} target="_blank" rel="noopener noreferrer" onClick={() => toggle(a.id)}>{done ? "Cleared ✓" : "Enter"}</a>
                    : <a className="btn btn-enter" aria-disabled="true">Enter</a>}
              <L className="btn btn-replay" href={a.watchUrl}>Replay</L>
            </div>
          </div>
        </article>);
      })}</div>
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
    <footer>{footer.map(([h, ls]) => <div key={h}><strong>{h}</strong>{ls.map(([nm, u], i) => <span key={nm}>{i > 0 && " · "}<L href={u}>{nm}</L></span>)}</div>)}</footer>
  </div>);
}
