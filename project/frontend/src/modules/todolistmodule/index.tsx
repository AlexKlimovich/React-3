import './ToDoList.css';
import TaskForm from './components/TaskForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Priority, Task } from '@/modules/todolistmodule/types/types';
import { TasksStorage } from '@/services/ls/localStorage';
import TaskList from './components/TaskList';
import { Analytics } from '@/modules/todolistmodule/components/Analytics';

export function ToDoListModule() {
  const [syncTaskStorage] = useState<TasksStorage>(() => new TasksStorage());
  const [savedTasks, setSavedTasks] = useState<Task[]>(syncTaskStorage.tasks);

  const listRef = useRef<HTMLElement>(null);

  const addTask = useCallback(
    (text: string, priority: Priority) => {
      setSavedTasks((prev: Task[]) => [
        {
          id: Date.now(),
          text,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [setSavedTasks],
  );

  const toggleTask = useCallback(
    (id: number) => {
      setSavedTasks((prev: Task[]) =>
        prev.map((task) =>
          task.id === id ? { ...task, done: !task.completed } : task,
        ),
      );
    },
    [setSavedTasks],
  );

  const deleteTask = useCallback(
    (id: number) => {
      setSavedTasks((prev: Task[]) => prev.filter((task) => task.id !== id));
    },
    [setSavedTasks],
  );

  useEffect(() => {
    syncTaskStorage.sync<Task[]>(savedTasks);
  }, [savedTasks, syncTaskStorage]);

  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">✅ Todo App</h1>
        <div className="header-actions">
          {/* <button className="scroll-btn" onClick={scrollToList}>
            ↓ К задачам
          </button> */}
          {/* <ThemeToggle /> */}
        </div>
      </header>

      <main className="main">
        <section className="form-section">
          <TaskForm onAdd={addTask} />
        </section>

        <Analytics tasks={savedTasks} />
        <section className="list-section" ref={listRef}>
          <h2 className="section-title">📝 Задачи</h2>
          <TaskList
            tasks={savedTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </main>
    </div>
  );
}
