import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy | Stephens Molecular Group",
  description: "Privacy information for Stephens Molecular Group contact and website analytics handling.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-[#0f2648]">Privacy</h1>
      <div className="mt-8 space-y-5 text-sm leading-7 text-[#3f5673]">
        <p>
          Stephens Molecular Group uses contact form information only to respond to inquiries regarding products,
          pricing, implementation support, and related laboratory services.
        </p>
        <p>
          Please do not submit patient information or protected health information through this website contact form.
        </p>
        <p>
          Stephens Molecular Group does not sell submitted contact information.
        </p>
        <p>
          Website analytics may collect basic device, page, and referral data to understand site usage and improve
          visitor experience.
        </p>
        <p>
          To request deletion of submitted inquiry data, contact Stephens Molecular Group at
          <a className="ml-1 text-[#1e4fd6] hover:underline" href="mailto:dustin@stephensmolecular.com">
            dustin@stephensmolecular.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
