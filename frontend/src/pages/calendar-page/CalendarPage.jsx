import { useEffect, useMemo, useState } from 'react';
import { buildMonthGrid, toDateKey, isSameDay } from '../../shared/lib/calendar';
import { CalendarIcon } from '../../shared/ui/icons';
import { AnimalSticker, getTaskStickerType } from '../../shared/ui/AnimalStickers';
import { calendarApi } from '../../entities/calendar';

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COLORS = ['pink', 'lavender', 'mint', 'sky', 'peach'];

function formatDate(key) {
  return new Date(`${key}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function eventOccursOn(event, key) {
  if (event.date === key) return true;
  if (event.repeat !== 'yearly') return false;
  return event.date.slice(5) === key.slice(5);
}

function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function EventForm({ date, initialEvent, onSave, onCancel }) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [notes, setNotes] = useState(initialEvent?.notes || '');
  const [allDay, setAllDay] = useState(initialEvent ? initialEvent.allDay : true);
  const [startTime, setStartTime] = useState(initialEvent?.startTime || '09:00');
  const [endTime, setEndTime] = useState(initialEvent?.endTime || '10:00');
  const [repeat, setRepeat] = useState(initialEvent?.repeat || 'none');
  const [color, setColor] = useState(initialEvent?.color || 'pink');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) { setError('Give your event a name.'); return; }
    setSaving(true);
    setError('');
    try {
      await onSave({ title, date, notes, allDay, startTime, endTime, repeat, color });
    } catch (err) {
      setError(err.message || 'Could not save the event.');
      setSaving(false);
    }
  }

  return (
    <div className="calendar-event-modal__backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <form className="calendar-event-modal" onSubmit={submit}>
        <div className="calendar-event-modal__header">
          <div>
            <span className="calendar-event-modal__eyebrow">{initialEvent ? 'Edit event' : 'New event'}</span>
            <h2>{formatDate(date)}</h2>
          </div>
          <button type="button" className="calendar-event-modal__close" onClick={onCancel} aria-label="Close">×</button>
        </div>

        <label className="calendar-form__label">Event name
          <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Birthday, interview, appointment..." maxLength={120} />
        </label>

        <div className="calendar-form__row">
          <label className="calendar-form__label">Date
            <input type="date" value={date} readOnly />
          </label>
          <label className="calendar-form__check">
            <input type="checkbox" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} />
            <span>All day</span>
          </label>
        </div>

        {!allDay && (
          <div className="calendar-form__row">
            <label className="calendar-form__label">Starts
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <label className="calendar-form__label">Ends
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </label>
          </div>
        )}

        <label className="calendar-form__label">Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add details, location, people, things to remember..." maxLength={5000} rows={4} />
        </label>

        <div className="calendar-form__row">
          <label className="calendar-form__label">Repeat
            <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
              <option value="none">Doesn't repeat</option>
              <option value="yearly">Every year</option>
            </select>
          </label>
          <div className="calendar-color-picker">
            <span className="calendar-form__label-text">Colour</span>
            <div className="calendar-color-picker__options">
              {COLORS.map((item) => (
                <button key={item} type="button" aria-label={`${item} colour`} className={`calendar-color calendar-color--${item}${color === item ? ' is-selected' : ''}`} onClick={() => setColor(item)} />
              ))}
            </div>
          </div>
        </div>

        {error && <p className="calendar-form__error">{error}</p>}

        <div className="calendar-event-modal__actions">
          <button type="button" className="calendar-secondary-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="calendar-primary-btn" disabled={saving}>{saving ? 'Saving…' : initialEvent ? 'Save changes' : 'Add event'}</button>
        </div>
      </form>
    </div>
  );
}

export function CalendarPage({ tasks, initialDate }) {
  const todayKey = toDateKey(new Date());
  const [cursor, setCursor] = useState(initialDate ? new Date(`${initialDate}T00:00:00`) : new Date());
  const [selected, setSelected] = useState(initialDate || todayKey);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    let active = true;
    calendarApi.getAll()
      .then((data) => { if (active) setEvents(data); })
      .catch((err) => { if (active) setError(err.message || 'Could not load calendar events.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const grid = buildMonthGrid(cursor.getFullYear(), cursor.getMonth(), true);
  const today = new Date();

  const eventsByDate = useMemo(() => {
    const map = {};
    grid.forEach((day) => {
      const key = toDateKey(day);
      map[key] = events.filter((event) => eventOccursOn(event, key));
    });
    return map;
  }, [events, cursor]);

  const selectedEvents = eventsByDate[selected] || events.filter((event) => eventOccursOn(event, selected));
  const selectedTasks = tasks.filter((task) => task.dueDate && task.dueDate.slice(0, 10) === selected);

  function selectDate(key) {
    setSelected(key);
  }

  async function saveEvent(data) {
    if (editor?.event) {
      const updated = await calendarApi.update(editor.event.id, data);
      setEvents((current) => current.map((event) => event.id === updated.id ? updated : event));
    } else {
      const created = await calendarApi.create(data);
      setEvents((current) => [...current, created]);
    }
    setEditor(null);
  }

  async function deleteEvent(event) {
    try {
      await calendarApi.remove(event.id);
      setEvents((current) => current.filter((item) => item.id !== event.id));
    } catch (err) {
      setError(err.message || 'Could not delete the event.');
    }
  }

  return (
    <div className="workspace workspace--wide">
      <div className="workspace__header calendar-page-header">
        <div>
          <h1 className="workspace__page-title"><CalendarIcon width={24} height={24} /> Calendar</h1>
          <p className="calendar-page-header__sub">Plan birthdays, interviews, appointments and anything you never want to forget.</p>
        </div>
        <button className="calendar-add-top" type="button" onClick={() => setEditor({ date: selected })}>+ Add event</button>
      </div>

      {error && <div className="calendar-error">{error}</div>}

      <div className="calendar-page">
        <section className="calendar-big">
          <div className="calendar-big__nav">
            <button type="button" className="calendar-big__nav-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} aria-label="Previous month">‹</button>
            <button type="button" className="calendar-big__today-btn" onClick={() => { setCursor(new Date()); setSelected(todayKey); }}>Today</button>
            <span className="calendar-big__label">{cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
            <button type="button" className="calendar-big__nav-btn" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} aria-label="Next month">›</button>
          </div>

          <div className="calendar-big__grid calendar-big__grid--real">
            {DOW.map((d) => <span key={d} className="calendar-big__dow">{d}</span>)}
            {grid.map((d) => {
              const key = toDateKey(d);
              const dayEvents = eventsByDate[key] || [];
              const dayTasks = tasks.filter((task) => task.dueDate?.slice(0, 10) === key);
              const muted = d.getMonth() !== cursor.getMonth();
              return (
                <button key={key} type="button" className={`calendar-big__day calendar-big__day--real${muted ? ' calendar-big__day--muted' : ''}${isSameDay(d, today) ? ' calendar-big__day--today' : ''}${key === selected ? ' calendar-big__day--selected' : ''}`} onClick={() => selectDate(key)}>
                  <span className="calendar-big__number">{d.getDate()}</span>
                  <span className="calendar-big__events">
                    {dayEvents.slice(0, 2).map((event) => <span key={event.id} className={`calendar-event-chip calendar-event-chip--${event.color}`}>{event.title}</span>)}
                    {dayTasks.slice(0, Math.max(0, 2 - dayEvents.length)).map((task) => <span key={`task-${task.id}`} className="calendar-event-chip calendar-event-chip--task">{task.title}</span>)}
                    {dayEvents.length + dayTasks.length > 2 && <span className="calendar-more">+{dayEvents.length + dayTasks.length - 2} more</span>}
                  </span>
                  {(dayEvents.length || dayTasks.length) > 0 && <span className="calendar-big__event-dot" />}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="calendar-side calendar-side--agenda">
          <div className="calendar-side__heading">
            <div>
              <span className="calendar-side__eyebrow">Selected day</span>
              <h3 className="calendar-side__title">{formatDate(selected)}</h3>
            </div>
            <button type="button" className="calendar-side__add" onClick={() => setEditor({ date: selected })}>＋</button>
          </div>

          {loading ? <p className="today-tasks__empty">Loading your calendar…</p> : null}

          {!loading && selectedEvents.length === 0 && selectedTasks.length === 0 && (
            <div className="calendar-empty">
              <span className="calendar-empty__icon">✦</span>
              <strong>Nothing planned yet</strong>
              <p>Click “Add event” to save something for this date.</p>
              <button type="button" className="calendar-primary-btn calendar-primary-btn--small" onClick={() => setEditor({ date: selected })}>Add an event</button>
            </div>
          )}

          <div className="calendar-agenda-list">
            {selectedEvents.map((event) => (
              <article key={event.id} className={`calendar-agenda-item calendar-agenda-item--${event.color}`}>
                <div className="calendar-agenda-item__dot" />
                <div className="calendar-agenda-item__body">
                  <div className="calendar-agenda-item__topline">
                    <strong>{event.title}</strong>
                    {event.repeat === 'yearly' && <span className="calendar-repeat">↻ yearly</span>}
                  </div>
                  <span className="calendar-agenda-item__time">{event.allDay ? 'All day' : `${formatTime(event.startTime)} – ${formatTime(event.endTime)}`}</span>
                  {event.notes && <p>{event.notes}</p>}
                  <div className="calendar-agenda-item__actions">
                    <button type="button" onClick={() => setEditor({ date: selected, event })}>Edit</button>
                    <button type="button" onClick={() => deleteEvent(event)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}

            {selectedTasks.map((task) => (
              <article key={`task-${task.id}`} className="calendar-agenda-item calendar-agenda-item--task">
                <div className="calendar-agenda-item__dot" />
                <div className="calendar-agenda-item__body">
                  <strong>{task.title}</strong>
                  <span className="calendar-agenda-item__time">Toki task</span>
                </div>
                <span className="calendar-side__sticker"><AnimalSticker type={getTaskStickerType(task)} size={34} /></span>
              </article>
            ))}
          </div>
        </aside>
      </div>

      {editor && <EventForm date={editor.date} initialEvent={editor.event} onSave={saveEvent} onCancel={() => setEditor(null)} />}
    </div>
  );
}
