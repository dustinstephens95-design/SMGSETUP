import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { CTAButton } from "@/components/cta-button";
import { startupSteps } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Build Your Molecular Laboratory | Stephens Molecular Group",
  description: "Plan, validate, and launch a molecular laboratory with SMG support for design, training, and go-live readiness.",
  alternates: { canonical: "/build-your-molecular-laboratory" },
};

export default function BuildYourMolecularLaboratoryPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Laboratory Startup"
            title="Build Your Molecular Laboratory with a Practical, Step-by-Step Plan"
            description="SMG helps laboratories move from concept to launch with a clear implementation structure that stays focused on instrument fit, workflow design, validation, and inspection readiness."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {startupSteps.map((step, index) => (
              <article key={step.title} className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(11,37,73,0.14)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e4fd6]">Step {index + 1}</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#0f2648]">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#3f5673]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e4fd6]">Visual Timeline</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#0f2648]">A launch path that stays organized from planning through go-live</h2>
              <div className="mt-8 space-y-4">
                {startupSteps.slice(0, 5).map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl border border-[#d7e2ef] bg-[#f8fbff] p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1e4fd6] text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0f2648]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#3f5673]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-[#07224a] p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ff0e8]">What SMG Adds</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-white/88">
                {[
                  "Implementation planning for practical lab workflows",
                  "Technical support for assay and instrument alignment",
                  "Validation support available throughout the launch process",
                  "Ongoing guidance after go-live for a smoother transition",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-xl border border-white/12 bg-white/8 px-4 py-3">
                    <ArrowRight size={16} className="mt-1 shrink-0 text-[#9ff0e8]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/?panel=General Inquiry&source=laboratory-startup#contact" label="Request Pricing" eventName="Click Request Pricing" eventPayload={{ panelName: "Laboratory Startup", panelSlug: null, sourcePage: "build-your-molecular-laboratory", buttonLocation: "startup-request-pricing" }} className="!bg-[#0b6f74] hover:!bg-[#095f63]" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
