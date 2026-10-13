import Link from "next/link";
import { stripeStore } from "@/lib/stripe-store";
import "../store.css";
export const dynamic = "force-dynamic";
export const metadata = { title: "Sandbox checkout | SMG", robots: { index: false, follow: false } };
export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  try {
    if (session_id?.startsWith("cs_test_")) {
      const session = await stripeStore().checkout.sessions.retrieve(session_id);
      paid = session.metadata?.source === "smg_store_sandbox" && session.payment_status === "paid";
    }
  } catch { /* Show an unconfirmed state without exposing account details. */ }
  return <main className="smg-store"><h1>{paid ? "Sandbox payment successful" : "Payment status not confirmed"}</h1><p>{paid ? "Your test payment was received. This sandbox order will not be shipped." : "Check your Stripe sandbox for the payment status before trying again."}</p><p>Live shipping, taxes, and fulfillment still need configuration.</p><Link href="/shop/cart">Return to your cart</Link></main>;
}
