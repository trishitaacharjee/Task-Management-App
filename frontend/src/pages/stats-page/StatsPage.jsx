import { ChartIcon } from '../../shared/ui/icons';

export function StatsPage({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pending = total - done;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="workspace workspace--wide">
      <div className="workspace__header">
        <h1 className="workspace__page-title"><ChartIcon width={26} height={26} /> Status</h1>
        <p className="workspace__subtitle">A tiny snapshot of how your Toki day is going.</p>
      </div>

      <div className="stats-grid">
        <div className="stats-tile"><div className="stats-tile__label">Total tasks</div><div className="stats-tile__value">{total}</div></div>
        <div className="stats-tile"><div className="stats-tile__label">Completed</div><div className="stats-tile__value">{done}</div></div>
        <div className="stats-tile"><div className="stats-tile__label">Pending</div><div className="stats-tile__value">{pending}</div></div>
        <div className="stats-tile"><div className="stats-tile__label">Completion</div><div className="stats-tile__value">{pct}%</div></div>
      </div>

      <div className="status-card">
        <div className="status-card__top">
          <div>
            <h3>Task status</h3>
            <p>{done} of {total} task{total === 1 ? '' : 's'} completed</p>
          </div>
          <strong>{pct}%</strong>
        </div>
        <div className="status-card__track" aria-label={`Task completion ${pct}%`}>
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
