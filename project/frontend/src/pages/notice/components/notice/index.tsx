import type { BaseNotice } from '@/pages/notice/types';
import { style } from './style';
import {
  useDragndrop,
  type Coords,
} from '@/pages/notice/components/notice/useDragndrop';
import { useThemeContext } from '@/pages/notice/contexts/ThemeContext';

type Props = BaseNotice & {
  onCardRemove: (id: string) => void;
  onTextBlur: (id: string, value: string) => void;
  onDragEnd: (id: string, coords: Coords) => void;
};

const RemoveButton = ({
  id,
  onCardRemove,
}: Pick<Props, 'onCardRemove' | 'id'>) => {
  const theme = useThemeContext();
  console.log(theme);

  return <button onClick={() => onCardRemove(id)}>X</button>;
};

export const Notice = (props: Props) => {
  const { id, title, content, left, top, onCardRemove, onTextBlur, onDragEnd } =
    props;

  const { setElement } = useDragndrop((coords) => onDragEnd(id, coords));

  return (
    <div style={{ ...style.card, top, left }} ref={setElement}>
      <div style={style.title}>
        <h4 style={style.h4}>{title}</h4>
        <RemoveButton id={id} onCardRemove={onCardRemove} />
      </div>
      <textarea
        defaultValue={content}
        onMouseDown={(e) => e.stopPropagation()}
        onBlur={({ target: { value } }) => {
          onTextBlur(id, value);
        }}
        style={style.textarea}
      />
    </div>
  );
};
