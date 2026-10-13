import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreQuote } from "@/components/store-quote";
import "../store.css";
export const metadata = { title: "Request a bulk quote | SMG", alternates: { canonical: "/shop/bulk-quote" } };
export default function Page() { return <><SiteHeader /><main className="smg-store"><Link href="/shop">← Shop all categories</Link><h1 className="store-page-title">Request a bulk quote</h1><Suspense fallback={<p>Loading quote form…</p>}><StoreQuote /></Suspense></main><SiteFooter /></>; }
