import { tasksModel } from './tasks.model.js';
import { HttpError } from '../../shared/middlewares/errorHandler.js';

const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_CATEGORIES = ['personal', 'study', 'health', 'work', 'self-care'];

function validatePriority(priority) {
  if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
    throw new HttpError(400, `Priority must be one of: ${VALID_PRIORITIES.join(', ')}.`);
  }
}

function validateCategory(category) {
  if (category !== undefined && !VALID_CATEGORIES.includes(category)) {
    throw new HttpError(400, `Category must be one of: ${VALID_CATEGORIES.join(', ')}.`);
  }
}

function validateDueDate(dueDate) {
  if (dueDate !== undefined && dueDate !== null && Number.isNaN(Date.parse(dueDate))) {
    throw new HttpError(400, 'Due date must be a valid date.');
  }
}

// Business rules live here, separate from HTTP concerns (controller)
// and storage concerns (model).
export const tasksService = {
  list() {
    return tasksModel.findAll();
  },

  create({ title, priority, category, dueDate }) {
    const trimmed = (title || '').trim();
    if (!trimmed) {
      throw new HttpError(400, 'Task title cannot be empty.');
    }
    validatePriority(priority);
    validateCategory(category);
    validateDueDate(dueDate);
    return tasksModel.create({ title: trimmed, priority, category, dueDate });
  },

  toggle(id) {
    const task = tasksModel.findById(id);
    if (!task) {
      throw new HttpError(404, 'Task not found.');
    }
    return tasksModel.update(id, { done: !task.done });
  },

  // Generic edit: title, priority, category, notes, and/or dueDate.
  // Only fields actually provided in the request get changed.
  edit(id, { title, priority, category, notes, dueDate }) {
    const task = tasksModel.findById(id);
    if (!task) {
      throw new HttpError(404, 'Task not found.');
    }

    const changes = {};

    if (title !== undefined) {
      const trimmed = title.trim();
      if (!trimmed) {
        throw new HttpError(400, 'Task title cannot be empty.');
      }
      changes.title = trimmed;
    }

    if (priority !== undefined) {
      validatePriority(priority);
      changes.priority = priority;
    }

    if (category !== undefined) {
      validateCategory(category);
      changes.category = category;
    }

    if (notes !== undefined) {
      changes.notes = notes;
    }

    if (dueDate !== undefined) {
      validateDueDate(dueDate);
      changes.dueDate = dueDate;
    }

    return tasksModel.update(id, changes);
  },

  remove(id) {
    const removed = tasksModel.remove(id);
    if (!removed) {
      throw new HttpError(404, 'Task not found.');
    }
  },
};
