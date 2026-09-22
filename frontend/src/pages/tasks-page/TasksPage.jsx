import { useEffect, useMemo, useState } from 'react';
import { taskApi } from '../../entities/task';
import { CreateTaskForm } from '../../features/create-task';
import { TaskList } from '../../widgets/task-list';
import { Sidebar } from '../../widgets/sidebar';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const today = new Date().toLocaleDateString(undefined, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

// Pages only compose widgets/features for a route — no business logic
// of their own beyond "load the initial data and hand it down."
export function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    taskApi
      .getAll()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const done = tasks.filter((t) => t.done).length;
  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.length - done,
      completed: done,
    }),
    [tasks, done]
  );

  const visibleTasks = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  const emptyMessages = {
    all: 'Nothing here yet. Add your first task above.',
    active: 'Nothing active — you\u2019re all caught up.',
    completed: 'No completed tasks yet.',
  };

  return (
    <div className="app-shell">
      <Sidebar
        total={tasks.length}
        done={done}
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />

      <main className="workspace">
        <header className="workspace__header">
          <p className="workspace__date">{today}</p>
          <h1>{greeting()}.</h1>
        </header>

        <CreateTaskForm onCreated={(task) => setTasks((prev) => [...prev, task])} />

        {error && <p className="workspace__error">Couldn't reach the server: {error}</p>}
        {loading && <p className="workspace__loading">Loading your tasks…</p>}
        {!loading && !error && <TaskList tasks={visibleTasks} onChange={setTasks} emptyMessage={emptyMessages[filter]} />}
      </main>
    </div>
  );
}
