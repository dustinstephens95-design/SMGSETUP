import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreFront } from "@/components/store-front";
import "./store.css";
export const metadata: Metadata = { title: "Shop Laboratory Supplies | SMG", alternates: { canonical: "/shop" } };
export default function ShopPage() { return <><SiteHeader /><main><StoreFront /></main><SiteFooter /></>; }
