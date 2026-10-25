// TODO: confirm official URLs for Injara, InjpulseBot, Injective Africa TG/Discord.
const links = [["Injara","TODO"],["InjpulseBot","TODO"],["Injective Africa Telegram","TODO"],["Injective Africa Discord","TODO"]];
export default function Footer() {
  return (<footer className="footer"><strong>Oryx</strong><div className="row">
    {links.map(([n,u])=><a key={n} href={u.startsWith("http")?u:undefined} aria-disabled={!u.startsWith("http")}>{n}</a>)}
  </div></footer>);
}
