"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type SectionViewTrackerProps = {
  sectionId: string;
  eventName: string;
};

export function SectionViewTracker({ sectionId, eventName }: SectionViewTrackerProps) {
  useEffect(() => {
    const sectionElement = document.getElementById(sectionId);

    if (!sectionElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent(eventName, {
              sourcePage: "homepage",
              panelName: null,
              panelSlug: null,
              buttonLocation: sectionId,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, [eventName, sectionId]);

  return null;
}
