import { jsonStore } from '../../shared/storage/jsonStore.js';

let events = jsonStore.read('calendar', []);
let nextId = events.reduce((max, event) => Math.max(max, Number(event.id) || 0), 0) + 1;

const COLORS = ['pink', 'lavender', 'mint', 'sky', 'peach'];
const persist = () => jsonStore.write('calendar', events);

export const calendarModel = {
  findAll() {
    return [...events].sort((a, b) => `${a.date}T${a.startTime || '00:00'}`.localeCompare(`${b.date}T${b.startTime || '00:00'}`));
  },
  findById(id) {
    return events.find((event) => String(event.id) === String(id));
  },
  create(data) {
    const event = {
      id: nextId++,
      title: data.title,
      date: data.date,
      allDay: Boolean(data.allDay),
      startTime: data.allDay ? '' : (data.startTime || '09:00'),
      endTime: data.allDay ? '' : (data.endTime || '10:00'),
      notes: data.notes || '',
      repeat: data.repeat || 'none',
      color: data.color || COLORS[(nextId - 2) % COLORS.length],
      createdAt: Date.now(),
    };
    events.push(event);
    persist();
    return event;
  },
  update(id, changes) {
    const event = calendarModel.findById(id);
    if (!event) return null;
    Object.assign(event, changes);
    persist();
    return event;
  },
  remove(id) {
    const before = events.length;
    events = events.filter((event) => String(event.id) !== String(id));
    const changed = events.length < before;
    if (changed) persist();
    return changed;
  },
};
