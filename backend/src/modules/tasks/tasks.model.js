// In-memory "database". Swap this for a real DB (Postgres, Mongo, etc.)
// later without touching the controller or routes — only the service
// would need to change how it talks to storage.
let tasks = [
  { id: 1, title: 'Set up the project', done: true, createdAt: Date.now() - 86400000 },
  { id: 2, title: 'Wire up the API', done: false, createdAt: Date.now() - 3600000 },
];
let nextId = 3;

export const tasksModel = {
  findAll() {
    return tasks;
  },
  findById(id) {
    return tasks.find((t) => t.id === id);
  },
  create({ title }) {
    const task = { id: nextId++, title, done: false, createdAt: Date.now() };
    tasks.push(task);
    return task;
  },
  update(id, changes) {
    const task = tasksModel.findById(id);
    if (!task) return null;
    Object.assign(task, changes);
    return task;
  },
  remove(id) {
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < before;
  },
};
