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
  onAdd: (text: string, priority: Priority) => void;
};

export interface Task {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
  createdAt: string;
}

export interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const PRIORITY_LABELS = {
  high: '🔴 Высокий',
  medium: '🟡 Средний',
  low: '🟢 Низкий',
} as const;

export type Priority = keyof typeof PRIORITY_LABELS;
