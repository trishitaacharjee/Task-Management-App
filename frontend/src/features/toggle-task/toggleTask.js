import { taskApi } from '../../entities/task';

// A "feature" can be as small as one function — what matters is that it
// owns a single user intention (here: toggling a task's done state).
export async function toggleTask(id) {
  return taskApi.toggle(id);
}
