import Link from "next/link";
import { labReports } from "../../.velite";

export default function DMails() {
  const reports = labReports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-heading text-accent uppercase tracking-widest mb-3 text-shadow">
          BLOG
        </h1>
        <p className="font-mono opacity-70 tracking-widest text-sm md:text-base">{"// THOUGHTS & LAB REPORTS"}</p>
      </div>

      <div className="flex flex-col gap-6 font-mono">
        {reports.map((report) => (
          <Link key={report.slug} href={`/blog/${report.slug}`}>
            <article className="border-l-4 border-primary/40 bg-primary/[0.02] hover:bg-primary/[0.08] hover:border-accent transition-all duration-300 p-6 md:p-8 cursor-pointer group shadow-sm">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
                <h2 className="text-2xl md:text-3xl font-heading tracking-wider group-hover:text-accent transition-colors">
                  {report.title}
                </h2>
                <div className="text-accent nixie-glow text-xl md:text-2xl font-heading tracking-widest shrink-0 transition-all duration-300 group-hover:scale-105">
                  {report.divergence_number}
                </div>
              </div>
              <p className="opacity-70 text-sm tracking-widest">
                TRANSMITTED: {new Date(report.date).toLocaleDateString()}
              </p>
            </article>
          </Link>
        ))}
        {reports.length === 0 && (
          <div className="text-center p-10 border border-primary/20 bg-background/50">
            <p className="opacity-70 animate-pulse tracking-widest">Awaiting incoming transmissions...</p>
          </div>
        )}
      </div>
    </div>
  );
}
