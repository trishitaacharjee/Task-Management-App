import { jsonStore } from '../../shared/storage/jsonStore.js';
let entries = jsonStore.read('diary', []);
let nextId = entries.reduce((max, e) => Math.max(max, Number(e.id) || 0), 0) + 1;
const persist = () => jsonStore.write('diary', entries);
export const diaryModel = {
  findAll() { return [...entries].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)); },
  findById(id) { return entries.find((e) => String(e.id) === String(id)) || null; },
  create({ date, mood, text }) { const entry = { id: nextId++, date, mood: mood ?? null, text: text ?? '', createdAt: Date.now(), updatedAt: Date.now() }; entries.push(entry); persist(); return entry; },
  update(id, changes) { const entry = diaryModel.findById(id); if (!entry) return null; Object.assign(entry, changes, { updatedAt: Date.now() }); persist(); return entry; },
  remove(id) { const before = entries.length; entries = entries.filter((e) => String(e.id) !== String(id)); const changed = entries.length < before; if (changed) persist(); return changed; },
};
