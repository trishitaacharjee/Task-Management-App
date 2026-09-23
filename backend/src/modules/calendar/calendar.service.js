import { calendarModel } from './calendar.model.js';
import { HttpError } from '../../shared/middlewares/errorHandler.js';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const VALID_REPEAT = ['none', 'yearly'];
const VALID_COLORS = ['pink', 'lavender', 'mint', 'sky', 'peach'];

function validateDate(date) {
  if (!DATE_RE.test(date)) throw new HttpError(400, 'Event date must be in YYYY-MM-DD format.');
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) throw new HttpError(400, 'Event date is invalid.');
}

function validate(data) {
  if (data.title !== undefined && data.title.trim().length > 120) throw new HttpError(400, 'Event title is limited to 120 characters.');
  if (data.notes !== undefined && data.notes.length > 5000) throw new HttpError(400, 'Event notes are limited to 5000 characters.');
  if (data.startTime && !TIME_RE.test(data.startTime)) throw new HttpError(400, 'Start time must use HH:MM format.');
  if (data.endTime && !TIME_RE.test(data.endTime)) throw new HttpError(400, 'End time must use HH:MM format.');
  if (data.repeat !== undefined && !VALID_REPEAT.includes(data.repeat)) throw new HttpError(400, 'Repeat must be none or yearly.');
  if (data.color !== undefined && !VALID_COLORS.includes(data.color)) throw new HttpError(400, 'Invalid event color.');
}

function normalize(payload, existing = {}) {
  const allDay = payload.allDay !== undefined ? Boolean(payload.allDay) : Boolean(existing.allDay);
  return {
    title: payload.title !== undefined ? payload.title.trim() : existing.title,
    date: payload.date !== undefined ? payload.date : existing.date,
    allDay,
    startTime: allDay ? '' : (payload.startTime !== undefined ? payload.startTime : (existing.startTime || '09:00')),
    endTime: allDay ? '' : (payload.endTime !== undefined ? payload.endTime : (existing.endTime || '10:00')),
    notes: payload.notes !== undefined ? payload.notes : (existing.notes || ''),
    repeat: payload.repeat !== undefined ? payload.repeat : (existing.repeat || 'none'),
    color: payload.color !== undefined ? payload.color : (existing.color || 'pink'),
  };
}

export const calendarService = {
  list() {
    return calendarModel.findAll();
  },
  create(data = {}) {
    const title = (data.title || '').trim();
    if (!title) throw new HttpError(400, 'Event title cannot be empty.');
    validateDate(data.date);
    validate(data);
    const event = normalize({ ...data, title });
    if (!event.allDay && event.endTime <= event.startTime) throw new HttpError(400, 'End time must be after start time.');
    return calendarModel.create(event);
  },
  update(id, data = {}) {
    const existing = calendarModel.findById(id);
    if (!existing) throw new HttpError(404, 'Calendar event not found.');
    validate(data);
    const changes = normalize(data, existing);
    if (!changes.title) throw new HttpError(400, 'Event title cannot be empty.');
    validateDate(changes.date);
    if (!changes.allDay && changes.endTime <= changes.startTime) throw new HttpError(400, 'End time must be after start time.');
    return calendarModel.update(id, changes);
  },
  remove(id) {
    if (!calendarModel.remove(id)) throw new HttpError(404, 'Calendar event not found.');
  },
};
