export const DOW_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function toDateKey(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

// Builds a 6-row grid of dates for the given month, including the
// trailing/leading days from adjacent months so every week is full.
export function buildMonthGrid(year, month, weekStartsMonday = false) {
  const firstOfMonth = new Date(year, month, 1);
  const rawOffset = firstOfMonth.getDay();
  const startOffset = weekStartsMonday ? (rawOffset + 6) % 7 : rawOffset;
  const gridStart = new Date(year, month, 1 - startOffset);

  const days = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}
