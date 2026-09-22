// Self-contained UI block: takes plain numbers, knows nothing about
// where tasks come from. A conic-gradient ring, no charting library needed.
export function ProgressSummary({ total, done }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="progress-summary">
      <div
        className="progress-summary__ring"
        style={{ '--pct': pct }}
        role="img"
        aria-label={`${pct}% of tasks complete`}
      >
        <span className="progress-summary__pct">{pct}%</span>
      </div>
      <div className="progress-summary__text">
        <p className="progress-summary__label">Today's progress</p>
        <p className="progress-summary__count">
          {done} of {total} done
        </p>
      </div>
    </div>
  );
}
