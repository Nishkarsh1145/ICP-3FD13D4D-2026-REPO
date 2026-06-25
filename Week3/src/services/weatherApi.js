// Open-Meteo is a free weather API that requires no API key and no signup,
// which makes it ideal for a student/portfolio project. Docs: https://open-meteo.com

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Fetches current conditions, the next 24 hours, and a 7-day forecast for
// a given latitude/longitude. Throws on network failure or a non-OK response
// so the caller can show an error state.
export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  let response;
  try {
    response = await fetch(`${BASE_URL}?${params.toString()}`);
  } catch (err) {
    throw new Error('Network request failed. Check your internet connection and try again.');
  }

 
if (!response.ok) {
  throw new Error(`Weather service returned an error (status ${response.status}).`);
}
const data = await response.json();
return normalizeWeatherResponse(data);
}

function normalizeWeatherResponse(data) {
  const current = {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
    isDay: data.current.is_day === 1,
    time: data.current.time,
  };

  // Build the next 24 hours of hourly data, starting from the current hour.
  const nowIso = data.current.time;
  const startIndex = data.hourly.time.findIndex((t) => t >= nowIso);
  const sliceStart = startIndex === -1 ? 0 : startIndex;
  const hourly = data.hourly.time.slice(sliceStart, sliceStart + 24).map((time, i) => ({
    time,
    temperature: Math.round(data.hourly.temperature_2m[sliceStart + i]),
    weatherCode: data.hourly.weather_code[sliceStart + i],
    precipitationProbability: data.hourly.precipitation_probability[sliceStart + i],
  }));

  const daily = data.daily.time.map((date, i) => ({
    date,
    weatherCode: data.daily.weather_code[i],
    tempMax: Math.round(data.daily.temperature_2m_max[i]),
    tempMin: Math.round(data.daily.temperature_2m_min[i]),
    precipitationProbability: data.daily.precipitation_probability_max[i],
  }));

  return { current, hourly, daily, timezone: data.timezone };
}
