import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { stripeStore } from "@/lib/stripe-store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // This endpoint is disabled until an administrator sets the secret in Production.
  const expected = process.env.SMG_TEST_CHECKOUT_TOKEN?.trim();
  if (!expected || expected.length < 32) return NextResponse.json({ error: "Internal test is disabled." }, { status: 404 });
  const configuredOrigin = process.env.SITE_URL || "";
  const accepted = new Set([configuredOrigin]);
  if (configuredOrigin === "https://stephensmolecular.com") accepted.add("https://www.stephensmolecular.com");
  if (!accepted.has(request.headers.get("origin") || "")) return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  let provided: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 1024) throw new Error("Invalid request.");
    provided = JSON.parse(raw).token;
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const a = Buffer.from(typeof provided === "string" ? provided : "");
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  try {
    const stripe = stripeStore();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd", unit_amount: 100, tax_behavior: "exclusive",
          product_data: {
            name: "SMG internal checkout verification — no product shipped",
            description: "Authorized one-time payment test. No laboratory products or fulfillment.",
          },
        },
        quantity: 1,
      }],
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${configuredOrigin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${configuredOrigin}/internal-payment-test`,
      metadata: {
        source: "smg_store", internal_test: "true",
        fulfillment_status: "awaiting_payment",
      },
      custom_text: { submit: { message: "INTERNAL SMG TEST ONLY. No goods will ship. Taxes, if applicable, are additional." } },
    });
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to start internal test checkout." }, { status: 503 });
  }
}
