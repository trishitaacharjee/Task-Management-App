export const MOODS = ['great', 'good', 'okay', 'down', 'rough'];

// Icons for these are rendered via <MoodFace mood={...} /> (see
// shared/ui/icons) — this map only carries the label now.
export const MOOD_META = {
  great: { label: 'Great' },
  good: { label: 'Good' },
  okay: { label: 'Okay' },
  down: { label: 'Down' },
  rough: { label: 'Rough' },
};

export function formatEntryDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}
