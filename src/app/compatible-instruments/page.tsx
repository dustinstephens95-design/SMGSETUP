import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { instrumentCards } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Compatible Instruments | Stephens Molecular Group",
  description: "Explore compatible real-time PCR instruments supported by Stephens Molecular Group panels and implementation planning.",
  alternates: { canonical: "/compatible-instruments" },
  openGraph: {
    title: "Compatible Instruments | Stephens Molecular Group",
    description: "Explore compatible real-time PCR instruments supported by Stephens Molecular Group panels and implementation planning.",
    url: "/compatible-instruments",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compatible Instruments | Stephens Molecular Group",
    description: "Explore compatible real-time PCR instruments supported by Stephens Molecular Group panels and implementation planning.",
  },
};

export default function CompatibleInstrumentsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compatible Instruments"
            title="Supported Real-Time PCR Platforms for Practical Laboratory Implementation"
            description="SMG panels are designed to fit into real-world molecular laboratory workflows with platform compatibility that supports confident planning, validation, and go-live execution."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {instrumentCards.map((instrument) => (
              <article key={instrument.name} id={instrument.route.split("#")[1]} className="card group overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_34px_rgba(11,37,73,0.16)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#07224a]">
                  <Image
                    src="/instruments/compatible-instrument.svg"
                    alt={`${instrument.name} compatibility illustration`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <span className="inline-flex rounded-full bg-[#edf4ff] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#1e4fd6]">
                    {instrument.badge}
                  </span>
                  <h2 className="text-2xl font-semibold leading-tight text-[#0f2648]">{instrument.name}</h2>
                  <p className="text-sm leading-7 text-[#3f5673]">{instrument.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <TrackedLink href="/?panel=General Inquiry&source=compatible-instruments#contact" eventName="Click Request Pricing" payload={{ panelName: instrument.name, panelSlug: null, sourcePage: "compatible-instruments", buttonLocation: "instrument-request-pricing" }} className="rounded-xl bg-[#1e4fd6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1742b5]">
                      Request Pricing
                    </TrackedLink>
                    <Link href="/panels/abr-panel" className="rounded-xl border border-[#c8d8eb] px-4 py-2 text-sm font-semibold text-[#0f2648] transition hover:bg-[#edf4ff]">
                      View ABR Panel
                    </Link>
                  </div>
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
