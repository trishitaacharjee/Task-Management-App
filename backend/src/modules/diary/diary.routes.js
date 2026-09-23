import { Router } from 'express';
import { diaryController } from './diary.controller.js';
const router = Router();
const catchAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
router.get('/', catchAsync(diaryController.list));
router.post('/', catchAsync(diaryController.create));
router.patch('/:id', catchAsync(diaryController.update));
router.delete('/:id', catchAsync(diaryController.remove));
export default router;
