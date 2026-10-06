import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreFront } from "@/components/store-front";
import { storeProducts } from "@/lib/store-products";
import "../store.css";
export function generateStaticParams() { return storeProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const p = storeProducts.find(p => p.slug === slug); return { title: `${p?.title || "Product"} | SMG`, alternates: { canonical: `/shop/${slug}` } }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!storeProducts.some(p => p.slug === slug)) notFound(); return <><SiteHeader /><main><StoreFront slug={slug} /></main><SiteFooter /></>; }
