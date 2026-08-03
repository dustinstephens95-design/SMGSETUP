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
  download?: string | boolean;
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
  download,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, payload);
  };

  if (isExternalHref(href) || download !== undefined) {
    return (
      <a href={href} target={target} rel={rel} download={download} className={className} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick} download={download}>
      {children}
    </Link>
  );
}
