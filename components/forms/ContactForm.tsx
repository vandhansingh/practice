"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Check, TriangleAlert } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const NEEDS = [
  "Not sure yet — I need a diagnosis",
  "Operations Audit",
  "Systems Design",
  "Organizational Alignment",
  "Something else",
];

const BUDGETS = ["Under £30k", "£30k – £75k", "£75k – £150k", "£150k+", "Not yet defined"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Please tell us your name.";
    // Deliberately permissive: a strict pattern rejects valid addresses more
    // often than it catches typos. The server is the real validator.
    if (!email) next.email = "Please add an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That doesn't look like a complete email address.";
    if (!message) next.message = "A sentence or two is enough to start.";

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field with a problem so keyboard and screen
      // reader users aren't left guessing what failed.
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      // No backend is wired up in this build. Swap this delay for the real
      // POST — the error branch below already handles a rejected request.
      //
      //   const res = await fetch("/api/contact", { method: "POST", body: data });
      //   if (!res.ok) throw new Error(String(res.status));
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-cream-dark/50 p-10 sm:p-14">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-charcoal">
          <Check size={20} aria-hidden="true" />
        </span>
        <h2 className="mt-8 font-display text-display-sm text-charcoal">
          Thank you — that&rsquo;s with us.
        </h2>
        <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
          A partner reads every enquiry personally. You&rsquo;ll hear back within
          one working day to arrange a call.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          type="text"
          autoComplete="name"
          required
          error={errors.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <Field name="company" label="Company" type="text" autoComplete="organization" />
        <Select name="budget" label="Budget" options={BUDGETS} />
      </div>

      <Select name="need" label="What do you need help with?" options={NEEDS} />

      <div>
        <label htmlFor="message" className="mb-3 block text-label uppercase text-muted">
          Where is the operation losing time?
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={clsx(
            "w-full resize-none border-b bg-transparent py-3 text-[1rem] text-charcoal outline-none transition-colors placeholder:text-muted/60 focus:border-accent",
            errors.message ? "border-accent-deep" : "border-border"
          )}
        />
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-3 border-l-2 border-accent-deep pl-4 text-[0.875rem] text-charcoal"
        >
          <TriangleAlert size={16} className="mt-0.5 shrink-0 text-accent-deep" aria-hidden="true" />
          <span>
            That didn&rsquo;t send. Please try again, or email us directly and
            we&rsquo;ll pick it up from there.
          </span>
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-3 rounded-card bg-accent py-1.5 pl-5 pr-1.5 text-[0.875rem] font-medium text-charcoal transition-colors duration-300 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{status === "submitting" ? "Sending…" : "Send enquiry"}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-charcoal/10 transition-transform duration-500 ease-expo group-hover:translate-x-0.5">
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type,
  autoComplete,
  required,
  error,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block text-label uppercase text-muted">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={clsx(
          "w-full border-b bg-transparent py-3 text-[1rem] text-charcoal outline-none transition-colors focus:border-accent",
          error ? "border-accent-deep" : "border-border"
        )}
      />
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block text-label uppercase text-muted">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full border-b border-border bg-transparent py-3 text-[1rem] text-charcoal outline-none transition-colors focus:border-accent"
      >
        <option value="">Select…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-accent-deep">
      {children}
    </p>
  );
}
