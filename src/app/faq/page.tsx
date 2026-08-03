import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { SearchableFAQ } from "@/components/searchable-faq";

export const metadata: Metadata = {
  title: "FAQ | Stephens Molecular Group",
  description: "Search answers about SMG panels, instruments, validation support, implementation, and pricing.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="section-pad mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Search Common Questions About SMG Panels and Support"
            description="Find practical answers about validation, compatible instruments, implementation support, and request-pricing workflows."
          />
          <SearchableFAQ />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
