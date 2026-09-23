import { Router } from 'express';
import { tasksController } from './tasks.controller.js';

const router = Router();

// Wraps a handler so thrown errors (including HttpError) reach the
// central error handler instead of crashing the process.
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', catchAsync(tasksController.list));
router.post('/', catchAsync(tasksController.create));
router.patch('/:id/toggle', catchAsync(tasksController.toggle));
router.patch('/:id', catchAsync(tasksController.edit));
router.delete('/:id', catchAsync(tasksController.remove));

export default router;
