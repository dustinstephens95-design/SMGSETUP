import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { PanelComparisonTable } from "@/components/panel-comparison-table";
import { getPanelsWithBrochures } from "@/lib/brochures";

export const metadata: Metadata = {
  title: "Compare Panels | Stephens Molecular Group",
  description: "Compare SMG panels by target count, specimen type, compatible instruments, brochure access, and pricing request options.",
  alternates: { canonical: "/compare-panels" },
};

export default function ComparePanelsPage() {
  const panels = getPanelsWithBrochures();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Compare Panels"
            title="Search and Compare SMG Panels"
            description="Use the comparison table to review target counts, specimen information, instrument compatibility, brochure access, and request-pricing options side by side."
          />
          <PanelComparisonTable panels={panels} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
