# Stephens Molecular Group Website

Current build includes:
- Product-first homepage and panel pages
- Functional lead capture form with server-side validation
- Panel-level attribution for pricing/contact requests
- Privacy-safe analytics events
- Conditional brochure download readiness
- Laboratory supplies shop with 29 listings, including 28 purchasable products

## Laboratory supplies shop

The catalog lives in `src/lib/store-products.ts`. Each product owns its sale pack, physical piece count, minimum quantity, price and image. Categories and search are derived from the catalog. The cart and server-side Checkout validation use the same catalog.

`/shop` opens on eight category cards. Dedicated pages at `/shop/category/[category]` separate manual tips, robotic tips, PCR supplies, extraction supplies, sealing accessories, tubes/cryovials, transfer/serological pipettes and ELISA plates. Category counts derive from catalog records and every product belongs to one category. Prices and ordering rules are unchanged by the category redesign.

Prices follow the October 12 SMG revised pricing draft and include US freight; SMG absorbs any freight overage. The three excluded items (15 mL conical tubes, 50 mL conical tubes and 50 mL reservoirs) are not in the catalog. Existing listings keep their established SKU and route, with prices updated to the approved draft. Cotaus catalog graphics are local under `public/products/cotaus`; `SOURCES.md` records provenance. Representative illustrations do not establish certification or fit.

The 2 mL cryovial is listed with a packaging-confirmation contact action instead of checkout while its supplier pack size is unresolved. Silicone mats are sold as bags of 50, not assumed cartons. All listings state a 6–7-week lead time.

Stripe-hosted Checkout builds inline USD prices from the server catalog and calculates tax through the account’s existing Stripe Tax settings and active registrations. It does not trust client prices. Live keys work only when VERCEL_ENV=production. Configure SITE_URL, STRIPE_SECRET_KEY (Checkout Sessions write) and STRIPE_WEBHOOK_SECRET in Production. Subscribe the webhook to checkout.session.completed, checkout.session.async_payment_succeeded and checkout.session.async_payment_failed. Paid sessions are marked payment_verified=true and fulfillment_status=pending_manual_review in Stripe. SMG must review paid orders, contact customers and arrange fulfillment manually; no supplier purchase or automatic shipment is triggered. Processing and failed payments must not be shipped.

Run `node scripts/check-store.mjs` for catalog/checkout validation, followed by `npm run build`.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4)
- Zod (validation)
- Vercel Analytics

## Run Locally
1. Install dependencies:
   npm install
2. Create local environment file:
   cp .env.example .env.local
3. Set required values in `.env.local`.
4. Start development server:
   npm run dev
5. Build for production:
   npm run build
6. Start production server:
   npm run start

## Environment Variables
See `.env.example`.

Required:
- `FORMSPREE_ENDPOINT` (Formspree form endpoint)

Optional:
- `NEXT_PUBLIC_ANALYTICS_ENABLED`

No secret keys are exposed to client-side code.

## Lead Capture Setup (Formspree)
1. Create a Formspree form for SMG inquiries.
2. Set destination email to `dustin@stephensmolecular.com`.
3. Copy the form endpoint URL.
4. Add endpoint to `FORMSPREE_ENDPOINT` in `.env.local` and production environment variables.
5. Submit a test form from the website and confirm delivery.

## Analytics Setup
This project uses `@vercel/analytics` for privacy-safe usage measurement and custom event tracking.

Tracked events:
- `View Panel`
- `Click Request Pricing`
- `Submit Contact Form`
- `Click Phone`
- `Click Email`
- `Download Brochure`
- `View Services`

Event payload fields include panel name, panel slug, source page, and button location.

## Brochure File Placement
Place panel brochures in `public/brochures` with these exact filenames:
- `limited-respiratory-panel.pdf`
- `respiratory-panel.pdf`
- `uti-panel.pdf`
- `sti-panel.pdf`
- `womens-health-panel.pdf`
- `wound-panel.pdf`
- `pharyngitis-panel.pdf`

Download buttons auto-activate only when files exist.

## SEO and Indexing
Implemented:
- Canonical URLs
- Open Graph metadata
- Dynamic panel metadata
- `sitemap.xml` generation
- `robots.txt` generation

## Deployment Notes
1. Configure `FORMSPREE_ENDPOINT` in deployment environment variables.
2. Deploy to Vercel (recommended for built-in analytics support).
3. Add brochure PDFs into `public/brochures` before production release if available.
4. Run checks before release:
   - `npm run build`
   - `npx tsc --noEmit`
   - `npm run lint`
## Content/Data Structure
- Panel data is in `src/lib/panels.ts`
- Brochure detection and activation logic is in `src/lib/brochures.ts`
- Service data is in `src/lib/services.ts`
- Contact API route is in `src/app/api/contact/route.ts`
- Reusable components are in `src/components`


## Shop purchasing support

Every product shows pack and per-piece pricing, minimum product totals, included US freight wording, technical status, compatibility guidance and a downloadable PDF summary. `/shop/bulk-quote` prepares a customer-reviewed mailto draft; it does not submit a form or send email automatically. `/shop/shipping-returns` describes estimate/quote confirmation and issue reporting; final return eligibility is confirmed per order. No standard return period or guaranteed delivery promise is introduced. The original supplier thermocycler table is available under `/specifications/`.

To regenerate spec PDFs after catalog updates, run `node scripts/generate-store-specs.mjs` then `python scripts/generate-store-specs.py` (ReportLab, pypdf and DejaVu fonts required). Generated inputs are in `tmp/pdfs/`. Price and minimum quantity values come from the shop catalog. Exact dimensions and unconfirmed material/sterility are marked for supplier confirmation. Keep test keys in local and preview environments; live keys belong only in Production.
