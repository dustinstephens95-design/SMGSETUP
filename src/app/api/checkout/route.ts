import { NextRequest, NextResponse } from "next/server";
import { checkoutItems, stripeStore } from "@/lib/stripe-store";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = process.env.SITE_URL || "http://localhost:3000";
  if (request.headers.get("origin") !== origin) return NextResponse.json({ error: "Checkout must start from the store." }, { status: 403 });
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
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      metadata: { source: "smg_store_sandbox" },
      custom_text: { submit: { message: "Sandbox test only. No goods will be shipped. Live shipping and taxes are still being configured." } },
    }, { idempotencyKey: `smg-${attempt}` });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Sandbox checkout is unavailable. Check the server test key and Checkout Sessions permission." }, { status: 503 });
  }
}
