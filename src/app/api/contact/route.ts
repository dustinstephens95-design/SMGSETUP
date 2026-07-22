import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().min(2),
  email: z.string().email(),
  phone: z.string().trim().min(7),
  panel: z.string().trim().min(2),
  message: z.string().trim().min(10),
  sourcePage: z.string().trim().optional(),
  panelSlug: z.string().trim().optional(),
  campaignSource: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
  submittedAt: z.string().trim().optional(),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const validation = contactSchema.safeParse(json);

    if (!validation.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please check required fields and try again.",
        },
        { status: 400 }
      );
    }

    const payload = validation.data;

    if (payload.website && payload.website.trim() !== "") {
      return NextResponse.json({ ok: true, message: "Submitted." }, { status: 200 });
    }

    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      return NextResponse.json(
        {
          ok: false,
          message: "Form provider is not configured yet. Please set FORMSPREE_ENDPOINT.",
        },
        { status: 500 }
      );
    }

    const providerResponse = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        company: payload.company,
        email: payload.email,
        phone: payload.phone,
        panel: payload.panel,
        message: payload.message,
        source_page: payload.sourcePage,
        panel_slug: payload.panelSlug,
        campaign_source: payload.campaignSource,
        referrer: payload.referrer,
        submitted_at: payload.submittedAt,
      }),
    });

    if (!providerResponse.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "Unable to submit your request right now. Please call or email SMG.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Your request was submitted. SMG will follow up shortly.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected submission error. Please try again.",
      },
      { status: 500 }
    );
  }
}
