"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { faqItems } from "@/lib/marketing";

export function SearchableFAQ() {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return faqItems;
    }

    return faqItems.filter((item) => {
      return `${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section className="space-y-6">
      <label className="relative block">
        <span className="sr-only">Search FAQ</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1e4fd6]" size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search questions about instruments, validation, pricing, and implementation"
          className="w-full rounded-2xl border border-[#c9d8eb] bg-white py-4 pl-12 pr-4 text-sm outline-none transition focus:border-[#1e4fd6]"
        />
      </label>

      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <details key={item.question} className="card group overflow-hidden p-6 transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(11,37,73,0.12)]">
            <summary className="cursor-pointer list-none text-lg font-semibold text-[#0f2648]">
              {item.question}
            </summary>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#3f5673]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
