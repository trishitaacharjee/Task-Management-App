import { tasksService } from './tasks.service.js';

// Controllers only translate HTTP <-> service calls. No business logic here.
export const tasksController = {
  list(req, res) {
    res.json(tasksService.list());
  },

  create(req, res) {
    const task = tasksService.create(req.body.title);
    res.status(201).json(task);
  },

  toggle(req, res) {
    const id = Number(req.params.id);
    const task = tasksService.toggle(id);
    res.json(task);
  },

  remove(req, res) {
    const id = Number(req.params.id);
    tasksService.remove(id);
    res.status(204).end();
  },
};
