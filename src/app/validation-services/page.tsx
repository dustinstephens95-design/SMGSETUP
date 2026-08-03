import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { CTAButton } from "@/components/cta-button";
import { TrackedLink } from "@/components/tracked-link";
import { validationServices } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Validation Services | Stephens Molecular Group",
  description: "Validation services for molecular laboratories including LoD, accuracy, precision, reports, and on-site support.",
  alternates: { canonical: "/validation-services" },
};

export default function ValidationServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Validation Services"
            title="Validation Support Built for Real Laboratory Launches"
            description="SMG helps laboratories plan, document, and execute validation work with practical support that keeps the focus on go-live readiness and audit confidence."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {validationServices.map((item) => (
              <article key={item.title} className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(11,37,73,0.14)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1e4fd6]">
                  <BadgeCheck size={22} strokeWidth={1.8} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-[#0f2648]">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#3f5673]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e4fd6]">Implementation Support</p>
              <h2 className="mt-3 text-4xl font-semibold text-[#0f2648]">Validation and launch support that feels organized from day one</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#3f5673]">
                Whether your lab needs a narrow assay verification plan or a full implementation package, SMG can help build the path from validation planning to inspection readiness.
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-3 lg:justify-end">
              <CTAButton href="/?panel=General Inquiry&source=validation-services#contact" label="Request Pricing" eventName="Click Request Pricing" eventPayload={{ panelName: "Validation Services", panelSlug: null, sourcePage: "validation-services", buttonLocation: "validation-services-request-pricing" }} />
              <TrackedLink href="mailto:dustin@stephensmolecular.com" eventName="Click Email" payload={{ panelName: "Validation Services", panelSlug: null, sourcePage: "validation-services", buttonLocation: "validation-services-contact-sales" }} className="rounded-xl border border-[#c8d8eb] px-5 py-3 text-sm font-semibold text-[#0f2648] transition hover:bg-[#edf4ff]">
                Contact Sales
              </TrackedLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
