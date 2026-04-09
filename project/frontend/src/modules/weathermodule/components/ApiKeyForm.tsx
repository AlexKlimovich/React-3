import { useState, type FormEvent } from 'react';
import type { ApiKeys } from '../types';

interface Props {
  onSubmit: (keys: ApiKeys) => void;
}

export function ApiKeyForm({ onSubmit }: Props) {
  const [yandex, setYandex] = useState('');
  const [weather, setWeather] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!yandex && !weather) {
      alert('Поля не заполнены! Введите API-ключи.');
      return;
    }
    if (!yandex) {
      alert('Введите Yandex API-ключ!');
      return;
    }
    if (!weather) {
      alert('Введите WeatherMap API-ключ!');
      return;
    }
    onSubmit({ yandex: yandex.trim(), weather: weather.trim() });
  };

  return (
    <section id="apiSection" className="sectionApi">
      <div className="contentPositionApi headlineApi">
        <form className="apiFormStyle" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="headlineApiKey">Введите Yandex API Key</label>
            <input
              type="text"
              className="fieldStyleApi"
              value={yandex}
              onChange={(e) => setYandex(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="headlineApiKey">Введите WeatherMap API Key</label>
            <input
              type="text"
              className="fieldStyleApi"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              required
            />
          </div>
          <button className="btnApi" type="submit">
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
}
