const steps = [["Get a wallet","Install Keplr or Leap and back up your recovery phrase offline."],["Fund it","Buy INJ or USDT and send it to your Injective address."],["First dApp","Make a small first trade on Helix."],["Cash out","Move back to local currency via Injara."]];
export default function StarterPath() {
  return (<section className="section"><h2>Starter path</h2><ol className="steps">
    {steps.map(([t,d],i)=><li key={t}><span className="num">{i+1}</span><div><strong>{t}</strong><p className="muted">{d}</p></div></li>)}
  </ol></section>);
}
