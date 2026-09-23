import { Router } from 'express';
import { calendarController } from './calendar.controller.js';

const router = Router();
const catchAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', catchAsync(calendarController.list));
router.post('/', catchAsync(calendarController.create));
router.patch('/:id', catchAsync(calendarController.update));
router.delete('/:id', catchAsync(calendarController.remove));

export default router;
