"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  payload?: Record<string, string | number | boolean | null | undefined>;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function TrackedLink({
  href,
  eventName,
  payload,
  className,
  children,
  target,
  rel,
  ariaLabel,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, payload);
  };

  if (isExternalHref(href)) {
    return (
      <a href={href} target={target} rel={rel} className={className} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}
