// Central place for priority display info, so the badge color/label
// logic isn't duplicated between TaskItem and the create form.
export const PRIORITIES = ['low', 'medium', 'high'];

export const PRIORITY_META = {
  low: { label: 'Low' },
  medium: { label: 'Medium' },
  high: { label: 'High' },
};

function ymd(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// dueDate can be a plain "YYYY-MM-DD" (date only, from older tasks or
// no time picked) or "YYYY-MM-DDTHH:MM" (date + time). Renders as
// "Today · 6:00 PM" / "Tomorrow" / "Sep 24 · 6:00 PM" as appropriate.
export function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  const hasTime = dueDate.length > 10;
  const now = new Date();
  const todayKey = ymd(now);
  const dateKey = ymd(date);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = ymd(tomorrow);

  let dayLabel;
  if (dateKey === todayKey) dayLabel = 'Today';
  else if (dateKey === tomorrowKey) dayLabel = 'Tomorrow';
  else dayLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  const timeLabel = hasTime ? date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : null;
  const label = timeLabel ? `${dayLabel} · ${timeLabel}` : dayLabel;

  const isOverdue = hasTime ? date < now : new Date(`${dateKey}T23:59:59`) < now;

  return { label, isOverdue };
}
