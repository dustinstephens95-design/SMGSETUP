import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreCart } from "@/components/store-front";
import "../store.css";
export const metadata = { title: "Your Cart | SMG", robots: { index: false, follow: false }, alternates: { canonical: "/shop/cart" } };
export default function CartPage() { return <><SiteHeader /><main><StoreCart /></main><SiteFooter /></>; }
