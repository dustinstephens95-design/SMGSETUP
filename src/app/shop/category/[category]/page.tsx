import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreFront } from "@/components/store-front";
import { storeCategories } from "@/lib/store-categories";
import "../../store.css";

export function generateStaticParams() {
  return storeCategories.map(c => ({ category: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = storeCategories.find(c => c.slug === category);
  return { title: `${item?.name || "Shop category"} | SMG`, description: item?.description, alternates: { canonical: `/shop/category/${category}` } };
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!storeCategories.some(c => c.slug === category)) notFound();
  return <><SiteHeader /><main><StoreFront key={category} categorySlug={category} /></main><SiteFooter /></>;
}
