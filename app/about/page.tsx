export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="border border-primary/40 p-1 mb-8 shadow-[0_0_20px_rgba(255,176,0,0.05)]">
        <div className="border border-primary/40 p-6 md:p-10 bg-primary/[0.03]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start border-b border-primary/30 pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading text-accent uppercase tracking-widest text-shadow">
                Danzel Artamadja
              </h1>
              <p className="font-mono text-sm opacity-70 mt-2 tracking-widest">ID: LAB-MEM-001</p>
            </div>
            <div className="sm:text-right">
              <p className="font-heading text-2xl tracking-widest">
                STATUS: <span className="text-primary animate-pulse shadow-sm">ACTIVE</span>
              </p>
              <p className="font-mono text-xs opacity-50 mt-1 uppercase">Clearance Level 25</p>
            </div>
          </div>

          <div className="space-y-10 font-mono text-base md:text-lg">
            <section>
              <h2 className="text-xl md:text-2xl font-heading tracking-widest text-accent border-b border-primary/20 pb-2 mb-4">
                {"// SUBJECT PROFILE"}
              </h2>
              <p className="leading-relaxed opacity-90">
                Operating primarily as a Software Engineer. System requirements for peak performance include an 8-hour
                sleep cycle, optimal hydration, and quality nutritional input. Currently stationed in Indonesia working
                for an organization called{" "}
                <a
                  href="https://www.gdplabs.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent underline decoration-primary/50 hover:decoration-accent underline-offset-4 transition-colors"
                >
                  GDP Labs
                </a>{" "}
                developing{" "}
                <a
                  href="https://glair.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent underline decoration-primary/50 hover:decoration-accent underline-offset-4 transition-colors"
                >
                  Agentic AI for Enterprises
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-heading tracking-widest text-accent border-b border-primary/20 pb-2 mb-4">
                {"// CORE STACK"}
              </h2>
              <ul className="list-none space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-3">{">"}</span>
                  <span>
                    <span className="text-primary font-bold">Next.js</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">{">"}</span>
                  <span>
                    <span className="text-primary font-bold">Python</span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-3">{">"}</span>
                  <span>
                    <span className="text-primary font-bold">Go</span>
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-heading tracking-widest text-accent border-b border-primary/20 pb-2 mb-4">
                {"// TRAITS & DIRECTIVES"}
              </h2>
              <p className="leading-relaxed mb-6 opacity-90">
                Subject has demonstrated an affinity for programming. Currently undergoing cognitive expansion routines
                in <span className="text-primary font-bold tracking-wide">Mandarin</span> and{" "}
                <span className="text-primary font-bold tracking-wide">Japanese</span> language. Current interests
                include music, Steins;Gate, Stardew Valley.
              </p>
              <div className="border-l-2 border-accent pl-5 py-3 bg-background/60 shadow-inner">
                <p className="italic opacity-90 mb-2">
                  &quot;We are fully responsible for our nature and our choices.&quot;
                </p>
                <p className="text-sm opacity-60 font-heading tracking-widest uppercase">
                  - Lab Member Motto (derived from existential directives)
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-heading tracking-widest text-accent border-b border-primary/20 pb-2 mb-4">
                {"// ANALYSIS"}
              </h2>
              <p className="leading-relaxed mb-6 opacity-90">
                Subject has been diagnosed with{" "}
                <a
                  href="https://www.crystalknows.com/disc/cs-personality-type"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent underline decoration-primary/50 hover:decoration-accent underline-offset-4 transition-colors"
                >
                  DISC behaviour of Cs
                </a>{" "}
                and exhibits an{" "}
                <a
                  href="https://www.16personalities.com/intp-personality"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent underline decoration-primary/50 hover:decoration-accent underline-offset-4 transition-colors"
                >
                  INTP
                </a>{" "}
                cognitive baseline.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
