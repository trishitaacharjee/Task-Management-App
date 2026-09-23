import { calendarService } from './calendar.service.js';

export const calendarController = {
  list(req, res) { res.json(calendarService.list()); },
  create(req, res) { res.status(201).json(calendarService.create(req.body)); },
  update(req, res) { res.json(calendarService.update(req.params.id, req.body)); },
  remove(req, res) { calendarService.remove(req.params.id); res.status(204).end(); },
};
