import { notFound, permanentRedirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreFront } from "@/components/store-front";
import { storeProducts, legacyProductRedirects } from "@/lib/store-products";
import "../store.css";
export function generateStaticParams() { return storeProducts.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const canonicalSlug = legacyProductRedirects[slug] || slug; const p = storeProducts.find(p => p.slug === canonicalSlug); return { title: `${p?.title || "Product"} | SMG`, alternates: { canonical: `/shop/${canonicalSlug}` } }; }
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (legacyProductRedirects[slug]) permanentRedirect(`/shop/${legacyProductRedirects[slug]}`); if (!storeProducts.some(p => p.slug === slug)) notFound(); return <><SiteHeader /><main><StoreFront slug={slug} /></main><SiteFooter /></>; }
