import type { WeatherData, ForecastDay } from '../types';

interface Props {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
}

export function WeatherWidget({ currentWeather, forecast }: Props) {
  return (
    <div id="weather-widget">
      <div id="current-weather">
        <div id="weather-icon">
          {currentWeather && (
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}@2x.png`}
              alt="Погода"
            />
          )}
        </div>
        <div>
          <div id="city-name">
            {currentWeather ? currentWeather.cityName : 'Выберите точку'}
          </div>
          <div id="temperature">
            {currentWeather ? `${currentWeather.temp}°` : ''}
          </div>
          <div id="description">
            {currentWeather ? currentWeather.description : ''}
          </div>
        </div>
      </div>

      <div id="forecast">
        {forecast.map((day, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#e0e0e0',
                marginBottom: '8px',
              }}
            >
              {day.day}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt="Погода"
              style={{ width: '40px', height: '40px' }}
            />
            <div
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#e0e0e0',
                marginTop: '4px',
              }}
            >
              {day.temp}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
