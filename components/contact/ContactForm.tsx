"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  contactSchema,
  enquiryLabels,
  enquiryTypes,
  type ContactInput,
} from "@/lib/contact-schema";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "validated"; message: string }
  | { kind: "error"; message: string };

/**
 * Enquiry form.
 *
 * The service selector comes first because it changes who the enquiry reaches.
 * Errors are announced, tied to their field with aria-describedby, and focus
 * moves to the first invalid control — a form that silently refuses to submit
 * is the commonest accessibility failure in this pattern.
 *
 * On success it says the enquiry was validated but NOT delivered, because in
 * this environment it was not. Telling someone their mortgage enquiry has been
 * received when nobody received it is not a small lie.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      enquiryType: "mortgage",
      message: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        ok: boolean;
        delivered?: boolean;
        message?: string;
        error?: string;
      };
      if (data.ok) {
        setStatus({
          kind: "validated",
          message: data.message ?? "Your enquiry was validated.",
        });
      } else {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Could not reach the server. Please call instead.",
      });
    }
  };

  const fieldError = (name: keyof ContactInput) => errors[name]?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="max-w-[42rem]"
    >
      <fieldset className="m-0 border-0 p-0">
        <legend className="text-body-sm font-medium text-ink">
          What is your enquiry about?
        </legend>
        <div className="mt-4 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {enquiryTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 bg-surface px-4 py-4 text-body-sm text-ink has-[:checked]:bg-ground has-[:checked]:text-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[-2px] has-[:focus-visible]:outline-focus"
            >
              <input
                type="radio"
                value={type}
                {...register("enquiryType")}
                className="accent-accent"
              />
              {enquiryLabels[type]}
            </label>
          ))}
        </div>
        {fieldError("enquiryType") && (
          <p role="alert" className="mt-2 text-body-sm text-accent">
            {fieldError("enquiryType")}
          </p>
        )}
      </fieldset>

      <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Your name" error={fieldError("name")}>
          {(id, described) => (
            <input
              id={id}
              type="text"
              autoComplete="name"
              aria-describedby={described}
              {...register("name")}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Email" error={fieldError("email")}>
          {(id, described) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              aria-describedby={described}
              {...register("email")}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Phone (optional)" error={fieldError("phone")}>
          {(id, described) => (
            <input
              id={id}
              type="tel"
              autoComplete="tel"
              aria-describedby={described}
              {...register("phone")}
              className={inputClass}
            />
          )}
        </Field>
      </div>

      <div className="mt-6">
        <Field label="How can we help?" error={fieldError("message")}>
          {(id, described) => (
            <textarea
              id={id}
              rows={5}
              aria-describedby={described}
              {...register("message")}
              className={`${inputClass} resize-y`}
            />
          )}
        </Field>
      </div>

      <label className="mt-8 flex cursor-pointer items-start gap-3 text-body-sm text-ink-secondary">
        <input
          type="checkbox"
          {...register("consent")}
          className="mt-1 accent-accent"
        />
        <span>
          I&rsquo;m happy for Guide to contact me about this enquiry. See the{" "}
          <a
            href="https://guidefs.co.uk/sites/default/files/clients/966/Gfs-privacy-notice.pdf"
            rel="noopener noreferrer"
            className="text-ink underline decoration-line-interactive underline-offset-4 hover:decoration-accent"
          >
            privacy notice
          </a>
          .
        </span>
      </label>
      {fieldError("consent") && (
        <p role="alert" className="mt-2 text-body-sm text-accent">
          {fieldError("consent")}
        </p>
      )}

      {/* Turnstile mounts here once a site key is configured. */}
      <div data-turnstile-slot className="mt-8" />

      <button
        type="submit"
        disabled={isSubmitting || status.kind === "sending"}
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 text-body-sm font-medium text-ink-inverse transition-colors duration-base hover:bg-accent disabled:opacity-60"
      >
        {status.kind === "sending" ? "Checking…" : "Send enquiry"}
      </button>

      <div aria-live="polite" className="mt-6">
        {status.kind === "validated" && (
          <div className="border border-accent bg-surface p-5">
            <p className="text-body-sm font-medium text-accent">
              Validated — but not delivered
            </p>
            <p className="mt-2 max-w-[52ch] text-body-sm text-ink-secondary">
              {status.message} This is a preview environment with no CRM
              connected, so nobody has received this. Please call instead.
            </p>
          </div>
        )}
        {status.kind === "error" && (
          <p role="alert" className="text-body-sm text-accent">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

const inputClass =
  "mt-2 w-full border border-line-interactive bg-surface px-4 py-3 text-body text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-ink">
        {label}
      </label>
      {children(id, errorId)}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-body-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
