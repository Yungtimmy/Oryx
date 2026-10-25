import { PATHS, PathId } from "@/lib/types";
export default function PathChips({ value, onChange }: { value: PathId | null; onChange: (p: PathId | null) => void }) {
  return (<nav className="row section" aria-label="Paths">
    <button className={value===null?"chip on":"chip"} onClick={()=>onChange(null)}>All</button>
    {PATHS.map(p => <button key={p.id} className={value===p.id?"chip on":"chip"} onClick={()=>onChange(p.id)}>{p.label}</button>)}
  </nav>);
}
