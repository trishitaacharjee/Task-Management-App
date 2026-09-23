import { jsonStore } from '../../shared/storage/jsonStore.js';
let tasks = jsonStore.read('tasks', []);
let nextId = tasks.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0) + 1;
const COLORS = ['pink', 'lavender', 'mint', 'peach', 'sky'];
const persist = () => jsonStore.write('tasks', tasks);
export const tasksModel = {
  findAll() { return [...tasks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); },
  findById(id) { return tasks.find((t) => String(t.id) === String(id)); },
  create({ title, priority = 'medium', category = 'personal', dueDate = null }) { const task = { id: nextId++, title, done: false, priority, category, notes: '', dueDate, color: COLORS[(nextId - 2) % COLORS.length], createdAt: Date.now() }; tasks.push(task); persist(); return task; },
  update(id, changes) { const task = tasksModel.findById(id); if (!task) return null; Object.assign(task, changes); persist(); return task; },
  remove(id) { const before = tasks.length; tasks = tasks.filter((t) => String(t.id) !== String(id)); const changed = tasks.length < before; if (changed) persist(); return changed; },
};
