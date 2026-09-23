import { request } from '../../../shared/api/base';

// All HTTP calls concerning the "task" entity live in one place.
// Features (create-task, toggle-task, edit-task, task-notes, delete-task)
// import from here rather than calling fetch directly.
export const taskApi = {
  getAll: () => request('/tasks'),
  create: ({ title, priority, category, dueDate }) =>
    request('/tasks', { method: 'POST', body: JSON.stringify({ title, priority, category, dueDate }) }),
  toggle: (id) => request(`/tasks/${id}/toggle`, { method: 'PATCH' }),
  edit: (id, changes) => request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};
