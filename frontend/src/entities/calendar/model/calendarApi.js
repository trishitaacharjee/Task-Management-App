import { request } from '../../../shared/api/base';

export const calendarApi = {
  getAll: () => request('/calendar'),
  create: (event) => request('/calendar', { method: 'POST', body: JSON.stringify(event) }),
  update: (id, changes) => request(`/calendar/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  remove: (id) => request(`/calendar/${id}`, { method: 'DELETE' }),
};
