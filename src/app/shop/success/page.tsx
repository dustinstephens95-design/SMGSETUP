import Link from "next/link";
import { stripeStore } from "@/lib/stripe-store";
import "../store.css";
export const dynamic = "force-dynamic";
export const metadata = { title: "Order payment | SMG", robots: { index: false, follow: false } };
export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let paid = false;
  try {
    if (session_id && /^cs_(live|test)_[A-Za-z0-9]+$/.test(session_id)) {
      const session = await stripeStore().checkout.sessions.retrieve(session_id);
      paid = session.metadata?.source === "smg_store" && session.payment_status === "paid";
    }
  } catch { /* Show an unconfirmed state without exposing account details. */ }
  return <main className="smg-store"><h1>{paid ? "Payment received" : "Payment status not confirmed"}</h1><p>{paid ? "Your payment was received. SMG will review your order and send written confirmation with the estimated fulfillment schedule." : "Your payment may still be processing. Contact dustin@stephensmolecular.com before submitting another payment."}</p><p>Please allow approximately 6–7 weeks after written order confirmation for overseas fulfillment.</p><Link href="/shop/cart">Return to your cart</Link></main>;
}
