"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CTAButton } from "@/components/cta-button";
import { TrackedLink } from "@/components/tracked-link";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#panels", label: "Panels" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape, true);

    return () => {
      window.removeEventListener("keydown", handleEscape, true);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="on-brand-dark sticky top-0 z-50 border-b border-white/15 bg-[#07224a]/90 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="max-w-[14rem] text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white sm:max-w-none sm:text-sm sm:tracking-[0.16em]"
        >
          STEPHENS MOLECULAR GROUP
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-white/90 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CTAButton
            href="/?panel=General Inquiry&source=header#contact"
            label="Request Information"
            variant="secondary"
            className="!py-2"
            eventName="Click Request Pricing"
            eventPayload={{ panelName: "General Inquiry", panelSlug: null, sourcePage: "homepage", buttonLocation: "header-request-information" }}
          />
        </div>

        <TrackedLink
          href="tel:+14044656994"
          eventName="Click Phone"
          payload={{ panelName: null, panelSlug: null, sourcePage: "homepage", buttonLocation: "header-call-now" }}
          className="rounded-lg border border-white/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white lg:hidden"
        >
          Call Now
        </TrackedLink>

        <button
          type="button"
          className="ml-2 inline-flex items-center justify-center rounded-lg border border-white/40 p-2 text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-main-nav"
          aria-label={isMobileMenuOpen ? "Close mobile navigation" : "Open mobile navigation"}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div id="mobile-main-nav" className="on-brand-dark border-t border-white/15 bg-[#07224a] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/?panel=General Inquiry&source=mobile-nav#contact"
              onClick={closeMobileMenu}
              className="mt-2 rounded-lg bg-white px-3 py-3 text-sm font-semibold text-[#0f2648]"
            >
              Request Information
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
