/**
 * Placeholder for photography that does not exist yet.
 *
 * Not a grey box and not fake imagery: a toned field with a single crossing
 * datum, sized to the exact crop the real photograph will occupy. Earlier it
 * carried a dense grid, which read as a wireframe and pulled the whole page
 * toward an architecture-studio look. Replacing it with a real image requires
 * no layout change.
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
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: dark
          ? "linear-gradient(150deg, #223029 0%, #1b2422 55%, #202a27 100%)"
          : "linear-gradient(150deg, #e2e4df 0%, #dcdfd9 55%, #e5e6e1 100%)",
      }}
    >
      {/* One crossing datum, off-centre — a registration mark, not a grid. */}
      <span
        className="absolute top-0 bottom-0 left-[38.2%] w-px"
        style={{
          backgroundColor: dark
            ? "rgba(143,191,175,0.18)"
            : "rgba(47,95,82,0.14)",
        }}
      />
      <span
        className="absolute right-0 left-0 top-[61.8%] h-px"
        style={{
          backgroundColor: dark
            ? "rgba(143,191,175,0.18)"
            : "rgba(47,95,82,0.14)",
        }}
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
