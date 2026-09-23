import { useMemo, useState } from 'react';
import { TaskItem } from '../../entities/task';
import { CreateTaskForm } from '../../features/create-task';
import { SunIcon } from '../../shared/ui/icons';

const FILTERS = ['all', 'today', 'upcoming', 'completed'];
const FILTER_LABELS = { all: 'All', today: 'Today', upcoming: 'Upcoming', completed: 'Completed' };

function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// The Tasks home page: greeting header, the create-task bar, filter
// tabs with live counts, a sort control, and the task list itself.
// This is the page shown in the reference screenshot.
export function TasksPage({ tasks, setTasks, loading, error }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due');
  const tKey = todayKey();

  const counts = useMemo(() => {
    const c = { all: tasks.length, today: 0, upcoming: 0, completed: 0 };
    tasks.forEach((t) => {
      if (t.done) c.completed += 1;
      const dateKey = t.dueDate ? t.dueDate.slice(0, 10) : null;
      if (dateKey === tKey && !t.done) c.today += 1;
      if (dateKey && dateKey > tKey && !t.done) c.upcoming += 1;
    });
    return c;
  }, [tasks, tKey]);

  const filtered = useMemo(() => {
    let list = tasks;
    if (filter === 'today') list = tasks.filter((t) => t.dueDate?.slice(0, 10) === tKey && !t.done);
    if (filter === 'upcoming') list = tasks.filter((t) => t.dueDate?.slice(0, 10) > tKey && !t.done);
    if (filter === 'completed') list = tasks.filter((t) => t.done);

    const sorted = [...list];
    if (sort === 'due') {
      sorted.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));
    } else if (sort === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      sorted.sort((a, b) => (order[a.priority] ?? 1) - (order[b.priority] ?? 1));
    } else if (sort === 'created') {
      sorted.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    return sorted;
  }, [tasks, filter, sort, tKey]);

  function handleCreated(task) {
    if (!task?.id) return;
    setTasks((prev) => [...prev, task]);
  }

  function handleChanged(updated) {
    if (!updated?.id) return;
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  function handleRemoved(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning!' : hour < 18 ? 'Good Afternoon!' : hour < 22 ? 'Good Evening!' : "It's Night Time!";
  const greetingIcon = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : hour < 22 ? 'evening' : 'night';

  return (
    <div className="workspace">
      <div className="workspace__header workspace__hero">
        <div className="workspace__hero-art" aria-hidden="true"><span className="hero-sun" /><span className="hero-cloud hero-cloud--one" /><span className="hero-cloud hero-cloud--two" /><span className="hero-mountain hero-mountain--back" /><span className="hero-mountain hero-mountain--front" /><span className="hero-star hero-star--one">✦</span><span className="hero-star hero-star--two">✧</span></div>
        <div className="workspace__hero-copy">
        <h1>
          <span className={`workspace__greeting-face workspace__greeting-face--${greetingIcon}`}><SunIcon width={26} height={26} /></span> {greeting}
        </h1>
        <p className="workspace__subtitle">Ready to make today productive?</p>
        </div>
      </div>

      <CreateTaskForm onCreated={handleCreated} />

      {error && <p className="workspace__error">{error}</p>}

      {loading ? (
        <p className="workspace__loading">Loading your tasks…</p>
      ) : (
        <>
          <div className="task-toolbar">
            <div className="task-filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`task-filters__tab${filter === f ? ' task-filters__tab--active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {FILTER_LABELS[f]} <span className="task-filters__count">({counts[f]})</span>
                </button>
              ))}
            </div>

            <label className="task-sort">
              Sort by
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="due">Due Time</option>
                <option value="priority">Priority</option>
                <option value="created">Created</option>
              </select>
            </label>
          </div>

          {filtered.length === 0 ? (
            <p className="task-list__empty">No tasks here yet — enjoy the quiet.</p>
          ) : (
            <ul className="task-list">
              {filtered.map((task) => (
                <TaskItem key={task.id} task={task} onChanged={handleChanged} onRemoved={handleRemoved} />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
