import { useRef, useState } from 'react';
import { taskApi } from '../../entities/task';

// Owns the "rename a task" user action: entering edit mode, local input
// state, save-on-blur/enter, and the API call. Renders as a drop-in
// replacement for a plain title span.
export function EditableTitle({ task, onSaved, className }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);
  const inputRef = useRef(null);

  function startEditing() {
    setValue(task.title);
    setEditing(true);
    // Focus after the input mounts.
    requestAnimationFrame(() => inputRef.current?.select());
  }

  async function save() {
    const trimmed = value.trim();
    setEditing(false);
    if (!trimmed || trimmed === task.title) return;
    const updated = await taskApi.edit(task.id, { title: trimmed });
    onSaved(updated);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') inputRef.current.blur();
    if (e.key === 'Escape') {
      setValue(task.title);
      setEditing(false);
    }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        className="editable-title__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={handleKeyDown}
        aria-label="Edit task title"
      />
    );
  }

  return (
    <button type="button" className={className} onClick={startEditing} title="Click to rename">
      {task.title}
    </button>
  );
}
