import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ClipboardList, Download, FlaskConical, Microscope, Phone, Send } from "lucide-react";
import { PanelCard } from "@/components/panel-card";
import { PanelViewTracker } from "@/components/panel-view-tracker";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { getPanelWithBrochureBySlug, getPanelsWithBrochures } from "@/lib/brochures";
import { panelThemeStyles } from "@/lib/panels";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return getPanelsWithBrochures().map((panel) => ({ slug: panel.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolvedParams = await params;
  const panel = getPanelWithBrochureBySlug(resolvedParams.slug);

  if (!panel) {
    return { title: "Panel Not Found | Stephens Molecular Group" };
  }

  return {
    title: `${panel.name} | Stephens Molecular Group`,
    description: panel.metaDescription ?? panel.clinicalOverview,
    alternates: {
      canonical: `/panels/${panel.slug}`,
    },
    openGraph: {
      title: `${panel.name} | Stephens Molecular Group`,
      description: panel.metaDescription ?? panel.clinicalOverview,
      url: `/panels/${panel.slug}`,
      type: "website",
      images: [
        {
          url: panel.image,
          alt: `SMG ${panel.name} card`,
        },
      ],
    },
  };
}

export default async function PanelDetailPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const panel = getPanelWithBrochureBySlug(resolvedParams.slug);

  if (!panel) {
    notFound();
  }

  const theme = panelThemeStyles[panel.theme];

  const quoteHref = `/?panel=${encodeURIComponent(panel.name)}&source=panel-detail#contact`;
  const panelCardImageSrc = panel.image;
  const relatedPanels = getPanelsWithBrochures().filter((relatedPanel) => relatedPanel.slug !== panel.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-8">
      <PanelViewTracker panelName={panel.name} panelSlug={panel.slug} />
      <div className="mx-auto w-full max-w-7xl space-y-9">
        <Link href="/" className="inline-flex rounded-lg border border-[#c8d7eb] px-4 py-2 text-sm font-medium text-[#123052] hover:bg-[#edf4ff]">
          Back to Home
        </Link>

        <section className={`panel-mobile-hero overflow-hidden rounded-3xl border border-[#c7d7eb] bg-gradient-to-r ${theme.surface}`}>
          <div className="grid gap-7 p-6 md:grid-cols-[minmax(0,1fr)_1.2fr] md:items-center md:p-10">
            <div className="mx-auto w-full max-w-[560px] rounded-2xl border border-white/40 bg-white/30 p-2 sm:p-3">
              <div className="w-full">
                <Image
                  src={panelCardImageSrc}
                  alt={`SMG ${panel.name} card`}
                  width={1200}
                  height={1600}
                  priority
                  className="h-auto w-full rounded-xl object-contain"
                  sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) 42vw, 520px"
                />
              </div>
            </div>
            <div className="panel-mobile-hero-content">
              <p className="panel-mobile-hero-subtitle text-xs font-semibold uppercase tracking-[0.2em] text-[#1e4fd6]">
                {panel.subtitle ?? `${panel.targetCount} Target Multiplex Real-Time PCR Assay`}
              </p>
              <h1 className="panel-mobile-hero-title mt-3 text-4xl font-semibold leading-[0.95] text-[#0f2648] sm:text-5xl lg:text-6xl">{panel.name}</h1>
              <p className="panel-mobile-hero-description mt-4 text-base leading-8 text-[#2f4a69]">{panel.clinicalOverview}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.85fr]">
          <article className="card p-6 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-[#0f2648]">Clinical Overview</h2>
            <p className="text-sm leading-7 text-[#385271]">
              {panel.clinicalOverview}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Clinical Applications", panel.clinicalApplications[0]],
                ["Compatible Instruments", panel.compatiblePlatforms[0]],
                ["Validation Support Available", "Planning materials and implementation support are available."],
                ["Custom Panel Options", "Discuss panel fit, implementation scope, and workflow needs with SMG."],
                ["Implementation Assistance", "SMG supports launch planning and go-live readiness."],
                ["Technical Support", "Responsive troubleshooting and project support are available."],
              ].map(([title, value]) => (
                <div key={title} className="rounded-xl border border-[#d7e2ef] bg-[#f8fbff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1e4fd6]">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#123052]">{value}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="card p-6 sm:p-8 lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1e4fd6]">Request Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#0f2648]">Talk with SMG about this panel</h2>
            <p className="mt-4 text-sm leading-7 text-[#3f5673]">
              Get pricing, brochure access, and implementation support for the {panel.name}.
            </p>
            <div className="mt-6 space-y-3">
              <TrackedLink
                href={quoteHref}
                eventName="Click Request Pricing"
                payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-sticky-request-pricing" }}
                className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold ${theme.button}`}
              >
                Request Pricing
              </TrackedLink>
              <TrackedLink
                href="mailto:dustin@stephensmolecular.com"
                eventName="Click Email"
                payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-sticky-contact-sales" }}
                className="block rounded-xl border border-[#c8d7eb] px-4 py-3 text-center text-sm font-semibold text-[#0f2648] hover:bg-[#edf4ff]"
              >
                Contact Sales
              </TrackedLink>
              {panel.brochurePdf ? (
                <TrackedLink
                  href={panel.brochurePdf}
                  download={panel.brochureFileName}
                  eventName="Download Brochure"
                  payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-sticky-brochure" }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c8d7eb] px-4 py-3 text-sm font-semibold text-[#0f2648] hover:bg-[#edf4ff]"
                  ariaLabel={`Download ${panel.name} brochure`}
                >
                  <Download size={15} /> Download Brochure
                </TrackedLink>
              ) : null}
            </div>
            <div className="mt-6 space-y-2 text-sm text-[#385271]">
              <p className="rounded-lg border border-[#d7e2f0] bg-[#f8fbff] px-3 py-2">Product Code: {panel.productCode}</p>
              <p className="rounded-lg border border-[#d7e2f0] bg-[#f8fbff] px-3 py-2">Compatible Platforms: {panel.compatiblePlatforms.length}</p>
              <p className="rounded-lg border border-[#d7e2f0] bg-[#f8fbff] px-3 py-2">Validation support available</p>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-[#0f2648]"><ClipboardList size={20} strokeWidth={1.8} /> Product Specifications</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Technology", panel.technology],
                ["Target Count", `${panel.targetCount} Targets`],
                ["Compatible Instruments", panel.compatiblePlatforms.join(", ")],
                ["Sample Type", panel.sampleType],
                ["Product Code", panel.productCode],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#d7e2ef] bg-[#f7faff] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1e4fd6]">{label}</p>
                  <p className="mt-2 text-sm leading-7 text-[#123052]">{value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-[#0f2648]">Clinical Overview</h2>
            <p className="text-sm leading-7 text-[#385271]">
              {panel.clinicalOverview}
            </p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="card p-6">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold text-[#0f2648]"><ClipboardList size={20} strokeWidth={1.8} /> Clinical Applications</h2>
            <ul className="grid gap-2 text-sm text-[#385271] sm:grid-cols-2">
              {panel.clinicalApplications.map((application) => (
                <li key={application} className="rounded-lg border border-[#d7e2f0] bg-[#f7faff] px-3 py-2">{application}</li>
              ))}
            </ul>
          </article>

          <article className="card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-[#0f2648]"><Microscope size={20} strokeWidth={1.8} /> Compatible Platforms</h2>
            <ul className="space-y-2 text-sm text-[#385271]">
              {panel.compatiblePlatforms.map((platform) => (
                <li key={platform} className="rounded-lg border border-[#d8e2ef] bg-[#f8fbff] px-3 py-2">{platform}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="card p-6 lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-[#0f2648]"><FlaskConical size={20} strokeWidth={1.8} /> Target List</h2>
            <div className="space-y-5">
              {Object.entries(panel.targets).map(([group, targets]) => (
                <div key={group}>
                  <h3 className="text-base font-semibold text-[#1e4fd6]">{group}</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-[#385271] sm:grid-cols-2">
                    {targets.map((target) => (
                      <li key={target} className="rounded-lg border border-[#d8e2f0] bg-[#f8fbff] px-3 py-2">{target}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#0f2648]"><BadgeCheck size={19} strokeWidth={1.8} /> Validation Support</h2>
            <p className="text-sm leading-7 text-[#3f5673]">
              Validation support is available to help your laboratory with implementation planning,
              documentation workflows, and go-live preparation.
            </p>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#3d5a7d]">Key Features</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#385271]">
              {panel.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2"><BadgeCheck size={16} strokeWidth={1.8} className="mt-0.5 text-[#1e4fd6]" />{feature}</li>
              ))}
            </ul>

            <div className="mt-5 space-y-2">
              <TrackedLink
                href={quoteHref}
                eventName="Click Request Pricing"
                payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-request-pricing" }}
                className={`block rounded-xl px-4 py-3 text-center text-sm font-semibold ${theme.button}`}
              >
                Request Pricing
              </TrackedLink>
              <TrackedLink
                href="tel:+14044656994"
                eventName="Click Phone"
                payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-phone" }}
                className="block rounded-xl border border-[#c8d7eb] px-4 py-3 text-center text-sm font-semibold text-[#0f2648] hover:bg-[#edf4ff]"
              >
                Call 404-465-6994
              </TrackedLink>
            </div>
          </article>
        </section>

        <section id="contact" className="card grid gap-6 p-6 md:grid-cols-2 md:p-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#0f2648]">Request Pricing</h2>
            <p className="mt-3 text-sm leading-7 text-[#3f5673]">
              Contact Stephens Molecular Group for pricing, panel fit guidance, and implementation planning.
            </p>
            <div className="mt-5 space-y-2 text-sm text-[#2f4a69]">
              <p className="flex items-center gap-2">
                <Phone size={14} />
                <TrackedLink href="tel:+14044656994" eventName="Click Phone" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-contact-phone" }} className="hover:text-[#0f2648]">
                  404-465-6994
                </TrackedLink>
              </p>
              <p className="flex items-center gap-2">
                <Send size={14} />
                <TrackedLink href="mailto:dustin@stephensmolecular.com" eventName="Click Email" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-contact-email" }} className="hover:text-[#0f2648]">
                  dustin@stephensmolecular.com
                </TrackedLink>
              </p>
              <p className="flex items-center gap-2">Atlanta, Georgia</p>
            </div>
          </div>
          <div className="flex flex-wrap content-start gap-3 md:justify-end">
            <TrackedLink
              href={quoteHref}
              eventName="Click Request Pricing"
              payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-bottom-request-pricing" }}
              className={`rounded-xl px-5 py-3 text-sm font-semibold ${theme.button}`}
            >
              Request Pricing
            </TrackedLink>
            <TrackedLink
              href="mailto:dustin@stephensmolecular.com"
              eventName="Click Email"
              payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-bottom-email" }}
              className="rounded-xl border border-[#c8d7eb] px-5 py-3 text-sm font-semibold text-[#0f2648] hover:bg-[#edf4ff]"
            >
              Contact Sales
            </TrackedLink>
            {panel.brochurePdf ? (
              <TrackedLink
                href={panel.brochurePdf}
                download={panel.brochureFileName}
                eventName="Download Brochure"
                payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "panel-detail", buttonLocation: "panel-detail-brochure" }}
                className="inline-flex items-center gap-2 rounded-xl border border-[#c8d7eb] px-5 py-3 text-sm font-semibold text-[#0f2648] hover:bg-[#edf4ff]"
                ariaLabel={`Download ${panel.name} brochure`}
              >
                <Download size={15} /> Download Brochure
              </TrackedLink>
            ) : null}
          </div>
        </section>

        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Related Panels"
            title="Other SMG Panels Worth Reviewing"
            description="Compare neighboring panels to better match target coverage, workflow needs, and laboratory planning goals."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedPanels.map((relatedPanel) => (
              <PanelCard key={relatedPanel.slug} panel={relatedPanel} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
