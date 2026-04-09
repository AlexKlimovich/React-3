import { memo } from 'react';
import type { Task, Priority } from '@/modules/todolistmodule/types/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onEdit: (task: Task) => void;
  editingTaskId: number | null;
}

const TaskList = memo(function TaskList({
  tasks,
  onDelete,
  onStatusChange,
  onPriorityChange,
  onEdit,
  editingTaskId,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Задач пока нет. Добавьте первую! 👆</p>;
  }

  return (
    <ul className="task-list-ul">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          isEditing={editingTaskId === task.id}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
});

export default TaskList;
