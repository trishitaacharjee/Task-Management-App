import { request } from '../../../shared/api/base';

// All HTTP calls concerning the "task" entity live in one place.
// Features (create-task, toggle-task, delete-task) import from here
// rather than calling fetch directly.
export const taskApi = {
  getAll: () => request('/tasks'),
  create: (title) => request('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  toggle: (id) => request(`/tasks/${id}/toggle`, { method: 'PATCH' }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
};
