"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type PanelViewTrackerProps = {
  panelName: string;
  panelSlug: string;
};

export function PanelViewTracker({ panelName, panelSlug }: PanelViewTrackerProps) {
  useEffect(() => {
    trackEvent("View Panel", {
      panelName,
      panelSlug,
      sourcePage: "panel-detail",
      buttonLocation: null,
    });
  }, [panelName, panelSlug]);

  return null;
}
