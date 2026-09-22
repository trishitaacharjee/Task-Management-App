import { tasksModel } from './tasks.model.js';
import { HttpError } from '../../shared/middlewares/errorHandler.js';

// Business rules live here, separate from HTTP concerns (controller)
// and storage concerns (model).
export const tasksService = {
  list() {
    return tasksModel.findAll();
  },

  create(title) {
    const trimmed = (title || '').trim();
    if (!trimmed) {
      throw new HttpError(400, 'Task title cannot be empty.');
    }
    return tasksModel.create({ title: trimmed });
  },

  toggle(id) {
    const task = tasksModel.findById(id);
    if (!task) {
      throw new HttpError(404, 'Task not found.');
    }
    return tasksModel.update(id, { done: !task.done });
  },

  remove(id) {
    const removed = tasksModel.remove(id);
    if (!removed) {
      throw new HttpError(404, 'Task not found.');
    }
  },
};
