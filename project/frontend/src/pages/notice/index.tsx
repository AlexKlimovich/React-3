import './notice.css';
import { useCallback, useEffect, useState } from 'react';
import type { BaseNotice } from './types';
import { Notice } from './components/notice/mainNotice';
import { NoticesStore } from './services/localStorage';
import { type Coords } from './components/notice/useDragndrop';
import { ToDoList } from '@/pages/todolist';
import { useDragndrop } from './components/notice/useDragndrop';
// import ThemeToggle from '@/components/ThemeToggle';

export function NoticePage() {
  const [syncNoticeStorage] = useState<NoticesStore>(() => new NoticesStore());
  const [widgetPos, setWidgetPos] = useState({ left: 20, top: 100 });
  const [notices, setNotices] = useState<BaseNotice[]>(
    syncNoticeStorage.notices,
  );

  const handleUpdatePosition = useCallback(
    (id: BaseNotice['id'], position: Coords) => {
      console.log(position); // TODO: почему undefined left/top при блуре на текстарею

      setNotices((prevNotices) =>
        prevNotices.map((ntc) => {
          if (ntc.id === id) {
            return {
              ...ntc,
              ...position,
            };
          }
          return ntc;
        }),
      );
    },
    [],
  );

  const handleAdd = () => {
    const title = prompt('Type name of notice title') || `Name_${Date.now()}`;
    setNotices((prevNotices) => [
      ...prevNotices,
      {
        content: '',
        id: Date.now().toString(),
        left: 20,
        top: 20,
        title,
      },
    ]);
  };

  const handleRemove = (inputId: BaseNotice['id']) => {
    setNotices((prevNotices) => prevNotices.filter(({ id }) => id !== inputId));
  };

  const handleBlur = (inputId: BaseNotice['id'], value: string) => {
    setNotices((prevNotices) =>
      prevNotices.map((ntc) => {
        if (ntc.id === inputId) {
          return {
            ...ntc,
            content: value,
          };
        }
        return ntc;
      }),
    );
  };

  useEffect(() => {
    syncNoticeStorage.sync(notices);
  }, [notices, syncNoticeStorage]);

  const handleWidgetDrag = (pos: { left: number; top: number }) => {
    setWidgetPos(pos);
  };
  const { setElement: setWidgetRef } = useDragndrop(handleWidgetDrag);
  return (
    <div className="notice-page">
      <button
        className="notice-add-btn"
        style={{
          padding: 4,
          cursor: 'pointer',
        }}
        onClick={handleAdd}
      >
        + Добавить заметку
      </button>

      {notices.map((ntc) => (
        <Notice
          key={ntc.id}
          id={ntc.id}
          title={ntc.title}
          content={ntc.content}
          left={ntc.left}
          top={ntc.top}
          onCardRemove={handleRemove}
          onTextBlur={handleBlur}
          onDragEnd={handleUpdatePosition}
        />
      ))}

      <div
        ref={setWidgetRef}
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
