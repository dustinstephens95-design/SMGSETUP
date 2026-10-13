import { NextRequest, NextResponse } from "next/server";
import { stripeStore } from "@/lib/stripe-store";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  const stripe = stripeStore();
  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature") || "", secret);
  } catch { return NextResponse.json({ error: "Invalid signature." }, { status: 400 }); }
  if (!event.livemode && ["checkout.session.completed", "checkout.session.async_payment_succeeded", "checkout.session.async_payment_failed"].includes(event.type)) {
    try {
      const object = event.data.object as { id: string };
      const session = await stripe.checkout.sessions.retrieve(object.id);
      if (session.metadata?.source === "smg_store_sandbox" && session.payment_status === "paid" && session.metadata.test_payment_verified !== "true") {
        await stripe.checkout.sessions.update(session.id, { metadata: { test_payment_verified: "true" } });
      }
    } catch { return NextResponse.json({ error: "Unable to verify test payment." }, { status: 500 }); }
  }
  return NextResponse.json({ received: true });
}
