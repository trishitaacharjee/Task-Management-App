import { diaryModel } from './diary.model.js';
import { HttpError } from '../../shared/middlewares/errorHandler.js';
const VALID_MOODS = ['great', 'good', 'okay', 'low', 'tired'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
function validateDate(date) { if (!DATE_RE.test(date)) throw new HttpError(400, 'Date must be in YYYY-MM-DD format.'); }
function validate({ mood, text }) { if (mood !== undefined && mood !== null && !VALID_MOODS.includes(mood)) throw new HttpError(400, `Mood must be one of: ${VALID_MOODS.join(', ')}.`); if (text !== undefined && text.length > 5000) throw new HttpError(400, 'Entry text is limited to 5000 characters.'); }
export const diaryService = {
  list() { return diaryModel.findAll(); },
  create(date, data) { validateDate(date); validate(data); const text = (data.text ?? '').trim(); if (!text) throw new HttpError(400, 'Diary entry cannot be empty.'); return diaryModel.create({ date, mood: data.mood, text }); },
  update(id, data) { validate(data); const entry = diaryModel.findById(id); if (!entry) throw new HttpError(404, 'Diary entry not found.'); return diaryModel.update(id, { mood: data.mood, text: data.text?.trim() ?? entry.text }); },
  remove(id) { if (!diaryModel.remove(id)) throw new HttpError(404, 'Diary entry not found.'); },
};
