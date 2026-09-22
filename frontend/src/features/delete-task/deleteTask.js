import { taskApi } from '../../entities/task';

export async function deleteTask(id) {
  return taskApi.remove(id);
}
