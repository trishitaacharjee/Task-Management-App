import { useEffect, useState } from 'react';

const STORAGE_KEY = 'toki:quick-note';

// A lightweight scratchpad for jotting something down without creating
// a full task. Kept local to the browser (localStorage) since it's
// meant for quick, throwaway notes rather than synced data.
export function QuickNote() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setText(localStorage.getItem(STORAGE_KEY) || '');
    } catch {
      // localStorage unavailable — quick note just won't persist
    }
  }, []);

  function handleSave() {
    try {
      localStorage.setItem(STORAGE_KEY, text);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      // ignore — best effort only
    }
  }

  return (
    <div className="panel-card">
      <h3 className="panel-card__title">
        <span aria-hidden="true">📝</span> Quick Note
      </h3>
      <textarea
        className="quick-note__area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Jot down something quickly..."
      />
      <button type="button" className="quick-note__save" onClick={handleSave}>
        Save
      </button>
      {saved && <p className="quick-note__saved">Saved ✨</p>}
    </div>
  );
}
