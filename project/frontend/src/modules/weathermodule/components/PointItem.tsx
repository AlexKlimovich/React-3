import type { Point } from '../types';

interface Props {
  point: Point;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PointItem({
  point,
  isSelected,
  onSelect,
  onToggleFavorite,
  onDelete,
}: Props) {
  return (
    <div
      className={`point-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(point.id)}
    >
      <div className="point-content">
        <p>
          ID точки: <span className="resultText">{point.id}</span>
        </p>
        <p>
          Название точки: <span className="resultText">{point.name}</span>
        </p>
        <p>
          Адрес точки: <span className="resultText">{point.address}</span>
        </p>
        <p>
          Координаты: <span className="resultText">{point.coords}</span>
        </p>
        <p>
          Рейтинг: <span className="resultText">{point.rating}</span> ⭐
        </p>
      </div>

      <button
        className={`favorite-btn ${point.favorite ? 'selected' : ''}`}
        title="В избранное"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(point.id);
        }}
      >
        Избранное
      </button>

      <button
        className="trashBtn"
        title="Удалить"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(point.id);
        }}
      />
    </div>
  );
}
