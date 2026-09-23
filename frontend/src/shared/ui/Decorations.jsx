// Purely decorative floating stars/clouds/sparkles behind the content,
// as small inline SVGs (no emoji font involved). aria-hidden +
// pointer-events:none (see CSS) so it never gets in the way.

function Star(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.7 6.3 6.8.6-5.2 4.5 1.6 6.7L12 17l-5.9 3.6 1.6-6.7-5.2-4.5 6.8-.6L12 2.5Z" />
    </svg>
  );
}

function Cloud(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 17a4 4 0 0 1-.4-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 17 17H7Z" />
    </svg>
  );
}

function Sparkle(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6Z" />
    </svg>
  );
}

const ITEMS = [Star, Sparkle, Cloud, Sparkle, Star, Cloud];

export function Decorations() {
  return (
    <div className="bg-decor" aria-hidden="true">
      {ITEMS.map((Shape, i) => (
        <span key={i} className={`bg-decor__item bg-decor__item--${i + 1}`}>
          <Shape width="1em" height="1em" />
        </span>
      ))}
    </div>
  );
}
