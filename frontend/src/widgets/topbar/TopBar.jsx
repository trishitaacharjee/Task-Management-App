import { SearchIcon } from '../../shared/ui/icons';

// Top-right strip: today's date, a search affordance, and the user's
// avatar. Kept intentionally simple — no props needed yet.
export function TopBar() {
  const label = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="topbar">
      <span className="topbar__date">{label}</span>
      <button type="button" className="topbar__search" aria-label="Search">
        <SearchIcon width={16} height={16} />
      </button>
      <div className="topbar__avatar">T</div>
    </header>
  );
}
