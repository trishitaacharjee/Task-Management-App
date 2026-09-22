const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

// Controlled component: the page owns which filter is active and
// how tasks get filtered. This widget only renders the tabs.
export function TaskFilters({ active, onChange, counts }) {
  return (
    <nav className="task-filters" aria-label="Filter tasks">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          className={`task-filters__tab${active === f.key ? ' task-filters__tab--active' : ''}`}
          onClick={() => onChange(f.key)}
        >
          <span>{f.label}</span>
          <span className="task-filters__count">{counts[f.key]}</span>
        </button>
      ))}
    </nav>
  );
}
