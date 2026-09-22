import express from 'express';
import cors from 'cors';
import { config } from './shared/config/index.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';
import tasksRoutes from './modules/tasks/tasks.routes.js';

export const app = express();

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', tasksRoutes);

// 404 for anything unmatched
app.use((req, res) => res.status(404).json({ error: 'Not found.' }));

// Must be registered last: catches errors from every route above.
app.use(errorHandler);
