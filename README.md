# Stephens Molecular Group Website

Current build includes:
- Product-first homepage and panel pages
- Functional lead capture form with server-side validation
- Panel-level attribution for pricing/contact requests
- Privacy-safe analytics events
- Conditional brochure download readiness

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
