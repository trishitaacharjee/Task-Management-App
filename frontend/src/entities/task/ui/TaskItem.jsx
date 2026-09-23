import { useEffect, useState } from 'react';
import { formatDueDate } from '../model/priority';
import { CheckIcon, CalendarIcon, ClipboardIcon, TrashIcon } from '../../../shared/ui/icons';
import { AnimalSticker, getTaskStickerType } from '../../../shared/ui/AnimalStickers';
import { EditableTitle } from '../../../features/edit-task';
import { TaskNotes } from '../../../features/task-notes';
import { toggleTask } from '../../../features/toggle-task';
import { deleteTask } from '../../../features/delete-task';
import { playTaskComplete } from '../../../shared/lib/sound';

const COLORS = ['pink', 'lavender', 'mint', 'peach', 'sky'];

export function TaskItem({ task, onChanged, onRemoved }) {
  const due = formatDueDate(task.dueDate);
  const [notesOpen, setNotesOpen] = useState(false);

  useEffect(() => {
    // Keep this component intentionally simple: notes stay in the task flow,
    // while delete is a single direct action with no popup/menu to overlap cards.
  }, []);

  async function handleToggle() {
    try {
      const updated = await toggleTask(task.id);
      onChanged(updated || { ...task, done: !task.done });
      if (!task.done && localStorage.getItem('toki-sound') !== 'false') playTaskComplete();
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  }

  async function handleRemove() {
    try {
      await deleteTask(task.id);
      onRemoved(task.id);
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  }

  const color = task.color || COLORS[(Number(task.id) || 0) % COLORS.length];
  const stickerType = getTaskStickerType(task);

  return (
    <li data-task-id={task.id} className={`task-card task-card--${color}${task.done ? ' task-card--done' : ''}${notesOpen ? ' task-card--notes-open' : ''}`}>
      <div className="task-card__row">
        <button type="button" className="task-card__check" onClick={handleToggle} aria-label={task.done ? 'Mark as not done' : 'Mark as done'}>
          <CheckIcon className="task-card__check-icon" />
        </button>

        <div className="task-card__body">
          <EditableTitle task={task} onSaved={onChanged} className="task-card__title" />
          {due && (
            <div className="task-card__meta">
              <span className={`due-badge${due.isOverdue && !task.done ? ' due-badge--overdue' : ''}`}>
                <CalendarIcon width={12} height={12} /> {due.label}
              </span>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`task-notes__toggle task-card__notes-button${task.notes ? ' task-notes__toggle--filled' : ''}`}
          onClick={() => setNotesOpen((open) => !open)}
          aria-expanded={notesOpen}
          aria-label={notesOpen ? 'Close notes' : 'Open notes'}
        >
          <ClipboardIcon width={13} height={13} /> Notes
        </button>

        <span className="task-card__sticker" aria-hidden="true">
          <AnimalSticker type={stickerType} size={62} />
        </span>

        <button
          type="button"
          className="task-card__delete"
          onClick={handleRemove}
          aria-label={`Delete task: ${task.title}`}
          title="Delete task"
        >
          <TrashIcon className="task-card__delete-icon" />
        </button>
      </div>

      {notesOpen && <TaskNotes task={task} onSaved={onChanged} onClose={() => setNotesOpen(false)} />}
    </li>
  );
}
