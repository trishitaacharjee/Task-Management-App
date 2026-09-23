import { MOOD_META } from '../model/mood';

export function DiaryEntryPreview({ entry, active, onClick }) {
  const [, m, d] = entry.date.split('-');
  const shortLabel = new Date(entry.date + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const snippet = entry.text?.trim().slice(0, 42) || 'No entry text yet…';

  return (
    <button
      type="button"
      className={`diary-entry-preview${active ? ' diary-entry-preview--active' : ''}`}
      onClick={onClick}
    >
      <div className="diary-entry-preview__top">
        <span className="diary-entry-preview__date">{shortLabel}</span>
        {entry.mood && <span className="diary-entry-preview__mood">{MOOD_META[entry.mood]?.emoji}</span>}
      </div>
      <p className="diary-entry-preview__snippet">
        {snippet}
        {entry.text?.length > 42 ? '…' : ''}
      </p>
    </button>
  );
}
