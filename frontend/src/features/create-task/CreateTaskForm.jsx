import { useState } from 'react';
import { taskApi } from '../../entities/task';
import { Input } from '../../shared/ui/Input';
import { PlusIcon } from '../../shared/ui/icons';

// This feature owns the "add a task" user action end to end:
// the form UI, its local state, and the API call it triggers.
export function CreateTaskForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const task = await taskApi.create(title);
      setTitle('');
      onCreated(task);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="create-task" onSubmit={handleSubmit}>
      <div className="create-task__row">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          aria-label="New task title"
        />
        <button type="submit" className="create-task__submit" disabled={submitting} aria-label="Add task">
          <PlusIcon className="create-task__submit-icon" />
        </button>
      </div>
      {error && <p className="create-task__error">{error}</p>}
    </form>
  );
}
