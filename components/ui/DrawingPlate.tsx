/**
 * Placeholder for photography that does not exist yet.
 *
 * Not a grey box and not fake imagery: a toned field with a single crossing
 * datum, sized to the exact crop the real photograph will occupy. Earlier it
 * carried a dense grid, which read as a wireframe and pulled the whole page
 * toward an architecture-studio look. Replacing it with a real image requires
 * no layout change.
 *
 * Every colour here is a token composed in app/globals.css. The plate re-tones
 * with the palette rather than needing its own edit.
 */
export function DrawingPlate({
  label,
  tone = "dark",
  className = "",
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  const datum = dark ? "var(--plate-datum-dark)" : "var(--plate-datum-light)";
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ background: dark ? "var(--plate-dark)" : "var(--plate-light)" }}
    >
      {/* One crossing datum, off-centre — a registration mark, not a grid. */}
      <span
        className="absolute top-0 bottom-0 left-[38.2%] w-px"
        style={{ backgroundColor: datum }}
      />
      <span
        className="absolute right-0 left-0 top-[61.8%] h-px"
        style={{ backgroundColor: datum }}
      />
      <span
        className={`absolute bottom-4 left-4 max-w-[85%] text-[9px] font-medium tracking-[0.14em] uppercase ${
          dark ? "text-ink-inverse-secondary" : "text-ink-tertiary"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
