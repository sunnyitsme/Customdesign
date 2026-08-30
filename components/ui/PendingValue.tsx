/**
 * The display slot for a figure that has not been verified yet.
 *
 * A short rule holds the position a number will occupy, so the composition
 * reads as intended, with the requirement stated beneath it. Deliberately not a
 * plausible-looking placeholder number: nothing here should ever be mistaken
 * for a real figure.
 */
export function PendingValue({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`block h-px w-16 ${tone === "dark" ? "bg-ink-inverse-secondary" : "bg-ink-tertiary"}`}
      />
      <span
        className={`mt-4 block text-eyebrow font-medium tracking-[0.14em] uppercase ${
          tone === "dark" ? "text-accent-bright" : "text-accent"
        }`}
      >
        {label}
      </span>
    </>
  );
}
