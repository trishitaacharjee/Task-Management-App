import { useMemo, useState } from 'react';
import { buildMonthGrid, toDateKey, isSameDay, DOW_SHORT } from '../../shared/lib/calendar';
import { StarIcon, ClipboardIcon, CalendarIcon } from '../../shared/ui/icons';
import { CatSticker } from '../../shared/ui/AnimalStickers';

// Sticky right column: today's progress ring, a scratchpad note, and
// a mini calendar. Not shown on every page — App decides when to
// render it (currently disabled to match the reference design, which
// keeps the Tasks page to two columns). Kept ready for reuse.
export function RightPanel({ tasks, onNavigateCalendar }) {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [cursor, setCursor] = useState(new Date());

  const today = new Date();
  const todayKey = toDateKey(today);

  const todayTasks = useMemo(
    () => tasks.filter((t) => t.dueDate?.slice(0, 10) === todayKey),
    [tasks, todayKey]
  );

  const doneCount = todayTasks.filter((t) => t.done).length;
  const pct = todayTasks.length ? Math.round((doneCount / todayTasks.length) * 100) : 0;

  const grid = buildMonthGrid(cursor.getFullYear(), cursor.getMonth());
  const taskDates = new Set(tasks.filter((t) => t.dueDate).map((t) => t.dueDate.slice(0, 10)));

  function handleSaveNote() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <aside className="right-panel">
      <div className="panel-card">
        <h3 className="panel-card__title"><StarIcon width={16} height={16} /> Today's Progress</h3>
        <div className="progress-card__ring-row">
          <div className="progress-card__ring" style={{ '--pct': pct }}>
            <span className="progress-card__pct">{pct}%</span>
          </div>
          <div>
            <p className="progress-card__count">
              {doneCount}/{todayTasks.length} done
            </p>
            <p className="progress-card__count-sub">Keep it up!</p>
          </div>
        </div>
        <div className="progress-card__quote">
          <span className="progress-card__quote-face"><CatSticker size={26} /></span>
          <p className="progress-card__quote-text">"Every small step counts."</p>
        </div>
      </div>

      <div className="panel-card">
        <h3 className="panel-card__title"><ClipboardIcon width={16} height={16} /> Quick Note</h3>
        <textarea
          className="quick-note__area"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot something down…"
        />
        <button type="button" className="quick-note__save" onClick={handleSaveNote}>
          Save
        </button>
        {saved && <p className="quick-note__saved">Saved!</p>}
      </div>

      <div className="panel-card">
        <h3 className="panel-card__title"><CalendarIcon width={16} height={16} /> Calendar</h3>
        <div className="mini-cal__nav">
          <button
            type="button"
            className="mini-cal__nav-btn"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          >
            ‹
          </button>
          <span className="mini-cal__label">
            {cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </span>
          <button
            type="button"
            className="mini-cal__nav-btn"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          >
            ›
          </button>
        </div>
        <div className="mini-cal__grid">
          {DOW_SHORT.map((d) => (
            <span key={d} className="mini-cal__dow">
              {d}
            </span>
          ))}
          {grid.map((d) => {
            const key = toDateKey(d);
            const muted = d.getMonth() !== cursor.getMonth();
            return (
              <button
                key={key}
                type="button"
                className={`mini-cal__day${muted ? ' mini-cal__day--muted' : ''}${
                  isSameDay(d, today) ? ' mini-cal__day--today' : ''
                }`}
                onClick={() => onNavigateCalendar(key)}
              >
                {d.getDate()}
                {taskDates.has(key) && <span className="mini-cal__dot" />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
