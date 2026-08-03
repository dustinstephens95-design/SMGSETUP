import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";

const panelLinks = [
  { label: "Respiratory", href: "/panels/respiratory" },
  { label: "Limited Respiratory", href: "/panels/limited-respiratory" },
  { label: "UTI", href: "/panels/uti" },
  { label: "Women's Health", href: "/panels/womens-health" },
  { label: "STI", href: "/panels/sti" },
  { label: "ABR Panel", href: "/panels/abr-panel" },
  { label: "Wound", href: "/panels/wound" },
  { label: "Pharyngitis", href: "/panels/pharyngitis" },
];

const resourceLinks = [
  { label: "Resources", href: "/resources" },
  { label: "Compare Panels", href: "/compare-panels" },
  { label: "FAQ", href: "/faq" },
  { label: "Compatible Instruments", href: "/compatible-instruments" },
  { label: "Validation Services", href: "/validation-services" },
  { label: "Solutions", href: "/solutions" },
];

export function SiteFooter() {
  return (
    <footer className="on-brand-dark mt-24 border-t border-[#c9d8ec] bg-[#061b38] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <p className="font-[var(--font-heading)] text-4xl leading-none tracking-wide text-white">SMG</p>
          <p className="mt-2 text-lg font-semibold">Stephens Molecular Group</p>
          <p className="mt-3 text-sm text-white/80">Precision Diagnostics. Practical Solutions.</p>
          <div className="mt-5 flex items-center gap-2">
            <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg border border-white/20 p-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              <Globe size={16} />
            </Link>
            <TrackedLink href="mailto:dustin@stephensmolecular.com" eventName="Click Email" payload={{ panelName: null, panelSlug: null, sourcePage: "footer", buttonLocation: "footer-icon-email" }} ariaLabel="Email" className="rounded-lg border border-white/20 p-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              <Mail size={16} />
            </TrackedLink>
            <TrackedLink href="tel:+14044656994" eventName="Click Phone" payload={{ panelName: null, panelSlug: null, sourcePage: "footer", buttonLocation: "footer-icon-phone" }} ariaLabel="Phone" className="rounded-lg border border-white/20 p-2 text-white/80 transition hover:bg-white/10 hover:text-white">
              <Phone size={16} />
            </TrackedLink>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/85">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li><Link href="/#services">Services</Link></li>
            <li><Link href="/#panels">Panels</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            {resourceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/85">Panels</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {panelLinks.map((panel) => (
              <li key={panel.href}>
                <Link href={panel.href} className="hover:text-white">
                  {panel.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/85">Contact</p>
          <ul className="mt-3 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone size={14} />
              <TrackedLink href="tel:+14044656994" eventName="Click Phone" payload={{ panelName: null, panelSlug: null, sourcePage: "footer", buttonLocation: "footer-phone" }} className="hover:text-white">
                404-465-6994
              </TrackedLink>
            </li>
            <li className="flex items-center gap-2 min-w-0">
              <Mail size={14} />
              <TrackedLink href="mailto:dustin@stephensmolecular.com" eventName="Click Email" payload={{ panelName: null, panelSlug: null, sourcePage: "footer", buttonLocation: "footer-email" }} className="min-w-0 break-all hover:text-white">
                dustin@stephensmolecular.com
              </TrackedLink>
            </li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Atlanta, Georgia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-4 text-center text-xs text-white/70">
        Copyright {new Date().getFullYear()} Stephens Molecular Group. All rights reserved.
      </div>
    </footer>
  );
}
