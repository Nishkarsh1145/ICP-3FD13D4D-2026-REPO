// Open-Meteo — free weather API, no API key required.
// Docs: https://open-meteo.com/en/docs

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Weather API error: status ${response.status}`);
  }

  const data = await response.json();

  // Current conditions
  const current = {
    temperature:  Math.round(data.current.temperature_2m),
    feelsLike:    Math.round(data.current.apparent_temperature),
    humidity:     data.current.relative_humidity_2m,
    windSpeed:    Math.round(data.current.wind_speed_10m),
    weatherCode:  data.current.weather_code,
    isDay:        data.current.is_day === 1,
  };

  // Next 24 hourly slots from current time onwards
  const nowIso = data.current.time;
  const startIdx = data.hourly.time.findIndex((t) => t >= nowIso);
  const s = startIdx === -1 ? 0 : startIdx;
  const hourly = data.hourly.time.slice(s, s + 24).map((time, i) => ({
    time,
    temperature:              Math.round(data.hourly.temperature_2m[s + i]),
    weatherCode:              data.hourly.weather_code[s + i],
    precipitationProbability: data.hourly.precipitation_probability[s + i],
  }));

  // 7-day daily forecast
  const daily = data.daily.time.map((date, i) => ({
    date,
    weatherCode:              data.daily.weather_code[i],
    tempMax:                  Math.round(data.daily.temperature_2m_max[i]),
    tempMin:                  Math.round(data.daily.temperature_2m_min[i]),
    precipitationProbability: data.daily.precipitation_probability_max[i],
  }));

  return { current, hourly, daily };
}
