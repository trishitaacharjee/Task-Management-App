import { TaskItem } from '../../entities/task';
import { toggleTask } from '../../features/toggle-task';
import { deleteTask } from '../../features/delete-task';

// A widget composes entities + features into a self-contained block of UI.
// It knows about tasks (entity) and the actions available on them (features),
// but the page above doesn't need to know any of those details.
export function TaskList({ tasks, onChange, emptyMessage = 'Nothing here yet.' }) {
  async function handleToggle(id) {
    const updated = await toggleTask(id);
    onChange((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    onChange((prev) => prev.filter((t) => t.id !== id));
  }

  if (tasks.length === 0) {
    return <p className="task-list__empty">{emptyMessage}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
