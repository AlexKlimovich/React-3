// src/types/ymaps.d.ts
export {};

declare global {
  interface Window {
    ymaps: YMapsStatic;
  }

  // Основной объект API
  interface YMapsStatic {
    ready(callback: () => void): void;
    Map: new (
      container: string | HTMLElement,
      state: YMapsMapState,
      options?: unknown,
    ) => YMapsMap;
    Placemark: new (
      geometry: number[] | [number, number],
      properties?: Record<string, unknown>,
      options?: unknown,
    ) => YMapsPlacemark;
    geocode(request: string | number[]): Promise<YMapsGeocodeResponse>;
  }

  // Состояние карты
  interface YMapsMapState {
    center: [number, number];
    zoom: number;
    controls?: string[];
  }

  // Карта
  interface YMapsMap {
    events: YMapsEventManager;
    geoObjects: YMapsGeoObjectCollection;
    panTo(coordinates: number[], options?: { duration?: number }): void;
    setCenter(coordinates: number[], zoom?: number): void;
    getZoom(): number;
  }

  // Обработчики событий
  interface YMapsEventManager {
    add(
      event: string,
      callback: (e: YMapsEvent) => void,
      context?: unknown,
    ): void;
    remove(event: string, callback: (e: YMapsEvent) => void): void;
  }

  // Событие
  interface YMapsEvent {
    get<T = unknown>(field: string): T;
    coords?: [number, number];
  }

  // Коллекция геообъектов
  interface YMapsGeoObjectCollection {
    add(obj: YMapsPlacemark): void;
    remove(obj: YMapsPlacemark): void;
    get(index: number): YMapsGeoObject | undefined;
    getLength(): number;
  }

  // Базовый геообъект
  interface YMapsGeoObject {
    properties: YMapsDataManager;
    geometry?: {
      getCoordinates(): number[];
    };
  }

  // Менеджер свойств
  interface YMapsDataManager {
    get(key: string): unknown;
    set(key: string, value: unknown): void;
  }

  // Результат геокодирования
  interface YMapsGeocodeResponse {
    geoObjects: YMapsGeoObjectCollection;
  }

  // Плацмаркер (расширяет геообъект)
  interface YMapsPlacemark extends YMapsGeoObject {
    options: {
      set(key: string, value: unknown): void;
      get(key: string): unknown;
    };
    balloon?: {
      open(): void;
      close(): void;
    };
  }
}
