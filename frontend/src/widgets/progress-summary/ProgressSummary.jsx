const QUOTES = [
  { face: '🐰', text: 'Keep going! You\u2019re doing great!' },
  { face: '🐼', text: 'Small steps still move you forward.' },
  { face: '🐻', text: 'One task at a time. You\u2019ve got this.' },
  { face: '🐱', text: 'Progress, not perfection. 💗' },
];

// A richer progress card for the right-hand panel: ring, a 3-up stat
// grid, and a small rotating encouragement quote.
export function ProgressSummary({ total, done }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const pending = total - done;
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  return (
    <div className="panel-card">
      <h3 className="panel-card__title">
        <span aria-hidden="true">🌸</span> Today's Progress
      </h3>

      <div className="progress-card__ring-row">
        <div
          className="progress-card__ring"
          style={{ '--pct': pct }}
          role="img"
          aria-label={`${pct}% of tasks complete`}
        >
          <span className="progress-card__pct">{pct}%</span>
        </div>
        <div>
          <p className="progress-card__count">
            {done} of {total} tasks
          </p>
          <p className="progress-card__count-sub">completed</p>
        </div>
      </div>

      <div className="progress-card__stats">
        <div className="progress-card__stat">
          <span className="progress-card__stat-num">{total}</span>
          <span className="progress-card__stat-label">Total</span>
        </div>
        <div className="progress-card__stat">
          <span className="progress-card__stat-num">{done}</span>
          <span className="progress-card__stat-label">Completed</span>
        </div>
        <div className="progress-card__stat">
          <span className="progress-card__stat-num">{pending}</span>
          <span className="progress-card__stat-label">Pending</span>
        </div>
      </div>

      <div className="progress-card__quote">
        <span className="progress-card__quote-face" aria-hidden="true">
          {quote.face}
        </span>
        <p className="progress-card__quote-text">"{quote.text}"</p>
      </div>
    </div>
  );
}
