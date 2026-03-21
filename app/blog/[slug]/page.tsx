import { labReports } from "../../../.velite";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return labReports.map((report) => ({ slug: report.slug }));
}

export default async function DMailPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const report = labReports.find((r) => r.slug === params.slug);

  if (!report) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto mt-4">
      <div className="border border-primary/40 p-6 md:p-10 bg-background mb-10 shadow-[0_0_15px_rgba(255,176,0,0.05)] relative overflow-hidden">
        <div className="absolute top-10 right-4 font-heading text-6xl md:text-8xl nixie-glow opacity-20 z-0 select-none hidden sm:block pointer-events-none">
          {report.divergence_number}
        </div>

        <div className="relative z-10">
          <div className="mb-10 border-b border-primary/30 pb-6">
            <h1 className="text-3xl md:text-5xl font-heading text-accent uppercase tracking-wider mb-6 text-shadow">
              {report.title}
            </h1>
            <div className="flex items-center gap-4 text-sm md:text-base font-mono opacity-80 tracking-wider">
              <span>DATE: {new Date(report.date).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose prose-invert prose-p:font-mono prose-p:text-primary prose-p:opacity-90 prose-headings:font-heading prose-headings:text-accent prose-headings:tracking-wider prose-strong:text-accent prose-strong:font-normal max-w-none text-base md:text-lg leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: report.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}
