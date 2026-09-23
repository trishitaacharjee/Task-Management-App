# Toki — Task Manager, Diary & Productivity App

Toki is a soft, pastel productivity app with tasks, notes, diary entries, calendar, stats, settings, sound effects, notifications and local browser voice input.

## Features
- Reference-style compact pastel task cards
- Different pastel color per task
- Cute SVG animal stickers
- Task notes that expand inside the task card
- Three-dot task menu with Notes/Delete
- Toki-styled delete confirmation modal
- Multiple diary entries per day with persistent JSON storage
- Compact calendar and task statistics
- Dark mode, sound effects and notifications
- Voice input using `MediaRecorder` + local Whisper through Transformers.js
- No OpenAI API key required for voice

## Run locally

### Backend
```powershell
cd backend
npm install
npm run dev
```

### Frontend
Open another terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Voice input
The first voice transcription downloads and caches the local Whisper model. No paid speech API key is needed. Allow microphone access for `localhost` in the browser.

## Data
The backend stores tasks and diary entries in `backend/data/tasks.json` and `backend/data/diary.json`.
