# Focus — FSD task manager

A minimal full-stack demo: **React frontend structured with Feature-Sliced Design (FSD)** talking to a **Node/Express REST API**.

```
fsd-app/
├── backend/     Express API (feature-based modules)
└── frontend/    React app (Feature-Sliced Design)
```

## Running it

**Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev        # http://localhost:4000
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev         # http://localhost:5173
```

Open http://localhost:5173 — the app talks to the API for all task data (nothing is stored in the browser).

## Frontend: Feature-Sliced Design

FSD organizes code by **what it does for the user**, not by file type. Layers are ordered from generic to specific, and each layer may only import from layers below it:

```
app        → app-wide setup: root component, global styles, providers
pages      → one page = one route; composes widgets/features
widgets    → self-contained UI blocks made of entities + features
features   → one user action each (create-task, toggle-task, delete-task)
entities   → core business concepts (task) — data shape, API calls, display
shared     → reusable, business-agnostic: UI kit, API client, config
```

Example: `TasksPage` doesn't know how a task is toggled — it just renders
`<TaskList>` (a widget), which composes the `task` entity's `<TaskItem>`
with the `toggle-task` and `delete-task` features. Each slice has a single
job, so growing the app usually means **adding a new slice**, not editing
five existing files.

### Adding a new feature
1. Decide which layer it belongs to (usually `features/` or `entities/`).
2. Create a folder named after the action, e.g. `features/edit-task/`.
3. Export only what other layers need via that folder's `index.js`.

## Backend: feature-based modules

The API mirrors the same idea in a simpler form — each module owns one
resource end-to-end:

```
src/
├── app.js                     Express app: middleware + route mounting
├── server.js                  Starts the HTTP server
├── modules/
│   └── tasks/
│       ├── tasks.routes.js     URL → controller mapping
│       ├── tasks.controller.js HTTP request/response only
│       ├── tasks.service.js    Business rules & validation
│       └── tasks.model.js      Data access (in-memory here)
└── shared/
    ├── config/                 Env vars
    └── middlewares/            Error handling, etc.
```

To add a resource (e.g. "projects"), copy the shape of `modules/tasks/`
into `modules/projects/` and mount its router in `app.js`.

### API

| Method | Path                | Body            | Description          |
|--------|---------------------|-----------------|-----------------------|
| GET    | `/api/tasks`         | —               | List all tasks        |
| POST   | `/api/tasks`         | `{ title }`     | Create a task          |
| PATCH  | `/api/tasks/:id/toggle` | —            | Toggle done state       |
| DELETE | `/api/tasks/:id`     | —               | Delete a task           |

## Swapping in a real database

Only `tasks.model.js` talks to storage. Replace its in-memory array with
calls to Postgres/Mongo/etc. — `tasks.service.js`, the controller, and the
whole frontend stay untouched.
