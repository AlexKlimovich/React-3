import { memo, useRef, useEffect, useState, type FormEvent } from 'react';
import type { TaskFormProps, Priority } from '../types/types.ts';

const TaskForm = memo(function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = text.trim();
    const trimmedDesc = desc.trim();
    if (!trimmedText || !trimmedDesc) return;
    onAdd(trimmedText, trimmedDesc, priority);
    setText('');
    setDesc('');
    setPriority('medium');
    inputRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="task-input"
        type="text"
        placeholder="Новая задача..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        // ref={inputRef}
        className="task-input"
        type="text"
        placeholder="Описание задачи..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select
        className="priority-select"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="high">🔴 Высокий</option>
        <option value="medium">🟡 Средний</option>
        <option value="low">🟢 Низкий</option>
      </select>
      <button className="add-btn" type="submit">
        Добавить
      </button>
    </form>
  );
});

export default TaskForm;
