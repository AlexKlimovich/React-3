import './ToDoList.css';
import ThemeToggle from './components/ThemeToggle';
import TaskForm from './components/TaskForm';
import { useCallback, useRef } from 'react';
import type { Priority, Task } from './types/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskList from './components/TaskList';

export function ToDoList() {
  const [savedTasks, setSavedTasks] = useLocalStorage<Task[]>('tasks', []);
  const listRef = useRef<HTMLElement>(null);

  const addTask = useCallback(
    (text: string, priority: Priority) => {
      setSavedTasks((prev: Task[]) => [
        {
          id: Date.now(),
          text,
          priority,
          done: false,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [setSavedTasks],
  );

  // dispatch({
  //   type: 'ADD',
  //   payload: {
  //     id: Date.now(),
  //     text,
  //     priority,
  //     done: false,
  //     createdAt: new Date().toISOString(),
  // },
  // });

  const toggleTask = useCallback(
    (id: number) => {
      setSavedTasks((prev: Task[]) =>
        prev.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task,
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

  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">✅ Todo App</h1>
        <div className="header-actions">
          {/* <button className="scroll-btn" onClick={scrollToList}>
            ↓ К задачам
          </button> */}
          <ThemeToggle />
        </div>
      </header>

      <main className="main">
        <section className="form-section">
          <TaskForm onAdd={addTask} />
        </section>

        {/* <Analytics tasks={tasks} />
         */}
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

export default ToDoList;
