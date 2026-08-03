import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Request Received | Stephens Molecular Group",
  description: "Stephens Molecular Group received your request for pricing and will follow up with laboratory support details.",
  alternates: {
    canonical: "/request-pricing/confirmation",
  },
  openGraph: {
    title: "Request Received | Stephens Molecular Group",
    description: "Stephens Molecular Group received your request for pricing and will follow up with laboratory support details.",
    url: "/request-pricing/confirmation",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Request Received | Stephens Molecular Group",
    description: "Stephens Molecular Group received your request for pricing and will follow up with laboratory support details.",
  },
};

export default function RequestPricingConfirmationPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="card overflow-hidden p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#1e4fd6]">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1e4fd6]">Request Received</p>
              <h1 className="mt-2 text-4xl font-semibold text-[#0f2648]">Thank you for contacting Stephens Molecular Group</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#3f5673]">
                A member of our team will review your request, confirm panel fit and instrument compatibility, and follow up with pricing and implementation guidance.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#d7e2ef] bg-[#f8fbff] p-5">
              <p className="text-sm font-semibold text-[#1e4fd6]">Next Step</p>
              <p className="mt-2 text-sm leading-7 text-[#385271]">We will contact your laboratory with pricing, validation support, and implementation details.</p>
            </div>
            <div className="rounded-2xl border border-[#d7e2ef] bg-[#f8fbff] p-5">
              <p className="text-sm font-semibold text-[#1e4fd6]">Call SMG</p>
              <a className="mt-2 block text-sm leading-7 text-[#385271] hover:text-[#0f2648]" href="tel:+14044656994">
                404-465-6994
              </a>
            </div>
            <div className="rounded-2xl border border-[#d7e2ef] bg-[#f8fbff] p-5">
              <p className="text-sm font-semibold text-[#1e4fd6]">Email SMG</p>
              <a className="mt-2 block text-sm leading-7 text-[#385271] hover:text-[#0f2648]" href="mailto:dustin@stephensmolecular.com">
                dustin@stephensmolecular.com
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="rounded-xl bg-[#1e4fd6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1742b5]">
              Return Home
            </Link>
            <Link href="/panels/abr-panel" className="rounded-xl border border-[#c8d8eb] px-5 py-3 text-sm font-semibold text-[#0f2648] transition hover:bg-[#edf4ff]">
              View ABR Panel
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}