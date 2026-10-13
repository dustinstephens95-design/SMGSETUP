# SMG sandbox checkout

This branch accepts test keys only. It cannot accept live payments. Prices are per case and the server requires at least 10 cases of every selected product.

1. Install dependencies with `npm install`.
2. In ignored `.env.local`, set `STRIPE_SECRET_KEY` to your sandbox restricted key with Checkout Sessions write access. Do not commit this file.
3. Set `SITE_URL=http://localhost:3000`. If the dev server uses another port, update this setting to match exactly.
4. Start `npm run dev`, add a product to the cart, and click Test Stripe checkout. Use only Stripe sandbox payment details.
5. To verify webhook delivery, use Stripe CLI forwarding to `localhost:3000/api/stripe/webhook`. Put its signing secret in `STRIPE_WEBHOOK_SECRET` and restart the dev server. Subscribe to checkout.session.completed, checkout.session.async_payment_succeeded, and checkout.session.async_payment_failed.

The webhook verifies the raw body signature, retrieves the current session, and marks paid sandbox sessions with test_payment_verified=true. Repeated deliveries are harmless. The success page does not fulfill orders. No goods are shipped, and no customer emails or inventory changes are triggered.

Before live launch: agree on shipping countries and charges, tax obligations, configure live product prices, build durable order tracking and fulfillment, configure a live webhook, and complete end-to-end testing. US address collection here is solely a sandbox test setting.
