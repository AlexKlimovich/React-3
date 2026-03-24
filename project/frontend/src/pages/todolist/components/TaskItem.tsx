// TaskItem.tsx
import { memo } from 'react';
import { type TaskItemProps, PRIORITY_LABELS } from '../types/types';

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <li
      className={`task-item ${task.done ? 'done' : ''} priority-${task.priority}`}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text">{task.text}</span>
      <span className="task-priority">{PRIORITY_LABELS[task.priority]}</span>
      <span className="task-date">
        {new Date(task.createdAt).toLocaleDateString('ru-RU')}
      </span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
});

export default TaskItem;
