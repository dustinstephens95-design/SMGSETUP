import { NextRequest, NextResponse } from "next/server";
import { checkoutItems, stripeStore } from "@/lib/stripe-store";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = process.env.SITE_URL || "http://localhost:3000";
  const acceptedOrigins = new Set([origin]);
  if (origin === "https://stephensmolecular.com") acceptedOrigins.add("https://www.stephensmolecular.com");
  if (!acceptedOrigins.has(request.headers.get("origin") || "")) return NextResponse.json({ error: "Checkout must start from the store." }, { status: 403 });
  let items;
  let attempt;
  try {
    const raw = await request.text();
    if (raw.length > 4096) throw new Error("Invalid cart.");
    const body = JSON.parse(raw);
    items = checkoutItems(body.cart);
    attempt = body.attempt;
    if (typeof attempt !== "string" || !/^[a-f0-9-]{36}$/.test(attempt)) throw new Error("Invalid checkout attempt.");
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid cart." }, { status: 400 });
  }
  try {
    const session = await stripeStore().checkout.sessions.create({
      mode: "payment", line_items: items,
      integration_identifier: "smg_store_qhtmavxp",
      success_url: `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop/cart`,
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: { source: "smg_store", fulfillment_status: "awaiting_payment" },
      custom_text: { submit: { message: "US freight is included. Applicable tax is calculated at checkout. Estimated fulfillment: 6–7 weeks after written order confirmation." } },
    }, { idempotencyKey: `smg-${attempt}` });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const detail = error as { type?: string; code?: string; param?: string };
    // Diagnostic identifiers only; never return keys, request bodies or Stripe messages.
    const reason = detail.type || "server_configuration";
    const code = detail.code || null;
    console.error("SMG checkout unavailable", { reason, code, parameter: detail.param || null });
    return NextResponse.json({ error: "Checkout is temporarily unavailable. Please contact SMG before retrying.", reason, code }, { status: 503 });
  }
}
