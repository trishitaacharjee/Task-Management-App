import { request } from '../../../shared/api/base';

export const diaryApi = {
  getAll: () => request('/diary'),
  create: ({ date, mood, text }) => request('/diary', {
    method: 'POST',
    body: JSON.stringify({ date, mood, text }),
  }),
  update: (id, { mood, text }) => request(`/diary/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ mood, text }),
  }),
  remove: (id) => request(`/diary/${id}`, { method: 'DELETE' }),
};
