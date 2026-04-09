import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';
export type ThemeProviderProps = {
  children: ReactNode;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export type TaskFormProps = {
  onAdd: (text: string, desc: string, priority: Priority) => void;
};

export interface Task {
  id: number;
  text: string;
  desc: string;
  completed: boolean;
  status: Status;
  priority: Priority;
  createdAt: string;
}

export interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onDescriptionChange?: (id: number, newDescription: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onDescriptionChange?: (id: number, description: string) => void;
}

export const PRIORITY_LABELS = {
  high: '🔴 Высокий',
  medium: '🟡 Средний',
  low: '🟢 Низкий',
} as const;

export const STATUS_LABELS = {
  new: 'Новая задача',
  processing: 'В работе',
  checking: 'На проверке',
  correction: 'На доработке',
  complited: 'Завершено',
} as const;

export type Priority = keyof typeof PRIORITY_LABELS;

export type Status = keyof typeof STATUS_LABELS;

export interface TaskStats {
  total: number;
  new: number;
  processing: number;
  checking: number;
  correction: number;
  completed: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  mostPopularPriority: string;
}
