import { useState, useEffect, type FormEvent } from 'react';
import type { Point } from '../types';

interface Props {
  onAddPoint: (point: Point) => void;
  mapAddress: string;
  mapCoords: string;
}

export function PointForm({ onAddPoint, mapAddress, mapCoords }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (mapAddress) setAddress(mapAddress);
  }, [mapAddress]);

  useEffect(() => {
    if (mapCoords) setCoords(mapCoords);
  }, [mapCoords]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const point: Point = {
      id: 'interest_' + Date.now(),
      name,
      address,
      coords,
      rating: parseInt(rating),
      favorite: false,
    };
    onAddPoint(point);
    setName('');
    setAddress('');
    setCoords('');
    setRating('');
  };

  return (
    <div className="addPoint">
      <div>
        <h2 className="secondHeadline">Добавить место</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="textContent">Название места: </label>
          <br />
          <input
            type="text"
            className="fieldStyle"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label className="textContent">Адрес места: </label>
          <br />
          <input
            type="text"
            className="fieldStyle"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label className="textContent">Координаты места: </label>
          <br />
          <input
            type="text"
            className="fieldStyle"
            value={coords}
            onChange={(e) => setCoords(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label className="textContent">Рейтинг места: </label>
          <input
            type="number"
            className="fieldStyleRating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <button className="addBtn" type="submit">
          Добавить
        </button>
      </form>
    </div>
  );
}
