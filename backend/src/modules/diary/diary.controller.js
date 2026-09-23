import { diaryService } from './diary.service.js';
export const diaryController = { list(req, res) { res.json(diaryService.list()); }, create(req, res) { res.status(201).json(diaryService.create(req.body.date, req.body)); }, update(req, res) { res.json(diaryService.update(req.params.id, req.body)); }, remove(req, res) { diaryService.remove(req.params.id); res.status(204).end(); } };
