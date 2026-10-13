"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storeProducts, money } from "@/lib/store-products";
import { freightNote, compatibilityGuidance, technicalStatus, unitPrice } from "@/lib/store-guidance";
import { storeCategories } from "@/lib/store-categories";

type Cart = Record<string, number>;
const storageKey = "smg-cart-v1";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("smg-cart-change", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("smg-cart-change", callback); };
}
function useCart(): [Cart, (next: Cart) => void] {
  const snapshot = useSyncExternalStore(subscribe, () => localStorage.getItem(storageKey) || "{}", () => "{}");
  let cart: Cart = {};
  try {
    const value = JSON.parse(snapshot);
    cart = Object.fromEntries(storeProducts.flatMap(p => !p.quoteOnly && Number.isSafeInteger(value?.[p.sku]) && value[p.sku] >= p.minCases && value[p.sku] <= 4999 ? [[p.sku, value[p.sku]]] : []));
  } catch { /* Discard invalid stored carts. */ }
  return [cart, next => { localStorage.setItem(storageKey, JSON.stringify(next)); window.dispatchEvent(new Event("smg-cart-change")); }];
}

export function StoreFront({ slug, categorySlug }: { slug?: string; categorySlug?: string }) {
  const router = useRouter();
  const [cart, save] = useCart();
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const selectedCategory = storeCategories.find(c => c.slug === categorySlug);
  const [category, setCategory] = useState(selectedCategory?.name || "All products");
  const [search, setSearch] = useState("");
  const categories = ["All products", ...storeCategories.map(c => c.name)];
  function add(sku: string) {
    const product = storeProducts.find(p => p.sku === sku);
    if (!product || product.quoteOnly) return;
    const quantity = Number(quantities[sku] ?? String(product.minCases));
    if (!Number.isSafeInteger(quantity) || quantity < product.minCases || quantity + (cart[sku] || 0) > 4999) { setNotice(`Please enter ${product.minCases}–4999 whole ${product.orderUnitPlural} for this product.`); return; }
    save({ ...cart, [sku]: (cart[sku] || 0) + quantity }); setNotice(`${quantity} ${product.orderUnitPlural} added to your cart.`);
  }
  const products = storeProducts.filter(p => slug ? p.slug === slug : (category === "All products" || p.category === category) && `${p.title} ${p.sku} ${p.supplierSku || ""}`.toLowerCase().includes(search.trim().toLowerCase()));
  const count = Object.values(cart).reduce((sum, q) => sum + q, 0);
  const browsingCategories = !slug && !categorySlug && category === "All products" && !search.trim();
  return <div className="smg-store">
    {(slug || categorySlug) && <Link className="store-back" href="/shop">← Shop all categories</Link>}
    <div className="store-heading"><div><p className="store-eyebrow">SMG LABORATORY SUPPLIES</p><h1>{slug ? "Product details" : selectedCategory?.name || "Shop by category."}</h1><p>{selectedCategory?.description || "Find laboratory supplies by workflow. Choose a category to browse products, packaging and bulk pricing."}</p></div><Link className="store-button" href="/shop/cart">View cart · {count} packs</Link></div>
    <div className="store-banner"><strong>Bulk orders · Product-specific packaging</strong><span>See each listing for minimum quantities · Lead time approximately 6–7 weeks</span></div>
    <nav className="store-support-links" aria-label="Shop support"><Link href="/shop/bulk-quote">Request a bulk quote</Link><Link href="/shop/shipping-returns">Shipping &amp; returns</Link><a href="/specifications/cotaus-thermocycler-compatibility.pdf" target="_blank" rel="noopener noreferrer">Supplier PCR compatibility table ↗</a></nav>
    {!slug && <div className="store-tools"><label className="store-filter">Browse <select value={category} onChange={e => { if (categorySlug) { const target = storeCategories.find(c => c.name === e.target.value); router.push(target ? `/shop/category/${target.slug}` : "/shop"); } else setCategory(e.target.value); }}>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="store-search">Find a product<input type="search" placeholder="Product, volume or SKU" value={search} onChange={e => setSearch(e.target.value)} /></label><p>{products.length} products</p></div>}
    {browsingCategories && <section aria-label="Shop by category" className="store-category-grid">{storeCategories.map(c => <Link className="store-category-card" key={c.slug} href={`/shop/category/${c.slug}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.image} alt="" loading="lazy" /><div><h2>{c.name}</h2><p>{c.description}</p><span>{storeProducts.filter(p => p.category === c.name).length} products · Browse category →</span></div>
    </Link>)}</section>}
    <p role="status" aria-live="polite">{notice}</p>
    {!browsingCategories && <div className={slug ? "store-grid store-detail" : "store-grid"}>{products.map(p => <article className="store-card" key={p.sku}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="store-product-visual"><img loading={slug ? "eager" : "lazy"} src={p.image || ""} alt={p.imageAlt || p.title} />{p.imageCaption && <p className="store-image-caption">{p.imageCaption}</p>}</div>
      <div className="store-card-body"><p className="store-eyebrow">{p.category}</p><h2><Link href={`/shop/${p.slug}`}>{p.title}</Link></h2><p className="store-sku">SKU: {p.sku}</p><p className="store-price">{money(p.price)} <span>/ {p.orderUnit}</span></p><p>{p.packLabel} per {p.orderUnit}</p><dl className="store-price-breakdown"><div><dt>Price per piece</dt><dd>{p.quoteOnly ? "Awaiting packaging confirmation" : `${unitPrice(p.price / p.unitsPerCase)} per ${p.pieceLabel === "pipettes" ? "pipette" : p.pieceLabel.replace(/s$/, "")}`}</dd></div><div><dt>Minimum product total</dt><dd>{p.quoteOnly ? "Quote required" : money(p.price * p.minCases)}</dd></div></dl><p className="store-help">{freightNote}</p>
      <label htmlFor={p.sku}>Quantity ({p.orderUnitPlural})</label><input id={p.sku} type="number" min={p.minCases} max="4999" step="1" disabled={p.quoteOnly} value={quantities[p.sku] ?? String(p.minCases)} onChange={e => setQuantities({ ...quantities, [p.sku]: e.target.value })} aria-describedby={`${p.sku}-minimum`} />
      <p id={`${p.sku}-minimum`} className="store-help">Minimum order: {p.minCases} {p.orderUnitPlural} / {(p.minCases * p.unitsPerCase).toLocaleString("en-US")} {p.pieceLabel}. Additional {p.orderUnitPlural} may be ordered individually.</p>
      <p>Product total: <strong>{money(p.price * Math.max(0, Number(quantities[p.sku] ?? p.minCases) || 0))}</strong></p>{p.quoteOnly ? <a className="store-button" href={`mailto:dustin@stephensmolecular.com?subject=${encodeURIComponent(`Packaging confirmation: ${p.sku}`)}`}>Confirm packaging with SMG</a> : <button className="store-button" onClick={() => add(p.sku)}>Add to cart</button>}
      <Link className="store-details-link" href={`/shop/bulk-quote?sku=${encodeURIComponent(p.sku)}`}>Request a bulk quote for this item →</Link>
      {!slug && <Link className="store-details-link" href={`/shop/${p.slug}`}>Specifications & packaging →</Link>}
      {slug && <section className="store-support"><h3>Compatibility &amp; technical details</h3><p>{compatibilityGuidance(p)}</p><dl className="store-technical"><dt>Material</dt><dd>{technicalStatus(p).material}</dd><dt>Dimensions</dt><dd>{technicalStatus(p).dimensions}</dd><dt>Sterility</dt><dd>{technicalStatus(p).sterility}</dd></dl><a className="store-details-link" href={`/specifications/${p.slug}.pdf`} download>Download product specification sheet (PDF) ↓</a>{p.category === "PCR Consumables" && <a className="store-details-link" href="/specifications/cotaus-thermocycler-compatibility.pdf" target="_blank" rel="noopener noreferrer">View supplier thermocycler compatibility table ↗</a>}</section>}
      {slug && <div className="store-description" dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />}</div>
    </article>)}</div>}{!products.length && <p>No products match your search. Try another name, volume or SKU.</p>}
    {browsingCategories && <section className="store-why"><p className="store-eyebrow">WHY SMG?</p><h2>Laboratory supplies backed by practical laboratory support.</h2><div className="store-benefits"><div><h3>Workflow experience</h3><p>SMG supports molecular laboratories with assay implementation, validation, SOP development and operational troubleshooting.</p></div><div><h3>Direct support</h3><p>Discuss packaging, product matching and purchasing needs directly with SMG before you place a bulk order.</p></div><div><h3>Clear bulk purchasing</h3><p>SMG aims to keep laboratory supplies competitively priced. Compare pack sizes, per-piece pricing and minimum quantities. Request a written delivered quote for your destination.</p></div></div><Link className="store-button" href="/shop/bulk-quote">Plan your laboratory supply order</Link></section>}
    <p className="store-help">For laboratory use only. Confirm instrument and protocol compatibility before ordering.</p>
  </div>;
}

export function StoreCart() {
  const [cart, save] = useCart();
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  async function checkout() {
    setLoading(true); setNotice("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cart, attempt: crypto.randomUUID() }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Checkout unavailable.");
      const url = new URL(result.url);
      if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Invalid checkout URL.");
      window.location.assign(url.href);
    } catch (error) { setNotice(error instanceof Error ? error.message : "Checkout unavailable."); setLoading(false); }
  }
  const items = storeProducts.filter(p => cart[p.sku]);
  const total = items.reduce((sum, p) => sum + p.price * cart[p.sku], 0);
  return <div className="smg-store"><div className="store-heading"><h1>Your cart</h1><Link href="/shop">← Continue shopping</Link></div><div className="store-banner">Please allow approximately 6–7 weeks for overseas fulfillment.</div>
    <p role="status">{notice}</p>{items.length ? <><div className="store-cart-items">{items.map(p => <article className="store-cart-item" key={p.sku}><div><h2><Link href={`/shop/${p.slug}`}>{p.title}</Link></h2><p>{money(p.price)} per {p.orderUnit} · {p.packLabel}</p></div><div><label htmlFor={`cart-${p.sku}`}>{p.orderUnitPlural}</label><input id={`cart-${p.sku}`} type="number" min={p.minCases} max="4999" step="1" value={cart[p.sku]} onChange={e => { const q = Number(e.target.value); if (Number.isSafeInteger(q) && q >= p.minCases && q <= 4999) { save({ ...cart, [p.sku]: q }); setNotice(""); } else setNotice(`Minimum order: ${p.minCases} whole ${p.orderUnitPlural} for this product.`); }} /><p className="store-help">Minimum: {p.minCases} {p.orderUnitPlural} / {(p.minCases * p.unitsPerCase).toLocaleString("en-US")} {p.pieceLabel}</p><button onClick={() => { const next = { ...cart }; delete next[p.sku]; save(next); }}>Remove</button></div><strong>{money(p.price * cart[p.sku])}</strong></article>)}</div><div className="store-cart-summary"><h2>Subtotal: {money(total)}</h2><p>{freightNote}</p><button className="store-button" disabled={loading} onClick={checkout}>{loading ? "Opening checkout…" : "Test Stripe checkout"}</button><p>Sandbox only. No goods will be shipped. Final freight, taxes and live fulfillment still require configuration.</p></div></> : <p>Your cart is empty. <Link href="/shop">Browse laboratory supplies →</Link></p>}</div>;
}
