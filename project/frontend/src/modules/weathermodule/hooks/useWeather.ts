import { useState, useCallback } from 'react';
import type { WeatherData, ForecastDay } from '../types';

interface OpenWeatherCurrentResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[];
}

export function useWeather(apiKey: string) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null,
  );
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const fetchWeather = useCallback(
    async (lat: number, lon: number) => {
      if (!apiKey) return;

      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;

      try {
        const res = await fetch(currentUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = (await res.json()) as OpenWeatherCurrentResponse;

        const firstWeather = data.weather?.[0];

        setCurrentWeather({
          cityName: data.name ?? 'Неизвестно',
          temp: Math.round(data.main?.temp ?? 0),
          description: firstWeather?.description ?? '',
          iconCode: firstWeather?.icon ?? '',
        });
      } catch (err) {
        console.error('Ошибка текущей погоды:', err);
        setCurrentWeather(null);
      }

      try {
        const res = await fetch(forecastUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = (await res.json()) as OpenWeatherForecastResponse;

        const dailyForecast: ForecastDay[] = [];
        const seenDates = new Set<number>();

        for (const item of data.list ?? []) {
          const date = new Date((item.dt ?? 0) * 1000);
          const day = date.getDate();

          if (!seenDates.has(day)) {
            seenDates.add(day);
            const firstWeather = item.weather?.[0];

            dailyForecast.push({
              day: date.toLocaleDateString('ru', { weekday: 'short' }),
              temp: Math.round(item.main?.temp ?? 0),
              icon: firstWeather?.icon ?? '',
            });

            if (dailyForecast.length === 5) break;
          }
        }
        setForecast(dailyForecast);
      } catch (err) {
        console.error('Ошибка прогноза:', err);
        setForecast([]);
      }
    },
    [apiKey],
  );

  const resetWeather = useCallback(() => {
    setCurrentWeather(null);
    setForecast([]);
  }, []);

  return { currentWeather, forecast, fetchWeather, resetWeather };
}
