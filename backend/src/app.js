import express from 'express';
import cors from 'cors';
import { config } from './shared/config/index.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import tasksRoutes from './modules/tasks/tasks.routes.js';
import diaryRoutes from './modules/diary/diary.routes.js';
import calendarRoutes from './modules/calendar/calendar.routes.js';

export const app = express();
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const allowed = [config.clientOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'];
    callback(null, allowed.includes(origin));
  },
}));
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', tasksRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/calendar', calendarRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found.' }));
app.use(errorHandler);
