import { TasksPage } from '../pages/tasks-page';
import './styles/global.css';

// The app layer wires everything together (routing, providers, global styles).
// With one page there's no router yet — add one here when you add more pages.
export function App() {
  return <TasksPage />;
}
