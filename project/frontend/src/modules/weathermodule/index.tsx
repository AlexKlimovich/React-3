import { useState, useEffect, useCallback, useRef } from 'react';
import type { Point, ApiKeys } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useWeather } from './hooks/useWeather';
import { useYandexMap } from './hooks/useYandexMap';
import { ApiKeyForm } from './components/ApiKeyForm';
import { PointForm } from './components/PointForm';
import { SearchFilter } from './components/SearchFilter';
import { PointList } from './components/PointList';
import { WeatherWidget } from './components/WeatherWidget';
import './style/style.css';
import './style/variables.css';

export function WeatherApp() {
  const [apiKeys, setApiKeys] = useState<ApiKeys | null>(null);

  const coordinateRef = useRef<[number, number]>([53.9006, 27.559]);

  const [mapLoaded, setMapLoaded] = useState(false);

  const [points, setPoints] = useLocalStorage<Point[]>('massPoint', []);
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>();

  const [nameFilter, setNameFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [mapAddress, setMapAddress] = useState('');
  const [mapCoords, setMapCoords] = useState('');

  const { currentWeather, forecast, fetchWeather, resetWeather } = useWeather(
    apiKeys?.weather ?? '',
  );
  const { initMap, addMarker, removeMarker } = useYandexMap();

  // Геолокация — пишем в ref, не вызывая ре-рендер
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        coordinateRef.current = [
          position.coords.latitude,
          position.coords.longitude,
        ];
      },
      (err) => console.error(err),
    );
  }, []);

  // Инициализация карты — один раз после загрузки скрипта Yandex
  useEffect(() => {
    if (!mapLoaded) return;

    const handleAddressFound = (address: string, coords: string) => {
      setMapAddress(address);
      setMapCoords(coords);
    };

    initMap(coordinateRef.current, handleAddressFound);
  }, [mapLoaded, initMap]);

  // Загрузка скрипта Яндекс.Карт после ввода ключей
  const handleApiSubmit = useCallback((keys: ApiKeys) => {
    if (window.mapJsLoaded) return;

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${keys.yandex}&lang=ru_RU`;
    script.onload = () => {
      window.mapJsLoaded = true;
      setApiKeys(keys);
      setMapLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // Добавление точки — сбрасываем фильтры и данные клика по карте
  const handleAddPoint = useCallback(
    (point: Point) => {
      setPoints((prev) => [point, ...prev]);
      setNameFilter('');
      setRatingFilter('all');
      setMapAddress('');
      setMapCoords('');
    },
    [setPoints],
  );

  // Выбор / снятие выбора точки
  const handleSelectPoint = useCallback(
    (id: string) => {
      if (selectedPointId === id) {
        setSelectedPointId(undefined);
        removeMarker(id);
        resetWeather();
      } else {
        if (selectedPointId) removeMarker(selectedPointId);

        const item = points.find((p) => p.id === id);
        if (!item) return;

        setSelectedPointId(id);

        // 👇 1. Парсим координаты
        const coords = item.coords.split(',').map(Number);

        // 👇 2. Валидация: должно быть ровно 2 числа, и ни одно не должно быть NaN
        if (coords.length !== 2 || coords.some((c) => isNaN(c))) {
          console.warn('Invalid coords format:', item.coords);
          return;
        }

        // 👇 3. Явно приводим к кортежу [number, number]
        const [lat, lon] = coords as [number, number];

        // 👇 4. Теперь передаём числа — ошибка ts(2345) исчезнет
        addMarker(id, [lat, lon], item.name);
        fetchWeather(lat, lon);
      }
    },
    [
      selectedPointId,
      points,
      addMarker,
      removeMarker,
      fetchWeather,
      resetWeather,
    ],
  );

  // Переключение избранного
  const handleToggleFavorite = useCallback(
    (id: string) => {
      setPoints((prev) =>
        prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
      );
    },
    [setPoints],
  );

  // Удаление точки
  const handleDeletePoint = useCallback(
    (id: string) => {
      setPoints((prev) => prev.filter((p) => p.id !== id));
      removeMarker(id);
      if (selectedPointId === id) {
        setSelectedPointId(undefined);
        resetWeather();
      }
    },
    [setPoints, removeMarker, selectedPointId, resetWeather],
  );

  const filteredPoints = points.filter((item) => {
    const matchName = item.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchRating =
      ratingFilter === 'all' || item.rating === parseInt(ratingFilter);
    const matchFavorite = !showOnlyFavorites || item.favorite;
    return matchName && matchRating && matchFavorite;
  });

  if (!apiKeys) {
    return <ApiKeyForm onSubmit={handleApiSubmit} />;
  }

  return (
    <section className="contentPosition" id="contentSection">
      <div className="headline">
        <div className="textZagolovok">
          <h1>Места для посещений</h1>
        </div>
        <hr />
        <div className="content">
          <PointForm
            onAddPoint={handleAddPoint}
            mapAddress={mapAddress}
            mapCoords={mapCoords}
          />
          <SearchFilter
            nameFilter={nameFilter}
            ratingFilter={ratingFilter}
            showOnlyFavorites={showOnlyFavorites}
            onNameChange={setNameFilter}
            onRatingChange={setRatingFilter}
            onToggleFavorites={() => setShowOnlyFavorites((v) => !v)}
          />
        </div>

        <PointList
          points={filteredPoints}
          selectedPointId={selectedPointId}
          onSelect={handleSelectPoint}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDeletePoint}
        />
      </div>

      <div id="map" className="mapStyle" />

      <WeatherWidget currentWeather={currentWeather} forecast={forecast} />
    </section>
  );
}
