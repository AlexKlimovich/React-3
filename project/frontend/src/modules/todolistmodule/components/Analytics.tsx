import { useMemo } from 'react';
import type { TaskStats } from '@/modules/todolistmodule/types/types';
import type { Task } from '@/modules/todolistmodule/types/types';

interface AnalyticsProps {
  tasks: Task[];
}

export function Analytics({ tasks }: AnalyticsProps) {
  const stats: TaskStats = useMemo(() => {
    const initialStats: TaskStats = {
      total: 0,
      completed: 0,
      pending: 0,
      byPriority: { high: 0, medium: 0, low: 0 },
      mostPopularPriority: '—',
    };

    if (!tasks || tasks.length === 0) {
      return initialStats;
    }

    const result = tasks.reduce((acc, task) => {
      acc.total += 1;

      if (task.completed) {
        acc.completed += 1;
      }

      if (task.priority === 'high') acc.byPriority.high += 1;
      if (task.priority === 'medium') acc.byPriority.medium += 1;
      if (task.priority === 'low') acc.byPriority.low += 1;

      return acc;
    }, initialStats);

    result.pending = result.total - result.completed;

    const priorities = Object.entries(result.byPriority) as [
      keyof typeof result.byPriority,
      number,
    ][];
    const maxPriority = priorities.reduce((max, current) =>
      current[1] > max[1] ? current : max,
    );

    if (result.total > 0) {
      result.mostPopularPriority = maxPriority[0];
    }

    return result;
  }, [tasks]);

  return (
    <div className="analytics-block">
      <h3>📊 Статистика задач</h3>

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-label">Всего:</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Выполнено:</span>
          <span className="stat-value completed">{stats.completed}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">В процессе:</span>
          <span className="stat-value pending">{stats.pending}</span>
        </div>
      </div>

      <div className="stats-priority">
        <h4>По приоритетам:</h4>
        <ul>
          <li>🔴 Высокий: {stats.byPriority.high}</li>
          <li>🟡 Средний: {stats.byPriority.medium}</li>
          <li>🟢 Низкий: {stats.byPriority.low}</li>
        </ul>
      </div>

      <div className="stats-insight">
        <p>
          💡 Самый популярный приоритет:
          <strong> {stats.mostPopularPriority}</strong>
        </p>
      </div>
    </div>
  );
}
