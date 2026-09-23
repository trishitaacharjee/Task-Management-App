const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
];

const SORTS = [
  { key: 'due', label: 'Due Time' },
  { key: 'priority', label: 'Priority' },
  { key: 'created', label: 'Date Added' },
];

// Controlled component: the page owns which filter/sort is active
// and how tasks get filtered/sorted. This widget only renders the
// tabs + the sort dropdown next to them.
export function TaskFilters({ active, onChange, counts, sort, onSortChange }) {
  return (
    <div className="task-toolbar">
      <nav className="task-filters" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`task-filters__tab${active === f.key ? ' task-filters__tab--active' : ''}`}
            onClick={() => onChange(f.key)}
          >
            <span>{f.label}</span>
            <span className="task-filters__count">({counts[f.key]})</span>
          </button>
        ))}
      </nav>

      <label className="task-sort">
        Sort:
        <select value={sort} onChange={(e) => onSortChange(e.target.value)} aria-label="Sort tasks">
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
