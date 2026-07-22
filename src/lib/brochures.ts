import { existsSync } from "node:fs";
import path from "node:path";
import { panels, type PanelData } from "@/lib/panels";

export type PanelWithBrochure = PanelData & { brochurePdf: string | null };

function brochureExists(fileName: string) {
  const absolutePath = path.join(process.cwd(), "public", "brochures", fileName);
  return existsSync(absolutePath);
}

export function getPanelsWithBrochures(): PanelWithBrochure[] {
  return panels.map((panel) => ({
    ...panel,
    brochurePdf: brochureExists(panel.brochureFileName)
      ? `/brochures/${panel.brochureFileName}`
      : null,
  }));
}

export function getPanelWithBrochureBySlug(slug: string): PanelWithBrochure | undefined {
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  return getPanelsWithBrochures().find((panel) => panel.slug.toLowerCase() === normalizedSlug);
}
