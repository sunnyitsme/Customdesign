export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-sm bg-ink px-4 py-3 text-body-sm font-medium text-ink-inverse focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
    >
      Skip to content
    </a>
  );
}
