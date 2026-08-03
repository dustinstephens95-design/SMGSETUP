"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import type { PanelWithBrochure } from "@/lib/brochures";

type PanelComparisonTableProps = {
  panels: PanelWithBrochure[];
};

type SortKey = "name" | "targetCount" | "platforms";

export function PanelComparisonTable({ panels }: PanelComparisonTableProps) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const visiblePanels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filteredPanels = !normalizedQuery
      ? panels
      : panels.filter((panel) => {
          const combined = [panel.name, panel.shortName, panel.productCode, panel.sampleType, panel.compatiblePlatforms.join(" ")]
            .join(" ")
            .toLowerCase();

          return combined.includes(normalizedQuery);
        });

    return [...filteredPanels].sort((left, right) => {
      if (sortKey === "targetCount") {
        return right.targetCount - left.targetCount;
      }

      if (sortKey === "platforms") {
        return right.compatiblePlatforms.length - left.compatiblePlatforms.length;
      }

      return left.name.localeCompare(right.name);
    });
  }, [panels, query, sortKey]);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="relative block">
          <span className="sr-only">Search panels</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1e4fd6]" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search panels, product codes, specimen types, or instruments"
            className="w-full rounded-2xl border border-[#c9d8eb] bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#1e4fd6]"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {[
            { label: "Name", value: "name" as const },
            { label: "Target Count", value: "targetCount" as const },
            { label: "Compatible Instruments", value: "platforms" as const },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSortKey(option.value)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                sortKey === option.value
                  ? "border-[#1e4fd6] bg-[#edf4ff] text-[#0f2648]"
                  : "border-[#c8d8eb] bg-white text-[#0f2648] hover:bg-[#f3f8ff]"
              }`}
            >
              <ArrowUpDown size={15} />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#d7e2ef] bg-white shadow-[0_18px_32px_rgba(11,37,73,0.08)]">
        <div className="hidden grid-cols-[1.2fr_0.5fr_0.9fr_1.3fr_0.6fr_0.7fr] gap-4 border-b border-[#d7e2ef] bg-[#f7faff] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#3d5a7d] md:grid">
          <span>Panel</span>
          <span>Targets</span>
          <span>Specimen</span>
          <span>Compatible Instruments</span>
          <span>Brochure</span>
          <span>Pricing</span>
        </div>
        <div className="divide-y divide-[#e2ebf5]">
          {visiblePanels.map((panel) => (
            <div key={panel.slug} className="grid gap-4 px-6 py-5 md:grid-cols-[1.2fr_0.5fr_0.9fr_1.3fr_0.6fr_0.7fr] md:items-center">
              <div>
                <p className="text-lg font-semibold text-[#0f2648]">{panel.name}</p>
                <p className="mt-1 text-sm leading-7 text-[#3f5673]">{panel.description}</p>
              </div>
              <div className="text-sm font-semibold text-[#1e4fd6]">{panel.targetCount}</div>
              <div className="text-sm text-[#385271]">{panel.sampleType}</div>
              <div className="text-sm text-[#385271]">{panel.compatiblePlatforms.join(", ")}</div>
              <div>
                {panel.brochurePdf ? (
                  <TrackedLink href={panel.brochurePdf} download={panel.brochureFileName} eventName="Download Brochure" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "compare-panels", buttonLocation: "compare-panel-brochure" }} className="text-sm font-semibold text-[#1e4fd6] hover:underline">
                    Download
                  </TrackedLink>
                ) : (
                  <span className="text-sm text-[#8aa0bb]">Unavailable</span>
                )}
              </div>
              <div>
                <TrackedLink href={`/?panel=${encodeURIComponent(panel.name)}&slug=${encodeURIComponent(panel.slug)}&source=compare-panels#contact`} eventName="Click Request Pricing" payload={{ panelName: panel.name, panelSlug: panel.slug, sourcePage: "compare-panels", buttonLocation: "compare-panel-request-pricing" }} className="inline-flex rounded-xl bg-[#1e4fd6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1742b5]">
                  Request
                </TrackedLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
