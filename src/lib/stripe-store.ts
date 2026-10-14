import Stripe from "stripe";
import { storeProducts } from "@/lib/store-products";
export function stripeStore() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !/^(rk|sk)_(test|live)_/.test(key)) throw new Error("Stripe key is not configured.");
  if (/^(rk|sk)_live_/.test(key) && process.env.VERCEL_ENV !== "production") throw new Error("Live payments require a production deployment.");
  return new Stripe(key);
}
export function checkoutItems(cart: unknown) {
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) throw new Error("Invalid cart.");
  const entries = Object.entries(cart);
  if (!entries.length || entries.length > storeProducts.length) throw new Error("Your cart is empty or invalid.");
  let cents = 0;
  const items = entries.map(([sku, quantity]) => {
    const product = storeProducts.find(p => p.sku === sku);
    if (!product) throw new Error("Unknown product.");
    if (product.quoteOnly) throw new Error("Contact SMG to confirm packaging for this product before ordering.");
    if (typeof quantity !== "number" || !Number.isSafeInteger(quantity) || quantity < product.minCases || quantity > 4999) throw new Error(`Enter ${product.minCases}–4999 whole ${product.orderUnitPlural} for ${product.title}.`);
    const unitAmount = Math.round(product.price * 100);
    cents += unitAmount * quantity;
    return {
      price_data: {
        currency: "usd",
        unit_amount: unitAmount,
        tax_behavior: "exclusive" as const,
        product_data: {
          name: product.title,
          description: `${product.packLabel} per ${product.orderUnit}. Lead time approximately 6–7 weeks.`,
          metadata: { sku: product.sku },
        },
      },
      quantity,
    };
  });
  if (cents > 99999999) throw new Error("Please contact SMG for an order this large.");
  return items;
}
