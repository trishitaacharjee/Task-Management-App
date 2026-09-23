import { PlusIcon, CheckIcon, CalendarIcon, BookIcon, GearIcon } from '../../shared/ui/icons';

// Mobile-only tab bar (hidden on desktop via CSS) with a raised
// center "add task" button.
export function BottomNav({ page, onNavigate }) {
  return (
    <nav className="bottom-nav">
      <button
        type="button"
        className={`bottom-nav__item${page === 'tasks' ? ' bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('tasks')}
      >
        <CheckIcon width={18} height={18} /> Tasks
      </button>
      <button
        type="button"
        className={`bottom-nav__item${page === 'calendar' ? ' bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('calendar')}
      >
        <CalendarIcon width={18} height={18} /> Calendar
      </button>

      <button type="button" className="bottom-nav__add" onClick={() => onNavigate('tasks')} aria-label="Add task">
        <PlusIcon className="bottom-nav__add-icon" />
      </button>

      <button
        type="button"
        className={`bottom-nav__item${page === 'diary' ? ' bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('diary')}
      >
        <BookIcon width={18} height={18} /> Diary
      </button>
      <button
        type="button"
        className={`bottom-nav__item${page === 'settings' ? ' bottom-nav__item--active' : ''}`}
        onClick={() => onNavigate('settings')}
      >
        <GearIcon width={18} height={18} /> Settings
      </button>
    </nav>
  );
}
