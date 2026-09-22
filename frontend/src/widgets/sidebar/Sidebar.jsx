import { ProgressSummary } from '../progress-summary';
import { TaskFilters } from '../task-filters';

export function Sidebar({ total, done, activeFilter, onFilterChange, counts }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">F</span>
        <span className="sidebar__name">Focus</span>
      </div>

      <ProgressSummary total={total} done={done} />

      <div className="sidebar__divider" />

      <TaskFilters active={activeFilter} onChange={onFilterChange} counts={counts} />

      <p className="sidebar__footnote">One list. No clutter.</p>
    </aside>
  );
}
