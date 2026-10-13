"use client";
import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { storeProducts } from "@/lib/store-products";
export function StoreQuote() {
  const params = useSearchParams();
  const product = storeProducts.find(p => p.sku === params.get("sku"));
  const [draft, setDraft] = useState("");
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = ["SMG bulk quote request", ...["name", "company", "email", "products", "destination", "instrument", "schedule", "message"].map(k => `${k}: ${String(data.get(k) || "Not provided")}`)].join("\n\n");
    setDraft(text);
  }
  return <><p>Tell us which products and quantities you need. Include your delivery address so we can confirm freight. Mixed-product orders and recurring supply requests are welcome; discounts and availability are confirmed by quote.</p><form onSubmit={prepare} className="store-quote-form">
    <label>Your name<input name="name" required maxLength={150} autoComplete="name" /></label>
    <label>Laboratory / company<input name="company" required maxLength={200} autoComplete="organization" /></label>
    <label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
    <label>Products and quantities (cases / bags)<textarea name="products" required maxLength={3000} defaultValue={product ? `${product.sku} (${product.supplierSku || "SMG"}) - ${product.minCases} ${product.orderUnitPlural}` : ""} /></label>
    <label>Delivery address, ZIP and country<textarea name="destination" required maxLength={1000} autoComplete="street-address" /></label>
    <label>Instrument model / compatibility needs (optional)<input name="instrument" maxLength={500} /></label>
    <label>Order frequency<input name="schedule" maxLength={300} placeholder="One-time, monthly, quarterly, or planned delivery date" /></label>
    <label>Additional details (optional)<textarea name="message" maxLength={3000} /></label>
    <button className="store-button" type="submit">Prepare quote email</button>
    <p className="store-help">This form prepares an email for you to send. Preparing a request does not send it or place an order.</p>
  </form>{draft && <section className="store-support"><h2>Your quote request is ready</h2><textarea aria-label="Quote email draft" readOnly value={draft} rows={14} /><a className="store-button" href={`mailto:dustin@stephensmolecular.com?subject=${encodeURIComponent("SMG bulk consumables quote")}&body=${encodeURIComponent(draft)}`}>Open email to send request</a><p>If your email app does not open, copy the draft and send it to <a href="mailto:dustin@stephensmolecular.com">dustin@stephensmolecular.com</a>. Your request has not been sent yet.</p></section>}</>;
}
