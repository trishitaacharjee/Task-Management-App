import { useState } from 'react';
import { taskApi, parseTaskInput } from '../../entities/task';
import { Input } from '../../shared/ui/Input';
import { PlusIcon, MicIcon } from '../../shared/ui/icons';
import { useVoiceInput } from '../voice-input';
import { playTaskAdded } from '../../shared/lib/sound';

export function CreateTaskForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { listening, transcribing, progress, supported, error: voiceError, start, stop } = useVoiceInput({
    onResult: (transcript) => setTitle((prev) => (prev ? `${prev} ${transcript}` : transcript)),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || submitting || listening || transcribing) return;
    setSubmitting(true);
    setError(null);
    try {
      const { title: cleanTitle, dueDate } = parseTaskInput(title);
      const task = await taskApi.create({ title: cleanTitle, priority: 'medium', dueDate });
      setTitle('');
      onCreated(task);
      if (localStorage.getItem('toki-sound') !== 'false') void playTaskAdded();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="create-task" onSubmit={handleSubmit}>
      {(listening || transcribing) && (
        <div className="voice-overlay" role="status" aria-live="polite">
          <div className="voice-overlay__pulse"><MicIcon width={30} height={30} /></div>
          <p className="voice-overlay__label">{listening ? 'Listening…' : 'Transcribing…'}</p>
          <div className="voice-overlay__wave" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          {transcribing && <div className="voice-overlay__progress">Loading local voice model {progress ? `${progress}%` : '…'}</div>}
          <p className="voice-overlay__hint">Say your task, for example: “Do hair wash at 6 PM”</p>
          {listening && <button type="button" className="voice-overlay__cancel" onClick={stop}>Stop recording</button>}
        </div>
      )}
      <div className="create-task__row">
        <div className="create-task__field">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What do you need to do?" aria-label="New task title" />
          {supported && <button type="button" className="create-task__mic" onClick={listening ? stop : start} aria-label="Add task by voice" title="Add task by voice" disabled={transcribing}><MicIcon width={18} height={18} /></button>}
        </div>
        <button type="submit" className="create-task__submit" disabled={submitting || listening || transcribing}><PlusIcon className="create-task__submit-icon" /> {submitting ? 'Adding…' : 'Add Task'}</button>
      </div>
      {!supported && <p className="create-task__error">This browser cannot record audio. Please use a modern browser with microphone support.</p>}
      {voiceError && <p className="create-task__error">{voiceError}</p>}
      {error && <p className="create-task__error">{error}</p>}
    </form>
  );
}
