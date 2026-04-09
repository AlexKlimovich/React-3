import { useRef, useCallback } from 'react';
import type {
  YMapsMap,
  YMapsPlacemark,
  YMapsEvent,
} from '@/modules/weathermodule/types/index';

interface MarkerEntry {
  id: string;
  placemark: YMapsPlacemark;
}

export function useYandexMap() {
  const mapRef = useRef<YMapsMap | null>(null);
  const markersRef = useRef<MarkerEntry[]>([]);

  const initMap = useCallback(
    (
      coordinate: [number, number],
      onAddressFound: (address: string, coords: string) => void,
    ): Promise<void> => {
      return new Promise((resolve) => {
        window.ymaps.ready(() => {
          const myMap: YMapsMap = new window.ymaps.Map('map', {
            center: coordinate,
            zoom: 10,
          });

          myMap.events.add('mousedown', (e: YMapsEvent) => {
            const coords = e.get<[number, number]>('coords');

            setTimeout(() => {
              void window.ymaps
                .geocode(coords)
                .then((res: YMapsGeocodeResponse) => {
                  const firstResult = res.geoObjects.get(0);

                  const rawValue = firstResult?.properties?.get('text');
                  const address = typeof rawValue === 'string' ? rawValue : '';

                  onAddressFound(address, coords.join(','));
                })
                .catch((err: unknown) => {
                  console.error('Geocode error:', err);
                });
            }, 100);
          });

          mapRef.current = myMap;
          resolve();
        });
      });
    },
    [],
  );

  const addMarker = useCallback(
    (id: string, coords: number[], name: string) => {
      if (!mapRef.current) return;

      // ✅ Placemark теперь типизирован
      const placemark: YMapsPlacemark = new window.ymaps.Placemark(coords, {
        balloonContent: name,
      });

      mapRef.current.geoObjects.add(placemark);
      markersRef.current.push({ id, placemark });
      mapRef.current.panTo(coords, { duration: 500 });
    },
    [],
  );

  const removeMarker = useCallback((id: string) => {
    if (!mapRef.current) return;
    const marker = markersRef.current.find((m) => m.id === id);
    if (marker) {
      mapRef.current.geoObjects.remove(marker.placemark);
      markersRef.current = markersRef.current.filter((m) => m.id !== id);
    }
  }, []);

  return { mapRef, initMap, addMarker, removeMarker };
}
