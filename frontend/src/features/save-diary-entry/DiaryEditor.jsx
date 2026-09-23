import { useEffect, useState } from 'react';
import { diaryApi, MOODS, MOOD_META, formatEntryDate } from '../../entities/diary';
import { TrashIcon, MoodFace } from '../../shared/ui/icons';
const MAX_LENGTH = 5000;

export function DiaryEditor({ date, entry, onSaved, onDeleted }) {
  const [mood, setMood] = useState(entry?.mood ?? null);
  const [text, setText] = useState(entry?.text ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  useEffect(() => { setMood(entry?.mood ?? null); setText(entry?.text ?? ''); setError(null); }, [date, entry?.id]);

  async function handleSave() {
    if (!text.trim()) { setError('Write something before saving.'); return; }
    setSaving(true); setError(null);
    try { const saved = entry ? await diaryApi.update(entry.id, { mood, text }) : await diaryApi.create({ date, mood, text }); onSaved(saved); }
    catch (err) { setError(err.message || "Couldn't save your entry."); } finally { setSaving(false); }
  }
  async function handleDelete() {
    if (!entry) return;
    try { await diaryApi.remove(entry.id); setConfirmingDelete(false); onDeleted(entry.id); } catch (err) { setError(err.message || "Couldn't delete this entry."); }
  }

  return <div className="diary-editor">
    <div className="diary-editor__header"><div><span className="diary-editor__eyebrow">{entry ? 'Saved entry' : 'New entry'}</span><h2>{formatEntryDate(date)}</h2></div><div className="diary-editor__header-actions">{entry && <button type="button" className="diary-editor__delete" onClick={() => setConfirmingDelete(true)} aria-label="Delete entry"><TrashIcon width={16} height={16} /></button>}<button type="button" className="diary-editor__save" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : entry ? 'Save changes' : 'Save entry'}</button></div></div>
    <div className="diary-editor__mood"><span className="diary-editor__mood-label">How are you feeling?</span><div className="diary-editor__mood-options" role="radiogroup">{MOODS.map((m) => <button key={m} type="button" role="radio" aria-checked={mood === m} className={`diary-editor__mood-option${mood === m ? ' diary-editor__mood-option--active' : ''}`} onClick={() => setMood(m === mood ? null : m)} title={MOOD_META[m].label}><MoodFace mood={m} width={20} height={20} /></button>)}</div></div>
    <textarea className="diary-editor__textarea" value={text} onChange={(e) => setText(e.target.value.slice(0, MAX_LENGTH))} placeholder="Write about your day, what you did, what you learned, what you're feeling, or what you want to do tomorrow…" rows={15} />
    <div className="diary-editor__count">{text.length}/{MAX_LENGTH}</div>
    {error && <p className="create-task__error">{error}</p>}
    {confirmingDelete && <div className="diary-delete-confirm"><span>Delete this diary entry?</span><div><button type="button" onClick={() => setConfirmingDelete(false)}>Cancel</button><button type="button" onClick={handleDelete}>Delete</button></div></div>}
  </div>;
}
