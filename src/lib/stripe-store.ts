import Stripe from "stripe";

export const sandboxPrices: Record<string, { id: string; cents: number }> = {
  "SMG-DWP-2200-050": { id: "price_1UNd7s2YwJgFagRqWLSAeGHS", cents: 14900 },
  "SMG-MRS-0096-050": { id: "price_1UNdAD2YwJgFagRqLxpt4Ff1", cents: 17500 },
  "SMG-ELP-0500-050": { id: "price_1UNdBO2YwJgFagRqLz7bs7e8", cents: 14900 },
  "SMG-PCR-0384-050": { id: "price_1UNdDJ2YwJgFagRqFRypsSqh", cents: 19900 },
};
export function stripeStore() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !/^(rk|sk)_test_/.test(key)) throw new Error("Sandbox checkout requires a test key.");
  return new Stripe(key);
}
export function checkoutItems(cart: unknown) {
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) throw new Error("Invalid cart.");
  const entries = Object.entries(cart);
  if (!entries.length || entries.length > 4) throw new Error("Your cart is empty or invalid.");
  let cents = 0;
  const items = entries.map(([sku, quantity]) => {
    const product = Object.hasOwn(sandboxPrices, sku) ? sandboxPrices[sku] : undefined;
    if (!product || typeof quantity !== "number" || !Number.isSafeInteger(quantity) || quantity < 10 || quantity > 4999) throw new Error("Enter 10–4999 whole cases per product.");
    cents += product.cents * quantity;
    return { price: product.id, quantity };
  });
  if (cents > 99999999) throw new Error("Please contact SMG for an order this large.");
  return items;
}
