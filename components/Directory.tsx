"use client";
import { useState } from "react";
import apps from "@/data/apps.json";
import { App, PathId } from "@/lib/types";
import { Currency } from "@/lib/currency";
import Hero from "./Hero"; import PathChips from "./PathChips"; import AppCard from "./AppCard";
import StarterPath from "./StarterPath"; import SafetyStrip from "./SafetyStrip"; import Footer from "./Footer";
export default function Directory() {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [path, setPath] = useState<PathId | null>(null);
  const list = (apps as App[]).filter(a => !path || a.path.includes(path));
  return (<main className="wrap">
    <Hero currency={currency} onChange={setCurrency} />
    <PathChips value={path} onChange={setPath} />
    <section className="cards">{list.map(a => <AppCard key={a.id} app={a} currency={currency} />)}</section>
    <p className="muted small">Gas shown in {currency} is an estimate from placeholder rates.</p>
    <StarterPath /><SafetyStrip /><Footer />
  </main>);
}
