"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const budgetOptions = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // No backend is wired up in this build — this simulates submission so
    // the interaction and success state can be reviewed end to end.
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className="border border-border bg-cream p-10 text-center sm:p-16">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-cream">
          <Check size={20} />
        </div>
        <h3 className="mt-6 text-[22px] font-medium tracking-tightest text-foreground">
          Thanks — that&rsquo;s in.
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          We read every message personally and reply within one business
          day to schedule a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="Full name" name="name" type="text" autoComplete="name" required />
        <Field label="Work email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="Company" name="company" type="text" autoComplete="organization" />
        <div>
          <label htmlFor="budget" className="mb-2 block text-[13px] font-medium text-foreground">
            Estimated budget
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-[13px] font-medium text-foreground">
          What&rsquo;s slowing your business down right now?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full resize-none border-b border-border bg-transparent py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[14px] font-semibold text-cream transition-colors duration-300 hover:bg-foreground disabled:opacity-60"
      >
        <span>{submitting ? "Sending…" : "Send message"}</span>
        {!submitting && (
          <ArrowUpRight
            size={16}
            className="transition-transform duration-300 ease-power3-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[13px] font-medium text-foreground">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="w-full border-b border-border bg-transparent py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
