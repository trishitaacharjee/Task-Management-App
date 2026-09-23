import { AnimalSticker, getTaskStickerType } from '../../shared/ui/AnimalStickers';

// A compact read-only list of today's tasks for the right panel.
export function TodayTasks({ tasks }) {
  return (
    <div className="panel-card">
      <h3 className="panel-card__title">
        <span aria-hidden="true">🗓️</span> Today's Tasks ({tasks.length})
      </h3>

      {tasks.length === 0 ? (
        <p className="today-tasks__empty">Nothing due today. Enjoy the calm! ☁️</p>
      ) : (
        <ul className="today-tasks__list">
          {tasks.map((task) => {
            const time =
              task.dueDate && task.dueDate.length > 10
                ? new Date(task.dueDate).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
                : null;

            return (
              <li key={task.id} className={`today-tasks__row${task.done ? ' today-tasks__row--done' : ''}`}>
                <span className="today-tasks__check" aria-hidden="true" />
                <div className="today-tasks__body">
                  <span className="today-tasks__title">{task.title}</span>
                  {time && <span className="today-tasks__time">{time}</span>}
                </div>
                <span className="today-tasks__sticker" aria-hidden="true">
                  <AnimalSticker type={getTaskStickerType(task)} size={26} />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
