import { TrackedLink } from "@/components/tracked-link";
import type { ServiceItem } from "@/lib/services";

type ServiceCardProps = {
  service: ServiceItem;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="card reveal group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(12,42,82,0.16)]">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-[#1e4fd6] transition group-hover:bg-[#1e4fd6] group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="text-2xl font-semibold leading-tight text-[#0f2648]">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#3f5673]">{service.description}</p>
      <TrackedLink
        href={`/?panel=${encodeURIComponent(service.title)}&source=services#contact`}
        eventName="Click Request Pricing"
        payload={{ panelName: service.title, panelSlug: null, sourcePage: "homepage", buttonLocation: "service-card-learn-more" }}
        className="mt-auto inline-flex w-fit pt-6 text-sm font-semibold uppercase tracking-[0.06em] text-[#1e4fd6] transition hover:text-[#163c9f]"
      >
        Learn More
      </TrackedLink>
    </article>
  );
}
