import { memo, useState, useEffect } from 'react';
import type { Task, Priority } from '../types/types';
import { PRIORITY_LABELS } from '../types/types';

interface EditPanelProps {
  task: Task;
  onSave: (
    id: number,
    newText: string,
    newDesc: string,
    newPriority: Priority,
  ) => void;
  onCancel: () => void;
}

export const EditPanel = memo(function EditPanel({
  task,
  onSave,
  onCancel,
}: EditPanelProps) {
  const [text, setText] = useState(task.text);
  const [desc, setDesc] = useState(task.desc);
  const [priority, setPriority] = useState<Priority>(task.priority);

  useEffect(() => {
    setText(task.text);
    setDesc(task.desc);
    setPriority(task.priority);
  }, [task.id]);

  const handleSave = () => {
    const trimText = text.trim();
    const trimDesc = desc.trim();
    if (!trimText) {
      alert('Введите название задачи!');
      return;
    }
    if (!trimDesc) {
      alert('Введите описание задачи!');
      return;
    }
    onSave(task.id, trimText, trimDesc, priority);
  };

  return (
    <aside className="edit-panel">
      <h2 className="edit-panel-title">Редактирование задачи</h2>

      <div className="edit-field">
        <label className="edit-label">Название задачи:</label>
        <input
          className="edit-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      </div>

      <div className="edit-field">
        <label className="edit-label">Описание задачи:</label>
        <textarea
          className="edit-textarea"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div className="edit-field">
        <label className="edit-label">Приоритет:</label>
        <select
          className="edit-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(
            ([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="edit-actions">
        <button className="btn-save" onClick={handleSave}>
          Сохранить
        </button>
        <button className="btn-cancel" onClick={onCancel}>
          Отменить
        </button>
      </div>
    </aside>
  );
});
