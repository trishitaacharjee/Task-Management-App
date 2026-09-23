import { useEffect, useState } from 'react';
import { GearIcon } from '../../shared/ui/icons';

const DEFAULTS = { notifications: true, sound: true, darkMode: false };
const ROWS = [
  { key: 'notifications', label: 'Notifications', desc: 'Allow Toki to remind you about your tasks.' },
  { key: 'sound', label: 'Sound effects', desc: 'Play soft sounds for task actions.' },
  { key: 'darkMode', label: 'Dark mode', desc: 'Keep the same soft Toki feel after dark.' },
];

export function SettingsPage() {
  const [state, setState] = useState(() => { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem('toki-settings') || '{}') }; } catch { return DEFAULTS; } });
  useEffect(() => { document.documentElement.dataset.theme = state.darkMode ? 'dark' : 'light'; localStorage.setItem('toki-settings', JSON.stringify(state)); localStorage.setItem('toki-sound', String(state.sound)); }, [state]);
  async function toggle(key) {
    if (key === 'notifications' && !state.notifications && 'Notification' in window) { const permission = await Notification.requestPermission(); if (permission !== 'granted') return; }
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  }
  return <div className="workspace"><div className="workspace__header"><h1 className="workspace__page-title"><GearIcon width={24} height={24} /> Settings</h1><p className="workspace__subtitle">Make Toki feel like your own space.</p></div><div className="settings-list">{ROWS.map((row) => <div key={row.key} className="settings-row"><div><div className="settings-row__label">{row.label}</div><p className="settings-row__desc">{row.desc}</p></div><button type="button" className={`settings-toggle${state[row.key] ? ' settings-toggle--on' : ''}`} onClick={() => toggle(row.key)} aria-label={row.label} aria-pressed={state[row.key]} /></div>)}</div></div>;
}
