import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stephensmolecular.com"),
  title: "Stephens Molecular Group | Molecular Diagnostics Solutions",
  description:
    "Molecular diagnostics panels, laboratory consulting, validation support, workflow optimization, and implementation services for clinical laboratories.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "molecular diagnostics",
    "PCR panels",
    "laboratory consulting",
    "assay validation",
    "SMG",
    "Stephens Molecular Group",
  ],
  openGraph: {
    title: "Stephens Molecular Group | Molecular Diagnostics Solutions",
    description:
      "Molecular diagnostics panels, laboratory consulting, validation support, workflow optimization, and implementation services for clinical laboratories.",
    url: "https://stephensmolecular.com",
    siteName: "Stephens Molecular Group",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stephens Molecular Group social sharing preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephens Molecular Group | Molecular Diagnostics Solutions",
    description:
      "Molecular diagnostics panels, laboratory consulting, validation support, workflow optimization, and implementation services for clinical laboratories.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isVercelDeployment = process.env.VERCEL === "1";

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}>
        {children}
        {isVercelDeployment ? <Analytics /> : null}
      </body>
    </html>
  );
}
