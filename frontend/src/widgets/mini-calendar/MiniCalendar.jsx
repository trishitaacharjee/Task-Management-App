import { useState } from 'react';
import { DOW_SHORT, buildMonthGrid, toDateKey, isSameDay } from '../../shared/lib/calendar';

const MONTH_LABEL = { month: 'long', year: 'numeric' };

// Small month-at-a-glance calendar. Days with a task due get a dot;
// clicking a day hands the date up so the app can jump to the full
// Calendar page focused on that day.
export function MiniCalendar({ dueDates, onSelectDate }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date();
  const days = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
  const dueSet = new Set(dueDates);

  function shiftMonth(delta) {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));
  }

  return (
    <div className="panel-card">
      <div className="mini-cal__nav">
        <button
          type="button"
          className="mini-cal__nav-btn"
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="mini-cal__label">{cursor.toLocaleDateString(undefined, MONTH_LABEL)}</span>
        <button type="button" className="mini-cal__nav-btn" onClick={() => shiftMonth(1)} aria-label="Next month">
          ›
        </button>
      </div>

      <div className="mini-cal__grid">
        {DOW_SHORT.map((d) => (
          <span key={d} className="mini-cal__dow">
            {d}
          </span>
        ))}
        {days.map((day) => {
          const key = toDateKey(day);
          const inMonth = day.getMonth() === cursor.getMonth();
          const isToday = isSameDay(day, today);

          const classes = ['mini-cal__day'];
          if (!inMonth) classes.push('mini-cal__day--muted');
          if (isToday) classes.push('mini-cal__day--today');

          return (
            <button
              key={key}
              type="button"
              className={classes.join(' ')}
              onClick={() => onSelectDate(key)}
            >
              {day.getDate()}
              {dueSet.has(key) && <span className="mini-cal__dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
