import { memo } from 'react';
import type { TaskListProps } from '@/modules/todolistmodule/types/types';
import TaskItem from './TaskItem';

const TaskList = memo(function TaskList({
  tasks,
  onToggle,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Задач пока нет. Добавьте первую! 👆</p>;
  }

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th className="col-checkbox">Статус</th>
          <th className="col-id">ID</th>
          <th className="col-title">Название</th>
          <th className="col-priority">Приоритет</th>
          <th className="col-due">Дата создания</th>
          <th className="col-actions">Действия</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
});

export default TaskList;
