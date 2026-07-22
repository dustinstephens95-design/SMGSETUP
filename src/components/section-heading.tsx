type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-3xl">
      {eyebrow ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#1e4fd6]">{eyebrow}</p> : null}
      <h2 className="mt-4 text-4xl font-semibold leading-[0.98] text-[#0f2648] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-[#3f5673]">{description}</p> : null}
    </div>
  );
}
