/**
 * Placeholder for photography and hero footage that does not exist yet.
 *
 * Deliberately NOT a grey box and deliberately NOT fake imagery: it renders an
 * architectural drawing field — the same elevation language the page is built
 * on — so composition and spacing can be judged honestly while the slot is
 * obviously empty. Replacing it with real media requires no layout change.
 */
export function DrawingPlate({
  label,
  tone = 'dark',
  className = '',
}: {
  label: string;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const line = tone === 'dark' ? 'rgba(143,191,175,0.14)' : 'rgba(21,25,26,0.11)';
  const ground = tone === 'dark' ? 'var(--color-deep)' : '#E3E5E1';

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden border border-line ${className}`}
      style={{
        backgroundColor: ground,
        backgroundImage: `repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px 4.5rem),
                          repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px 4.5rem)`,
      }}
    >
      {/* Two datum lines crossing off-centre — the drawing's registration marks. */}
      <span
        className="absolute top-0 bottom-0 left-[38.2%] w-px"
        style={{ backgroundColor: tone === 'dark' ? 'rgba(143,191,175,0.3)' : 'rgba(47,95,82,0.34)' }}
      />
      <span
        className="absolute right-0 left-0 top-[61.8%] h-px"
        style={{ backgroundColor: tone === 'dark' ? 'rgba(143,191,175,0.3)' : 'rgba(47,95,82,0.34)' }}
      />
      <span
        className={`absolute bottom-4 left-4 text-[10px] font-medium tracking-[0.14em] uppercase ${
          tone === 'dark' ? 'text-ink-inverse-secondary' : 'text-ink-tertiary'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
