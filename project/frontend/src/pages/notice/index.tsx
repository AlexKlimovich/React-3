import './notice.css';
import { NoticePageModule } from '@/modules/noticemodule';

export function NoticePage() {
  return (
    <div className="notice-page">
      <NoticePageModule />
      <div
        className="todolist-widget"
        style={{
          position: 'absolute',
          left: widgetPos.left,
          top: widgetPos.top,
        }}
      >
        <div className="widget-header">
          <h3>📝 Задачи</h3>
        </div>
        <div className="widget-body">
          <ToDoList />
        </div>
      </div>
    </div>
  );
}
