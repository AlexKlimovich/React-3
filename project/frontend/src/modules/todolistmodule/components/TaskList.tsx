import { memo } from 'react';
import type { TaskListProps } from '@/pages/todolist/types/types';
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
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

export default TaskList;
