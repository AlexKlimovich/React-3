import type { Point } from '../types';
import { PointItem } from './PointItem';

interface Props {
  points: Point[];
  selectedPointId: string | undefined;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PointList({
  points,
  selectedPointId,
  onSelect,
  onToggleFavorite,
  onDelete,
}: Props) {
  if (points.length === 0) return null;

  return (
    <div className="scroll-wrapper" style={{ display: 'block' }}>
      <div className="resultField" id="interestList">
        {points.map((point) => (
          <PointItem
            key={point.id}
            point={point}
            isSelected={selectedPointId === point.id}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
