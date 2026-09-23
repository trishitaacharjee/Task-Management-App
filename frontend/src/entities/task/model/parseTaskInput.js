function pad(n) {
  return String(n).padStart(2, '0');
}

function dateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// The create bar is a single text field with no visible date/time
// picker (matches the reference design), so "at 6pm" / "at 6:00 PM" /
// "tomorrow" typed or spoken into the title become the due date
// instead. Returns { title, dueDate } — dueDate is null when nothing
// was found, and the recognized words are stripped from the title.
export function parseTaskInput(rawTitle) {
  let title = rawTitle.trim();

  const hasTomorrow = /\btomorrow\b/i.test(title);
  const hasToday = /\btoday\b/i.test(title);
  title = title.replace(/\btomorrow\b/gi, '').replace(/\btoday\b/gi, '');

  const timeMatch = title.match(/\bat\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
  let dueDate = null;

  const base = new Date();
  if (hasTomorrow) base.setDate(base.getDate() + 1);

  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10);
    const minute = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    const meridiem = timeMatch[3]?.toLowerCase();

    if (meridiem === 'pm' && hour < 12) hour += 12;
    if (meridiem === 'am' && hour === 12) hour = 0;
    // No am/pm given and it's a small hour ("at 6") — assume evening,
    // since that's the common case for task reminders.
    if (!meridiem && hour >= 1 && hour <= 7) hour += 12;

    dueDate = `${dateKey(base)}T${pad(hour)}:${pad(minute)}`;
    title = title.replace(timeMatch[0], '');
  } else if (hasTomorrow || hasToday) {
    dueDate = dateKey(base);
  }

  title = title.replace(/\s{2,}/g, ' ').trim();
  return { title: title || rawTitle.trim(), dueDate };
}
