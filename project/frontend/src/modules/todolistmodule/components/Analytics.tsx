import { useMemo } from 'react';
import type { TaskStats, Task } from '@/modules/todolistmodule/types/types';

interface AnalyticsProps {
  tasks: Task[];
  onDeleteAll?: () => void;
  onDeleteCompleted?: () => void;
}

export function Analytics({ tasks, onDeleteAll, onDeleteCompleted }: AnalyticsProps) {
  const stats: TaskStats = useMemo(() => {
    const init: TaskStats = {
      total: 0, new: 0, processing: 0, checking: 0,
      correction: 0, completed: 0,
      byPriority: { high: 0, medium: 0, low: 0 },
      mostPopularPriority: '—',
    };
    if (!tasks || tasks.length === 0) return init;

    const result = tasks.reduce((acc, task) => {
      acc.total += 1;
      if (task.priority === 'high')   acc.byPriority.high   += 1;
      if (task.priority === 'medium') acc.byPriority.medium += 1;
      if (task.priority === 'low')    acc.byPriority.low    += 1;
      switch (task.status) {
        case 'new':        acc.new        += 1; break;
        case 'processing': acc.processing += 1; break;
        case 'checking':   acc.checking   += 1; break;
        case 'correction': acc.correction += 1; break;
        case 'complited':  acc.completed  += 1; break;
        default:           acc.new        += 1;
      }
      return acc;
    }, init);

    const priorities = Object.entries(result.byPriority) as [keyof typeof result.byPriority, number][];
    const max = priorities.reduce((m, c) => (c[1] > m[1] ? c : m));
    if (result.total > 0) result.mostPopularPriority = max[0];
    return result;
  }, [tasks]);

  const dotRows = [
    { cls: 'dot-total',      label: 'Всего задач',  value: stats.total },
    { cls: 'dot-new',        label: 'Новая задача', value: stats.new },
    { cls: 'dot-processing', label: 'В работе',     value: stats.processing },
    { cls: 'dot-checking',   label: 'На проверке',  value: stats.checking },
    { cls: 'dot-correction', label: 'На доработке', value: stats.correction },
    { cls: 'dot-completed',  label: 'Завершено',    value: stats.completed },
  ];

  return (
    <div className="analytics-block">
      <div className="analytics-header">
        <h3>Список задач</h3>
        {tasks.length > 0 && (
          <div className="analytics-actions">
            <button type="button" className="btn-danger" onClick={onDeleteAll}>
              Удалить все задачи
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={onDeleteCompleted}
              disabled={stats.completed === 0}
            >
              Удалить завершённые
            </button>
          </div>
        )}
      </div>

      <div className="stats-dots">
        {dotRows.map(({ cls, label, value }) => (
          <div className="stat-dot-row" key={cls}>
            <span className={`dot ${cls}`} />
            <span>{label}: {value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
