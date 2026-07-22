import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FlaskConical, PhoneCall, Send } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { ContactForm } from "@/components/contact-form";
import { PanelCard } from "@/components/panel-card";
import { SectionViewTracker } from "@/components/section-view-tracker";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackedLink } from "@/components/tracked-link";
import { getPanelsWithBrochures } from "@/lib/brochures";
import { services } from "@/lib/services";

const stats = [
  "7 Molecular Panels",
  "Laboratory Consulting",
  "Validation Support",
  "Technical Support",
  "Workflow Optimization",
  "Nationwide Support",
];

const reasons = [
  "Personalized Support",
  "Rapid Technical Assistance",
  "Validation Expertise",
  "Laboratory Experience",
  "Competitive Pricing",
  "Implementation Support",
  "Workflow Optimization",
  "Inspection Readiness",
];

const validationItems = [
  "Validation planning",
  "Accuracy studies",
  "Precision studies",
  "Analytical sensitivity",
  "Specificity",
  "Interference",
  "Cross-reactivity",
  "Workflow implementation",
  "SOP development",
];

export const metadata: Metadata = {
  title: "Stephens Molecular Group | Molecular Diagnostics Solutions for Clinical Laboratories",
  description:
    "Stephens Molecular Group provides molecular diagnostic products, validation support, laboratory consulting, assay implementation, workflow optimization, and technical expertise for clinical laboratories.",
};

export default async function HomePage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedPanel = typeof resolvedSearchParams?.panel === "string" ? resolvedSearchParams.panel : "";
  const selectedPanelSlug = typeof resolvedSearchParams?.slug === "string" ? resolvedSearchParams.slug : "";
  const sourcePage = typeof resolvedSearchParams?.source === "string" ? resolvedSearchParams.source : "homepage";
  const panels = getPanelsWithBrochures();

  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero-dna relative overflow-hidden bg-[#07224a] text-white">
          <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-22 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-30">
            <div className="max-w-3xl reveal">
              <p className="font-[var(--font-heading)] text-[0.72rem] uppercase tracking-[0.35em] text-[#7dd9d1]">Atlanta, Georgia</p>
              <h1 className="mt-5 font-[var(--font-heading)] text-5xl leading-[0.94] sm:text-6xl lg:text-7xl">
                Molecular Diagnostics Solutions for Modern Clinical Laboratories
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/88">
                Stephens Molecular Group partners with laboratories to deliver molecular diagnostic products, validation support,
                laboratory consulting, assay implementation, workflow optimization, and technical expertise.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <CTAButton
                  href={selectedPanel ? `/?panel=${encodeURIComponent(selectedPanel)}&slug=${encodeURIComponent(selectedPanelSlug)}&source=hero#contact` : "/?source=hero#contact"}
                  label="Request Pricing"
                  variant="primary"
                  className="!bg-[#1fb0a8] hover:!bg-[#17938d]"
                  eventName="Click Request Pricing"
                  eventPayload={{ panelName: selectedPanel || null, panelSlug: selectedPanelSlug || null, sourcePage: "homepage", buttonLocation: "hero-request-pricing" }}
                />
                <CTAButton
                  href="/?panel=Molecular Laboratory Consulting&source=hero-schedule#contact"
                  label="Schedule Consultation"
                  variant="secondary"
                  eventName="Click Request Pricing"
                  eventPayload={{ panelName: "Molecular Laboratory Consulting", panelSlug: null, sourcePage: "homepage", buttonLocation: "hero-schedule-consultation" }}
                />
                <CTAButton
                  href="#panels"
                  label="Explore Molecular Panels"
                  variant="ghost"
                  eventName="View Panel"
                  eventPayload={{ panelName: null, panelSlug: null, sourcePage: "homepage", buttonLocation: "hero-explore-panels" }}
                />
                <TrackedLink
                  href="tel:+14044656994"
                  eventName="Click Phone"
                  payload={{ panelName: selectedPanel || null, panelSlug: selectedPanelSlug || null, sourcePage: "homepage", buttonLocation: "hero-call" }}
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                >
                  Call Now
                </TrackedLink>
                <TrackedLink
                  href="mailto:dustin@stephensmolecular.com"
                  eventName="Click Email"
                  payload={{ panelName: selectedPanel || null, panelSlug: selectedPanelSlug || null, sourcePage: "homepage", buttonLocation: "hero-email" }}
                  className="inline-flex min-h-11 items-center rounded-xl border border-white/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                >
                  Email Us
                </TrackedLink>
              </div>
            </div>

            <div className="reveal hidden rounded-2xl border border-white/15 bg-white/7 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] lg:block">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#93e5de]">Molecular Focus</p>
              <h2 className="mt-4 text-3xl font-semibold leading-[0.95]">Panel Implementation Designed for Clinical Laboratories</h2>
              <div className="mt-6 space-y-3 text-sm text-white/88">
                <p className="rounded-lg border border-white/12 bg-white/8 px-3 py-2">Multiplex panel onboarding support</p>
                <p className="rounded-lg border border-white/12 bg-white/8 px-3 py-2">Laboratory workflow optimization</p>
                <p className="rounded-lg border border-white/12 bg-white/8 px-3 py-2">Validation planning and documentation</p>
                <p className="rounded-lg border border-white/12 bg-white/8 px-3 py-2">Technical support and troubleshooting</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat}
                  className="reveal rounded-2xl border border-white/15 bg-white/8 px-5 py-4 text-sm font-medium backdrop-blur-sm"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-choose" className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionViewTracker sectionId="why-choose" eventName="View Services" />
          <SectionHeading
            eyebrow="Why Choose SMG"
            title="Support Built Around Laboratory Workflow, Validation, and Implementation"
            description="Every engagement is structured to help laboratories move faster with confidence while keeping the focus on product selection, implementation, and operational support."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason} className="card reveal flex min-h-48 flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(12,42,82,0.16)]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1e4fd6]">
                  <BadgeCheck size={22} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-[#0f2648]">{reason}</h3>
                <p className="mt-3 text-sm leading-7 text-[#3f5673]">
                  Practical support for laboratories that need responsive collaboration and dependable execution.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="panels" className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Molecular Panels"
            title="Multiplex Panels for Clinical Decision Support"
            description="Each panel mirrors brochure-defined targets, compatible instruments, and per-reaction pricing to help your laboratory make fast procurement and implementation decisions."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {panels.map((panel) => (
              <PanelCard key={panel.slug} panel={panel} />
            ))}
          </div>
        </section>

        <section id="services" className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionViewTracker sectionId="services" eventName="View Services" />
          <SectionHeading
            eyebrow="Laboratory Services"
            title="Consulting and Implementation Support for Real-World Molecular Labs"
            description="SMG's consulting services stay focused on practical execution: workflow design, assay implementation, SOP support, and operational troubleshooting."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="section-shell p-8 sm:p-10">
            <SectionHeading
              eyebrow="Validation Support"
              title="Validation Support for Implementation Planning"
              description="SMG assists laboratories with planning and documentation across the validation lifecycle."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {validationItems.map((item) => (
                <div key={item} className="rounded-xl border border-[#c7d7eb] bg-white p-5 text-sm font-medium text-[#123054]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="bg-[#07224a] p-8 text-white sm:p-10">
                <p className="text-xs uppercase tracking-[0.25em] text-[#80d9d2]">Contact SMG</p>
                <h2 className="mt-3 font-[var(--font-heading)] text-4xl">Start Your Lab Conversation</h2>
                <p className="mt-4 text-white/85">
                  Reach out for panel details, pricing, validation planning, and implementation support.
                </p>
                <div className="mt-8 space-y-4 text-sm text-white/90">
                  <div className="flex items-center gap-3">
                    <PhoneCall size={16} strokeWidth={1.8} />
                    <TrackedLink href="tel:+14044656994" eventName="Click Phone" payload={{ panelName: selectedPanel || null, panelSlug: selectedPanelSlug || null, sourcePage: "homepage", buttonLocation: "contact-panel-phone" }} className="underline-offset-2 hover:underline">
                      404-465-6994
                    </TrackedLink>
                  </div>
                  <div className="flex items-center gap-3">
                    <Send size={16} strokeWidth={1.8} />
                    <TrackedLink href="mailto:dustin@stephensmolecular.com" eventName="Click Email" payload={{ panelName: selectedPanel || null, panelSlug: selectedPanelSlug || null, sourcePage: "homepage", buttonLocation: "contact-panel-email" }} className="underline-offset-2 hover:underline">
                      dustin@stephensmolecular.com
                    </TrackedLink>
                  </div>
                  <div className="flex items-center gap-3"><FlaskConical size={16} strokeWidth={1.8} /> Stephens Molecular Group, Atlanta, Georgia</div>
                </div>
              </div>
              <ContactForm
                key={`${selectedPanel}|${selectedPanelSlug}|${sourcePage}`}
                defaultPanel={selectedPanel || (sourcePage === "homepage" ? "General Inquiry" : "")}
              />
            </div>
          </div>
        </section>

        <section id="about" className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="card p-8 sm:p-10">
              <SectionHeading
                eyebrow="About SMG"
                title="Precision Diagnostics. Practical Solutions."
                description="Stephens Molecular Group partners with laboratories to simplify molecular diagnostics through consulting, assay implementation, laboratory validation, workflow optimization, technical support, and diagnostic products."
              />
              <p className="text-base leading-7 text-[#3f5673]">
                Our mission is to help laboratories achieve fast, accurate molecular testing with implementation models that are practical, compliant, and sustainable for long-term growth.
              </p>
            </div>
            <div className="card grid gap-4 p-6">
              <Link href={selectedPanel ? `/?panel=${encodeURIComponent(selectedPanel)}&source=about#contact` : "/?panel=General Inquiry&source=about#contact"} className="rounded-xl border border-[#c8d8eb] p-5 transition hover:bg-[#f3f8ff]">
                <p className="text-sm font-semibold text-[#1e4fd6]">Request Information</p>
                <p className="mt-1 text-sm text-[#3f5673]">Discuss panel fit, workflow, and implementation planning.</p>
              </Link>
              <Link href="tel:+14044656994" className="rounded-xl border border-[#c8d8eb] p-5 transition hover:bg-[#f3f8ff]">
                <p className="text-sm font-semibold text-[#1e4fd6]">Call Now</p>
                <p className="mt-1 text-sm text-[#3f5673]">404-465-6994</p>
              </Link>
              <Link href="mailto:dustin@stephensmolecular.com" className="rounded-xl border border-[#c8d8eb] p-5 transition hover:bg-[#f3f8ff]">
                <p className="text-sm font-semibold text-[#1e4fd6]">Email Us</p>
                <p className="mt-1 text-sm text-[#3f5673]">dustin@stephensmolecular.com</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
