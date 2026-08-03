"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type ContactFormProps = {
  defaultPanel?: string;
};

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  state: string;
  instrument: string;
  panel: string;
  monthlyVolume: string;
  comments: string;
  website: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  state: "",
  instrument: "",
  panel: "",
  monthlyVolume: "",
  comments: "",
  website: "",
};

export function ContactForm({ defaultPanel = "" }: ContactFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedPanelFromQuery = searchParams.get("panel") ?? defaultPanel;
  const selectedPanelSlug = searchParams.get("slug") ?? "";
  const sourcePage = searchParams.get("source") ?? "homepage";
  const campaignSource = searchParams.get("utm_source") ?? "";

  const [formState, setFormState] = useState<FormState>({
    ...initialState,
    panel: selectedPanelFromQuery,
  });
  const submitLockRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const referrer = useMemo(() => {
    if (typeof document === "undefined") {
      return "";
    }

    return document.referrer;
  }, []);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    if (!formState.name.trim()) return "Name is required.";
    if (!formState.company.trim()) return "Company or Laboratory is required.";
    if (!formState.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formState.email.trim())) return "Please enter a valid email address.";
    if (!formState.phone.trim()) return "Phone is required.";
    if (!formState.state.trim()) return "State is required.";
    if (!formState.instrument.trim()) return "Instrument is required.";
    if (!formState.panel.trim()) return "Panel or Service of Interest is required.";
    if (!formState.monthlyVolume.trim()) return "Estimated Monthly Volume is required.";
    if (!formState.comments.trim()) return "Comments are required.";
    if (formState.comments.trim().length < 10) return "Please provide a little more detail in your comments.";

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || submitLockRef.current) {
      return;
    }

    submitLockRef.current = true;

    const validationError = validate();

    if (validationError) {
      setStatusType("error");
      setStatusMessage(validationError);
      submitLockRef.current = false;
      return;
    }

    setIsSubmitting(true);
    setStatusType(null);
    setStatusMessage(null);

    try {
      const payload = {
        name: formState.name,
        company: formState.company,
        email: formState.email,
        phone: formState.phone,
        state: formState.state,
        instrument: formState.instrument,
        panel: formState.panel,
        monthlyVolume: formState.monthlyVolume,
        message: formState.comments,
        sourcePage,
        panelSlug: selectedPanelSlug,
        campaignSource,
        referrer,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatusType("error");
        setStatusMessage(data.message ?? "Submission failed.");
        return;
      }

      setStatusType("success");
      setStatusMessage(data.message ?? "Submitted successfully.");
      setFormState({ ...initialState, panel: selectedPanelFromQuery });

      trackEvent("Submit Contact Form", {
        panelName: selectedPanelFromQuery || formState.panel,
        panelSlug: selectedPanelSlug || null,
        sourcePage: sourcePage || pathname,
        buttonLocation: "contact-form",
      });

      router.push(
        `/request-pricing/confirmation?panel=${encodeURIComponent(selectedPanelFromQuery || formState.panel)}&source=${encodeURIComponent(sourcePage || pathname)}`
      );
    } catch {
      setStatusType("error");
      setStatusMessage("Unexpected submission error. Please try again.");
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4 p-8 sm:grid-cols-2 sm:p-10" aria-label="SMG contact form" noValidate onSubmit={handleSubmit}>
      {selectedPanelFromQuery ? (
        <p className="sm:col-span-2 rounded-xl border border-[#d7e2ef] bg-[#f7faff] px-4 py-3 text-sm text-[#123052]">
          You are requesting information about the {selectedPanelFromQuery}.
        </p>
      ) : null}

      <label className="text-sm font-medium text-[#123052]">
        Name
        <input
          required
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="name"
          autoComplete="name"
        />
      </label>

      <label className="text-sm font-medium text-[#123052]">
        Company or Laboratory
        <input
          required
          value={formState.company}
          onChange={(event) => updateField("company", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="company"
          autoComplete="organization"
        />
      </label>

      <label className="text-sm font-medium text-[#123052]">
        Email
        <input
          required
          type="email"
          value={formState.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="email"
          autoComplete="email"
        />
      </label>

      <label className="text-sm font-medium text-[#123052]">
        Phone
        <input
          required
          value={formState.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="phone"
          autoComplete="tel"
        />
      </label>

      <label className="text-sm font-medium text-[#123052]">
        State
        <input
          required
          value={formState.state}
          onChange={(event) => updateField("state", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="state"
          autoComplete="address-level1"
        />
      </label>

      <label className="text-sm font-medium text-[#123052]">
        Instrument
        <input
          required
          value={formState.instrument}
          onChange={(event) => updateField("instrument", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="instrument"
        />
      </label>

      <label className="text-sm font-medium text-[#123052] sm:col-span-2">
        Panel or Service of Interest
        <input
          required
          value={formState.panel}
          onChange={(event) => updateField("panel", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="panel"
        />
      </label>

      <label className="text-sm font-medium text-[#123052] sm:col-span-2">
        Estimated Monthly Volume
        <input
          required
          value={formState.monthlyVolume}
          onChange={(event) => updateField("monthlyVolume", event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="monthlyVolume"
          placeholder="e.g. 300 tests per month"
        />
      </label>

      <label className="text-sm font-medium text-[#123052] sm:col-span-2">
        Comments
        <textarea
          required
          value={formState.comments}
          onChange={(event) => updateField("comments", event.target.value)}
          className="mt-2 min-h-36 w-full rounded-xl border border-[#c9d8eb] px-4 py-3 text-sm outline-none focus:border-[#1e4fd6]"
          name="comments"
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Leave this field empty
        <input
          tabIndex={-1}
          autoComplete="off"
          value={formState.website}
          onChange={(event) => updateField("website", event.target.value)}
          name="website"
        />
      </label>

      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="panelSlug" value={selectedPanelSlug} />
      <input type="hidden" name="campaignSource" value={campaignSource} />
      <input type="hidden" name="referrer" value={referrer} />
      <input type="hidden" name="submittedAt" value={new Date().toISOString()} />

      <p className="sm:col-span-2 text-xs text-[#3f5673]">
        Please do not submit patient information or protected health information through this form.
      </p>

      {statusMessage ? (
        <p
          className={`sm:col-span-2 rounded-xl px-4 py-3 text-sm ${
            statusType === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e4fd6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1540b6] disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2 sm:w-fit"
      >
        {isSubmitting ? "Submitting..." : "Submit"} <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
