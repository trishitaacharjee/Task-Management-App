import { useEffect, useState } from 'react';
import { taskApi } from '../../entities/task';

export function TaskNotes({ task, onSaved, onClose }) {
  const [text, setText] = useState(task.notes || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setText(task.notes || ''), [task.notes]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const updated = await taskApi.edit(task.id, { notes: text });
      onSaved(updated || { ...task, notes: text });
      onClose?.();
    } catch (err) {
      setError(err.message || "Couldn't save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="task-notes__panel" aria-label={`Notes for ${task.title}`}>
      <textarea
        className="task-notes__textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add steps, links, reminders, or anything you need to remember…"
        rows={4}
        autoFocus
      />
      <div className="task-notes__actions">
        <button type="button" className="task-notes__cancel" onClick={onClose}>Cancel</button>
        <button type="button" className="task-notes__save" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save note'}</button>
      </div>
      {error && <p className="create-task__error">{error}</p>}
    </div>
  );
}
