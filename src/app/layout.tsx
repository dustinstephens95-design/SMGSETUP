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
  title: "Stephens Molecular Group | Precision Molecular Diagnostics",
  description:
    "Stephens Molecular Group provides molecular diagnostics, assay implementation, laboratory consulting, and validation support for laboratories nationwide.",
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
    title: "Stephens Molecular Group | Molecular Diagnostics Solutions for Clinical Laboratories",
    description:
      "Molecular diagnostic products, validation support, and laboratory consulting for modern clinical laboratories.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/panels/respiratory.png",
        alt: "Stephens Molecular Group molecular diagnostics",
      },
    ],
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
