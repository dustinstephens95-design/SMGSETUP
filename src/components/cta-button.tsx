"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  eventName?: string;
  eventPayload?: Record<string, string | number | boolean | null | undefined>;
};

const variantClasses: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary: "bg-[#1e4fd6] text-white hover:bg-[#1742b5] shadow-sm",
  secondary: "bg-white text-[#0f2648] border border-[#c9d9ee] hover:bg-[#f2f7ff]",
  ghost: "bg-transparent text-white border border-white/45 hover:bg-white/10",
};

export function CTAButton({ href, label, variant = "primary", className = "", eventName, eventPayload }: CTAButtonProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (eventName) {
          trackEvent(eventName, eventPayload);
        }
      }}
      className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition ${variantClasses[variant]} ${className}`}
    >
      {label}
      <ArrowRight size={16} />
    </Link>
  );
}
