// @/modules/weathermodule/types/index.ts

// ✅ КРИТИЧНО: делает файл модулем, чтобы declare global работал
export {};

// ==================== Бизнес-модели ====================

export interface Point {
  id: string;
  name: string;
  address: string;
  coords: string; // "lat,lng"
  rating: number;
  favorite: boolean;
}

export interface WeatherData {
  cityName: string;
  temp: number;
  description: string;
  iconCode: string;
}

export interface ForecastDay {
  day: string;
  temp: number;
  icon: string;
}

export interface ApiKeys {
  yandex: string;
  weather: string;
}

// ==================== Yandex Maps API v2.1 Types ====================

// Менеджер данных (properties)
export interface YMapsDataManager {
  get(key: string): unknown;
  set(key: string, value: unknown): void;
}

// Базовый геообъект
export interface YMapsGeoObject {
  properties: YMapsDataManager;
  geometry?: {
    getCoordinates(): number[];
  };
  options?: {
    set(key: string, value: unknown): void;
    get(key: string): unknown;
  };
}

// Плацмаркер (расширяет геообъект)
export interface YMapsPlacemark extends YMapsGeoObject {
  balloon?: {
    open(): void;
    close(): void;
    getContent?(): string;
  };
}

// Коллекция геообъектов
export interface YMapsGeoObjectCollection {
  get(index: number): YMapsGeoObject | undefined;
  add(obj: YMapsPlacemark): void;
  remove(obj: YMapsPlacemark): void;
  getLength(): number;
}

// Событие карты
export interface YMapsEvent {
  get<T = unknown>(field: string): T;
  coords?: [number, number];
  position?: { x: number; y: number };
  target?: unknown;
}

// Менеджер событий карты
export interface YMapsEventManager {
  add(type: string, handler: (e: YMapsEvent) => void, context?: unknown): void;
  remove(type: string, handler: (e: YMapsEvent) => void): void;
}

// Карта
export interface YMapsMap {
  events: YMapsEventManager;
  geoObjects: YMapsGeoObjectCollection;
  panTo(coords: number[], options?: { duration?: number }): void;
  setCenter(coords: number[], zoom?: number): void;
  getZoom(): number;
  destroy(): void;
}

// Результат геокодирования (ответ API)
export interface YMapsGeocodeResponse {
  geoObjects: YMapsGeoObjectCollection;
  metaData?: {
    geocoderResponse?: {
      found: string;
    };
  };
}

// Отдельный результат геокодирования (опционально)
export interface YMapsGeocodeResult extends YMapsGeoObject {
  getAddressLine?(): string;
  getPremiseNumber?(): string;
  getThoroughfare?(): string;
  getLocality?(): string;
  getCountry?(): string;
}

// Основной объект API
export interface YMapsStatic {
  ready(callback: () => void): void;
  Map: new (
    container: string | HTMLElement,
    state: {
      center: [number, number];
      zoom: number;
      controls?: string[];
    },
    options?: unknown,
  ) => YMapsMap;
  Placemark: new (
    geometry: number[] | [number, number],
    properties?: Record<string, unknown>,
    options?: unknown,
  ) => YMapsPlacemark;
  geocode(request: string | number[]): Promise<YMapsGeocodeResponse>;
}

// ==================== Глобальные декларации ====================

declare global {
  interface Window {
    ymaps: YMapsStatic;
    mapJsLoaded?: boolean;
  }
}
