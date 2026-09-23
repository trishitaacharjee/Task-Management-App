import { DiaryEntryPreview, todayKey } from '../../entities/diary';

export function DiaryList({ entries, selectedDate, onSelect }) {
  function handleNewEntry() {
    onSelect(todayKey());
  }

  return (
    <div className="diary-list">
      <div className="diary-list__header">
        <h3>Entries</h3>
        <button type="button" className="diary-list__new" onClick={handleNewEntry}>
          + New Entry
        </button>
      </div>

      {entries.length === 0 && <p className="diary-list__empty">No entries yet. Write your first one!</p>}

      <div className="diary-list__items">
        {entries.map((entry) => (
          <DiaryEntryPreview
            key={entry.date}
            entry={entry}
            active={entry.date === selectedDate}
            onClick={() => onSelect(entry.date)}
          />
        ))}
      </div>
    </div>
  );
}
