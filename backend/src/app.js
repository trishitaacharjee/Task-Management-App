import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './shared/config/index.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import tasksRoutes from './modules/tasks/tasks.routes.js';
import diaryRoutes from './modules/diary/diary.routes.js';
import calendarRoutes from './modules/calendar/calendar.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.use(cors({
  origin: true,
}));

app.use(express.json());

/* API */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', tasksRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/calendar', calendarRoutes);

/* FRONTEND */
const frontendDist = path.resolve(__dirname, '../../frontend/dist');

app.use(express.static(frontendDist));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }

  res.sendFile(path.join(frontendDist, 'index.html'));
});

/* 404 */
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.use(errorHandler);
