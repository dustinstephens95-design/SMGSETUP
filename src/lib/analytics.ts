"use client";

import { track } from "@vercel/analytics";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  track(eventName, payload);
}
