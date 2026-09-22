import { CheckIcon, TrashIcon } from '../../../shared/ui/icons';

// Purely presentational: the entity knows how a task LOOKS,
// not how toggling or deleting actually happens (that's the features' job).
export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.done ? ' task-item--done' : ''}`}>
      <button
        type="button"
        className="task-item__check"
        onClick={() => onToggle(task.id)}
        aria-pressed={task.done}
        aria-label={task.done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
      >
        <CheckIcon className="task-item__check-icon" />
      </button>

      <span className="task-item__title">{task.title}</span>

      <button
        type="button"
        className="task-item__remove"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
      >
        <TrashIcon className="task-item__remove-icon" />
      </button>
    </li>
  );
}
