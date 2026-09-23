import { CheckIcon, CalendarIcon, BookIcon, ChartIcon, GearIcon } from '../../shared/ui/icons';
import { CatSticker } from '../../shared/ui/AnimalStickers';

const NAV_ITEMS = [
  { key: 'tasks', label: 'Tasks', Icon: CheckIcon },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { key: 'diary', label: 'Diary', Icon: BookIcon },
  { key: 'stats', label: 'Status', Icon: ChartIcon },
  { key: 'settings', label: 'Settings', Icon: GearIcon },
];

// Left navigation rail: brand mark, page nav, and the mascot quote
// card pinned to the bottom, exactly as in the design mock.
export function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">
          <CatSticker size={24} />
        </span>
        <span className="sidebar__name">Toki</span>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className={`sidebar__nav-item${page === key ? ' sidebar__nav-item--active' : ''}`}
            onClick={() => onNavigate(key)}
          >
            <span style={{ display: 'inline-flex' }}>
              <Icon width={18} height={18} />
            </span>{' '}
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar__mascot">
        <span className="sidebar__mascot-face">
          <CatSticker size={44} />
        </span>
        <p className="sidebar__mascot-quote">"Progress, one small step at a time."</p>
      </div>
    </aside>
  );
}
