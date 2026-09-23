import { useEffect, useMemo, useState } from 'react';
import { diaryApi, formatEntryDate } from '../../entities/diary';
import { DiaryEditor } from '../../features/save-diary-entry';
import { toDateKey } from '../../shared/lib/calendar';
import { BookIcon } from '../../shared/ui/icons';

export function DiaryPage() {
  const today = toDateKey(new Date());
  const [entries, setEntries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);
  const [creating, setCreating] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => { diaryApi.getAll().then((data) => { setEntries(data || []); if (data?.length) { setSelectedId(data[0].id); setSelectedDate(data[0].date); setCreating(false); } }).catch(() => {}).finally(() => setLoading(false)); }, []);

  const selectedEntry = useMemo(() => entries.find((e) => String(e.id) === String(selectedId)) || null, [entries, selectedId]);
  const grouped = useMemo(() => {
    const groups = {};
    entries.forEach((entry) => { (groups[entry.date] ||= []).push(entry); });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [entries]);

  function newEntry(date = today) { setSelectedId(null); setSelectedDate(date); setCreating(true); }
  function handleSaved(saved) { setEntries((prev) => { const exists = prev.some((e) => String(e.id) === String(saved.id)); return exists ? prev.map((e) => String(e.id) === String(saved.id) ? saved : e) : [saved, ...prev]; }); setSelectedId(saved.id); setSelectedDate(saved.date); setCreating(false); }
  function handleDeleted(id) { setEntries((prev) => prev.filter((e) => String(e.id) !== String(id))); newEntry(selectedDate); }

  return (
    <div className="workspace workspace--wide">
      <div className="workspace__header"><h1 className="workspace__page-title"><BookIcon width={24} height={24} /> Diary</h1><p className="workspace__subtitle">Keep every day, thought and little memory in one place.</p></div>
      {loading ? <p className="workspace__loading">Loading your diary…</p> : <div className="diary-page">
        <div className="diary-list">
          <div className="diary-list__header"><div><h3>Diary entries</h3><span>{entries.length} saved {entries.length === 1 ? 'entry' : 'entries'}</span></div><button type="button" className="diary-list__new" onClick={() => newEntry()}>+ New entry</button></div>
          {grouped.length === 0 ? <div className="diary-list__empty">Your diary is empty. Write your first little moment.</div> : <div className="diary-list__items">
            {grouped.map(([date, dayEntries]) => <div key={date} className="diary-day-group">
              <div className="diary-day-group__date">{formatEntryDate(date)} <span>{dayEntries.length}</span></div>
              {dayEntries.map((entry, index) => <button key={entry.id} type="button" className={`diary-entry-preview${String(entry.id) === String(selectedId) ? ' diary-entry-preview--active' : ''}`} onClick={() => { setSelectedId(entry.id); setSelectedDate(entry.date); setCreating(false); }}>
                <div className="diary-entry-preview__top"><span>Entry {dayEntries.length - index}</span><small>{new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></div>
                <p className="diary-entry-preview__snippet">{entry.text || 'No notes'}</p>
              </button>)}
            </div>)}
          </div>}
        </div>
        <DiaryEditor date={selectedDate} entry={creating ? null : selectedEntry} onSaved={handleSaved} onDeleted={handleDeleted} />
      </div>}
    </div>
  );
}
