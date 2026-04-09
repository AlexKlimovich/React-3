import { memo, useState } from 'react';
import {
  type Task,
  type Priority,
  PRIORITY_LABELS,
  STATUS_LABELS,
} from '../types/types';

interface TaskItemProps {
  task: Task;
  index: number;
  isEditing: boolean;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onEdit: (task: Task) => void;
}

const STATUS_BADGE: Record<string, string> = {
  new:        'badge-new',
  processing: 'badge-processing',
  checking:   'badge-checking',
  correction: 'badge-correction',
  complited:  'badge-complited',
};

const TaskItem = memo(function TaskItem({
  task,
  index,
  isEditing,
  onDelete,
  onStatusChange,
  onPriorityChange,
  onEdit,
}: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);

  const statusClass = `status-${task.status}`;
  const badgeClass  = STATUS_BADGE[task.status] ?? 'badge-new';

  return (
    <li
      className={[
        'task-item',
        `priority-${task.priority}`,
        statusClass,
        task.completed ? 'done' : '',
        expanded ? 'expanded' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* ── Header ── */}
      <div className="task-header" onClick={() => setExpanded((v) => !v)}>
        <div className="task-title-area">
          <span className="task-num">Задача №{index + 1}:</span>
          <span className="task-text">{task.text}</span>
          <span className={`status-badge ${badgeClass}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>
        <span className="task-chevron">{expanded ? '▲' : '▼'}</span>
      </div>

      {/* ── Body ── */}
      <div className="task-body">
        <div className="task-body-controls">
          {/* Status dropdown */}
          <select
            className="task-status"
            value={task.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(task.id, e.target.value);
            }}
          >
            {(Object.entries(STATUS_LABELS) as [string, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          {/* Priority dropdown */}
          <select
            className="task-priority-select"
            value={task.priority}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              e.stopPropagation();
              onPriorityChange(task.id, e.target.value as Priority);
            }}
          >
            {(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(([val, label]) => (
              <option key={val} value={val}>{label}</option>
            ))}
          </select>

          <div className="task-actions">
            <button
              className={`icon-btn${isEditing ? ' active' : ''}`}
              title="Редактировать"
              onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            >
              ✏️
            </button>
            <button
              className="icon-btn delete"
              title="Удалить"
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
            >
              🗑️
            </button>
          </div>
        </div>

        <div className="task-desc-row">
          <span className="task-desc-label">Описание:</span>
          {task.desc}
        </div>

        <div className="task-meta">
          <span>{new Date(task.createdAt).toLocaleDateString('ru-RU')}</span>
        </div>
      </div>
    </li>
  );
});

export default TaskItem;
