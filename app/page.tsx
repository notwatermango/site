export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-16">
        <h1 className="text-6xl md:text-8xl font-heading nixie-glow tracking-widest leading-none">1.048596</h1>
        <p className="font-heading text-xl mt-4 opacity-70 tracking-widest">CURRENT DIVERGENCE</p>
      </div>

      <div className="max-w-2xl w-full text-left border border-primary/30 p-8 bg-background/80 relative shadow-[0_0_15px_rgba(255,176,0,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
        <p className="text-lg md:text-xl leading-relaxed font-mono">
          <span className="text-accent font-bold mr-2">{">"}</span> Welcome to the lab of notwatermango.
          <br />
          <span className="text-accent font-bold mr-2">{">"}</span> Software Engineer.
          <br />
          <span className="text-accent font-bold mr-2">{">"}</span> Currently operating out of Bandung, Indonesia.
          <br />
          <span className="text-accent font-bold mr-2">{">"}</span> The Organization knows me as Danzel Artamadja.
          <br />
          <span className="text-accent font-bold mr-2">{">"}</span> {""}
          <span className="animate-pulse inline-block w-3 h-5 bg-primary align-middle shadow-[0_0_8px_rgba(255,176,0,0.8)]"></span>
        </p>
      </div>
    </div>
  );
}
