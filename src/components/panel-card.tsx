import Image from "next/image";
import { Microscope } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { panelThemeStyles, type PanelData } from "@/lib/panels";

type PanelCardProps = {
  panel: PanelData;
};

export function PanelCard({ panel }: PanelCardProps) {
  const theme = panelThemeStyles[panel.theme];

  return (
    <article
      className={`card reveal group flex h-full flex-col overflow-hidden ring-1 ${theme.ring} transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_34px_rgba(11,37,73,0.16)]`}
    >
      <div className="relative h-[140px] overflow-hidden md:h-[146px] lg:h-[152px]">
        <Image
          src={panel.cardImage ?? panel.image}
          alt={`${panel.name} card artwork`}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: panel.imagePosition ?? "center center" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex h-full flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${theme.badge}`}>
            {panel.targetCount} Targets
          </span>
        </div>

        <h3 className="mt-4 text-3xl font-semibold leading-[0.95] text-[#0f2648]">{panel.name}</h3>

        <p className="mt-3 text-sm leading-7 text-[#3f5673]">{panel.description}</p>

        <ul className="mt-5 space-y-2 text-sm text-[#26415f]">
          <li className="flex items-center gap-2 rounded-lg border border-[#d8e4f3] bg-[#f8fbff] px-3 py-2">
            <Microscope size={15} className="text-[#1e4fd6]" strokeWidth={1.8} />
            <span>Compatible Platforms: {panel.compatiblePlatforms.length}</span>
          </li>
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <TrackedLink
            href={`/panels/${panel.slug}`}
            eventName="View Panel"
            payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "homepage", buttonLocation: "panel-card-view-details" }}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${theme.button}`}
          >
            View Details
          </TrackedLink>
          <TrackedLink
            href={`/?panel=${encodeURIComponent(panel.name)}&slug=${encodeURIComponent(panel.slug)}&source=panel-card#contact`}
            eventName="Click Request Pricing"
            payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "homepage", buttonLocation: "panel-card-request-pricing" }}
            className="rounded-xl border border-[#c6d6eb] px-4 py-2 text-sm font-semibold text-[#0f2648] transition hover:bg-[#eff5fe]"
          >
            Request Pricing
          </TrackedLink>
          {panel.brochurePdf ? (
            <TrackedLink
              href={panel.brochurePdf}
              eventName="Download Brochure"
              payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "homepage", buttonLocation: "panel-card-brochure" }}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[#c6d6eb] px-4 py-2 text-sm font-semibold text-[#0f2648] transition hover:bg-[#eff5fe]"
            >
              Download Brochure
            </TrackedLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
