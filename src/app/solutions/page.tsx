import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { specialtySolutions } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Solutions | Stephens Molecular Group",
  description: "SMG panel recommendations by specialty including urgent care, hospitals, reference labs, OB/GYN, and more.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Specialty Solutions"
            title="Panel Recommendations Organized by Laboratory and Clinical Setting"
            description="SMG helps match panel selection to specialty-specific workflows so laboratories can move faster with a clearer implementation path."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {specialtySolutions.map((solution) => (
              <article key={solution.title} className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(11,37,73,0.14)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e4fd6]">{solution.title}</p>
                <p className="mt-3 text-sm leading-7 text-[#3f5673]">{solution.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {solution.panelRecommendations.map((panel) => (
                    <TrackedLink
                      key={panel}
                      href={`/?panel=${encodeURIComponent(panel)}&source=solutions#contact`}
                      eventName="Click Request Pricing"
                      payload={{ panelName: panel, panelSlug: null, sourcePage: "solutions", buttonLocation: "solutions-panel-chip" }}
                      className="rounded-full border border-[#c8d8eb] px-3 py-1.5 text-xs font-semibold text-[#0f2648] transition hover:bg-[#edf4ff]"
                    >
                      {panel}
                    </TrackedLink>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
