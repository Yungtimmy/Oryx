# Oryx

Africa-first directory of Injective dApps. Pick a path, open an app, and see gas costs in NGN, GHS, KES, ZAR or USD.

## Run
```
npm install
npm run dev
```

## Structure
- `data/apps.json`: the app list (edit this to add apps)
- `data/fx.json` + `lib/currency.ts`: placeholder FX/INJ rates (estimates only)
- Design system: Frontend Dev handoff (DESIGN_SYSTEM.md), Instrument Serif / DM Sans / IBM Plex Mono
- `components/`: Hero, PathChips, AppCard, StarterPath, SafetyStrip, Footer

## Day-one apps
Helix, Sprout, RunUp, Hydro, Injara (Africa off-ramp).
Any URL still marked `TODO` or `verified: false` must be checked against official sources before launch.
