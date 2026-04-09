import './ToDoList.css';
import TaskForm from './components/TaskForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type Priority,
  type Status,
  type Task,
} from '@/modules/todolistmodule/types/types';
import { TasksStorage } from '@/services/ls/localStorage';
import TaskList from './components/TaskList';
import { Analytics } from '@/modules/todolistmodule/components/Analytics';
import { EditPanel } from './components/EditPanel';

export function ToDoListModule() {
  const [syncTaskStorage] = useState<TasksStorage>(() => new TasksStorage());
  const [savedTasks, setSavedTasks] = useState<Task[]>(syncTaskStorage.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  const isTaskCompleted = useCallback(
    (task: Task) => task.completed || task.status === 'complited',
    [],
  );

  const addTask = useCallback((text: string, desc: string, priority: Priority) => {
    setSavedTasks((prev) => [
      {
        id: Date.now(),
        text, desc, priority,
        status: 'new',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setSavedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: number) => {
    setSavedTasks((prev) => prev.filter((t) => t.id !== id));
    setEditingTask((prev) => (prev?.id === id ? null : prev));
  }, []);

  const changeStatusTask = useCallback((id: number, newStatus: string) => {
    setSavedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus as Status } : t)),
    );
  }, []);

  const changePriorityTask = useCallback((id: number, newPriority: Priority) => {
    setSavedTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: newPriority } : t)),
    );
  }, []);

  const deleteAllTasks = useCallback(() => {
    setSavedTasks([]);
    setEditingTask(null);
  }, []);

  const deleteCompletedTasks = useCallback(() => {
    setSavedTasks((prev) => prev.filter((t) => !isTaskCompleted(t)));
    setEditingTask((prev) => (prev && isTaskCompleted(prev) ? null : prev));
  }, [isTaskCompleted]);

  const handleEditTask = useCallback((task: Task) => {
    setEditingTask((prev) => (prev?.id === task.id ? null : task));
  }, []);

  const handleSaveEdit = useCallback(
    (id: number, newText: string, newDesc: string, newPriority: Priority) => {
      setSavedTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, text: newText, desc: newDesc, priority: newPriority } : t,
        ),
      );
      setEditingTask(null);
    },
    [],
  );

  const handleCancelEdit = useCallback(() => setEditingTask(null), []);

  useEffect(() => {
    syncTaskStorage.sync<Task[]>(savedTasks);
  }, [savedTasks, syncTaskStorage]);

  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="title">Интерактивный список дел</h1>
      </header>

      <main className={`main${editingTask ? ' edit-open' : ''}`}>
        {/* ── Left column ── */}
        <div className="main-left">
          <div className="card">
            <h2 className="form-section-title">Создание задачи</h2>
            <TaskForm onAdd={addTask} />
          </div>

          <div className="card">
            <Analytics
              tasks={savedTasks}
              onDeleteAll={deleteAllTasks}
              onDeleteCompleted={deleteCompletedTasks}
            />
          </div>

          <div className="card" ref={listRef}>
            <section className="list-section">
              <h2 className="section-title">Список задач</h2>
              <TaskList
                tasks={savedTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onStatusChange={changeStatusTask}
                onPriorityChange={changePriorityTask}
                onEdit={handleEditTask}
                editingTaskId={editingTask?.id ?? null}
              />
            </section>
          </div>
        </div>

        {/* ── Right column — edit panel (only when a task is selected) ── */}
        {editingTask && (
          <EditPanel
            task={editingTask}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </main>
    </div>
  );
}
