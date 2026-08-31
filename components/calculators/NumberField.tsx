"use client";

import { useId } from "react";

/** Labelled numeric input. Label is always present — never a placeholder. */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-body-sm font-medium text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2 border border-line-interactive bg-surface px-4 py-3 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus">
        {prefix && (
          <span aria-hidden="true" className="text-body text-ink-tertiary">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => onChange(Number(event.target.value))}
          {...(hint ? { "aria-describedby": `${id}-hint` } : {})}
          className="w-full bg-transparent text-body tabular text-ink outline-none"
        />
        {suffix && (
          <span aria-hidden="true" className="text-body text-ink-tertiary">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-body-sm text-ink-tertiary">
          {hint}
        </p>
      )}
    </div>
  );
}
