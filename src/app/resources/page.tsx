import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { getPanelsWithBrochures } from "@/lib/brochures";
import { resourceGuides } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Resources | Stephens Molecular Group",
  description: "Download SMG panel brochures and practical laboratory resources for validation, startup, and implementation planning.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const panels = getPanelsWithBrochures();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Resources"
            title="Download Brochures and Laboratory Support Materials"
            description="Use the resource center to review current panel brochures and practical guides for validation, startup, and inspection readiness."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {panels.map((panel) => (
              <article key={panel.slug} className="card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(11,37,73,0.15)]">
                <div className="relative h-48 overflow-hidden">
                  <Image src={panel.image} alt={`${panel.name} brochure thumbnail`} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e4fd6]">{panel.targetCount} Targets</p>
                    <h2 className="mt-2 text-2xl font-semibold text-[#0f2648]">{panel.name}</h2>
                  </div>
                  <p className="text-sm leading-7 text-[#3f5673]">{panel.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {panel.brochurePdf ? (
                      <TrackedLink href={panel.brochurePdf} download={panel.brochureFileName} eventName="Download Brochure" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "resources", buttonLocation: "resources-download-brochure" }} className="inline-flex items-center gap-2 rounded-xl bg-[#1e4fd6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1742b5]">
                        <Download size={15} /> Download Brochure
                      </TrackedLink>
                    ) : null}
                    <TrackedLink href={`/?panel=${encodeURIComponent(panel.name)}&slug=${encodeURIComponent(panel.slug)}&source=resources#contact`} eventName="Click Request Pricing" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "resources", buttonLocation: "resources-request-pricing" }} className="rounded-xl border border-[#c8d8eb] px-4 py-2 text-sm font-semibold text-[#0f2648] transition hover:bg-[#edf4ff]">
                      Request Pricing
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Support Guides"
            title="Practical PDFs for Validation, Startup, and Inspection Preparation"
            description="These downloadable resources support early planning while keeping the branding and workflow consistent with the rest of SMG."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {resourceGuides.map((guide) => (
              <article key={guide.title} className="card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(11,37,73,0.14)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1e4fd6]">
                  <FileText size={22} strokeWidth={1.8} />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-[#0f2648]">{guide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#3f5673]">{guide.description}</p>
                <div className="mt-5">
                  <TrackedLink href={guide.href} download={guide.fileName} eventName="Download Resource" payload={{ panelName: guide.title, panelSlug: null, sourcePage: "resources", buttonLocation: "resource-guide-download" }} className="inline-flex items-center gap-2 rounded-xl bg-[#1e4fd6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1742b5]">
                    <Download size={15} /> Download PDF
                  </TrackedLink>
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
