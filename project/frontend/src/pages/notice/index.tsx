import './notice.css';
import { NoticePageModule } from '@/modules/noticemodule';
import { ToDoListModule } from '@/modules/todolistmodule';
function NoticePage() {
  return (
    <div className="notice-page">
      <NoticePageModule />
      <div
        className="todolist-widget"
        style={{
          position: 'absolute',
        }}
      >
        <div className="widget-header">
          <h3>📝 Задачи</h3>
        </div>
        <div className="widget-body">
          <ToDoListModule />
        </div>
      </div>
    </div>
  );
}

export default NoticePage;
