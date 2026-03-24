import { useEffect, useRef, useState } from 'react';

export type Coords = {
  left: number;
  top: number;
};

type HandleDragEnd = (coords: Coords) => void;

export const useDragndrop = (onDragEnd: HandleDragEnd) => {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const dragEndCbRef = useRef<HandleDragEnd>(null);

  useEffect(() => {
    dragEndCbRef.current = onDragEnd;
  }, [onDragEnd]);

  useEffect(() => {
    if (!target) return;

    const acMain = new AbortController();
    const acHandlers = new AbortController();

    target.addEventListener(
      'mousedown',
      ({ clientX, clientY }) => {
        target.style.zIndex = '1000';

        const elemCoords = target.getBoundingClientRect();
        const offsetX = clientX - elemCoords.x;
        const offsetY = clientY - elemCoords.y;

        let top: number = elemCoords.y;
        let left: number = elemCoords.x;

        const handlemouseMove = (event: MouseEvent) => {
          const { clientX, clientY } = event;
          top = clientY - offsetY;
          left = clientX - offsetX;
          target.style.top = `${top}px`;
          target.style.left = `${left}px`;
        };

        const clean = () => {
          target.style.zIndex = '0';
          target.removeEventListener('mousemove', handlemouseMove);
          target.removeEventListener('mouseup', clean);
          target.removeEventListener('mouseleave', clean);
          dragEndCbRef.current?.({ left, top });
        };

        target.addEventListener('mouseleave', clean, {
          signal: acHandlers.signal,
        });
        target.addEventListener('mousemove', handlemouseMove, {
          signal: acHandlers.signal,
        });
        target.addEventListener('mouseup', clean, {
          signal: acHandlers.signal,
        });
      },
      {
        signal: acMain.signal,
      },
    );

    return () => {
      acMain.abort();
      acHandlers.abort();
    };
  }, [target]);

  return {
    setElement: setTarget,
  };
};
