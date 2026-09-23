import { useEffect, useState } from 'react';
import { taskApi } from '../entities/task';
import { TasksPage } from '../pages/tasks-page';
import { DiaryPage } from '../pages/diary-page';
import { CalendarPage } from '../pages/calendar-page';
import { StatsPage } from '../pages/stats-page';
import { SettingsPage } from '../pages/settings-page';
import { Sidebar } from '../widgets/sidebar';
import { BottomNav } from '../widgets/bottom-nav';
import { TopBar } from '../widgets/topbar';
import { RightPanel } from '../widgets/right-panel';
import { Decorations } from '../shared/ui/Decorations';
import { CatSticker } from '../shared/ui/AnimalStickers';
import './styles/global.css';

// The app layer wires everything together: page routing (simple state,
// no URL router yet — add react-router here if deep-linking matters
// later), shared task state (needed by the sidebar, the right panel's
// progress ring, and the tasks/calendar pages), and global styles.
export function App() {
  const [page, setPage] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('toki-settings') || '{}');
      document.documentElement.dataset.theme = saved.darkMode ? 'dark' : 'light';
    } catch {}
  }, []);

  useEffect(() => {
    taskApi
      .getAll()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function goToCalendar(dateKey) {
    setCalendarDate(dateKey);
    setPage('calendar');
  }

  // The reference design keeps the Tasks page to two columns (sidebar +
  // full-width task list, no progress rail) — RightPanel stays built and
  // ready, just not wired up to any page right now.
  const showRightPanel = false;

  return (
    <div className={`app-shell${showRightPanel ? '' : ' app-shell--no-panel'}`}>
      <Decorations />
      <Sidebar page={page} onNavigate={setPage} />

      <div className="mobile-header">
        <span className="sidebar__mark">
          <CatSticker size={20} />
        </span>
        <span className="sidebar__name">Toki</span>
      </div>

      <main className="main-column">
        <TopBar />

        {page === 'tasks' && <TasksPage tasks={tasks} setTasks={setTasks} loading={loading} error={error} />}
        {page === 'diary' && <DiaryPage />}
        {page === 'calendar' && (
          <CalendarPage tasks={tasks} setTasks={setTasks} initialDate={calendarDate} />
        )}
        {page === 'stats' && <StatsPage tasks={tasks} />}
        {page === 'settings' && <SettingsPage />}
      </main>

      {showRightPanel && <RightPanel tasks={tasks} onNavigateCalendar={goToCalendar} />}

      <BottomNav page={page} onNavigate={setPage} />
    </div>
  );
}
