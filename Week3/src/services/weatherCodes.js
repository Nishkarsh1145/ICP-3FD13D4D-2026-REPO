// Open-Meteo returns WMO weather codes (integers). This maps each code to a
// human-readable label, an Ionicons name, and a color used for theming the
// background gradient. Reference: https://open-meteo.com/en/docs (WMO Weather codes)

const DAY_MAP = {
  0: { label: 'Clear sky', icon: 'sunny', color: '#F6AD37' },
  1: { label: 'Mainly clear', icon: 'partly-sunny', color: '#F6AD37' },
  2: { label: 'Partly cloudy', icon: 'partly-sunny', color: '#6CA6CC' },
  3: { label: 'Overcast', icon: 'cloud', color: '#7C8DA6' },
  45: { label: 'Fog', icon: 'cloudy', color: '#9AA5B1' },
  48: { label: 'Freezing fog', icon: 'cloudy', color: '#9AA5B1' },
  51: { label: 'Light drizzle', icon: 'rainy', color: '#5B8FB9' },
  53: { label: 'Drizzle', icon: 'rainy', color: '#5B8FB9' },
  55: { label: 'Dense drizzle', icon: 'rainy', color: '#4A7AA3' },
  56: { label: 'Freezing drizzle', icon: 'snow', color: '#8FB6D9' },
  57: { label: 'Dense freezing drizzle', icon: 'snow', color: '#8FB6D9' },
  61: { label: 'Slight rain', icon: 'rainy', color: '#4A7AA3' },
  63: { label: 'Rain', icon: 'rainy', color: '#3E6B96' },
  65: { label: 'Heavy rain', icon: 'thunderstorm', color: '#33597D' },
  66: { label: 'Freezing rain', icon: 'snow', color: '#8FB6D9' },
  67: { label: 'Heavy freezing rain', icon: 'snow', color: '#7AA3CC' },
  71: { label: 'Slight snow', icon: 'snow', color: '#A9C6E0' },
  73: { label: 'Snow', icon: 'snow', color: '#93B7DA' },
  75: { label: 'Heavy snow', icon: 'snow', color: '#7AA3CC' },
  77: { label: 'Snow grains', icon: 'snow', color: '#A9C6E0' },
  80: { label: 'Slight showers', icon: 'rainy', color: '#4A7AA3' },
  81: { label: 'Showers', icon: 'rainy', color: '#3E6B96' },
  82: { label: 'Violent showers', icon: 'thunderstorm', color: '#33597D' },
  85: { label: 'Slight snow showers', icon: 'snow', color: '#A9C6E0' },
  86: { label: 'Heavy snow showers', icon: 'snow', color: '#7AA3CC' },
  95: { label: 'Thunderstorm', icon: 'thunderstorm', color: '#2E3A59' },
  96: { label: 'Thunderstorm, slight hail', icon: 'thunderstorm', color: '#2E3A59' },
  99: { label: 'Thunderstorm, heavy hail', icon: 'thunderstorm', color: '#1F2940' },
};

const NIGHT_OVERRIDES = {
  0: { label: 'Clear night', icon: 'moon', color: '#2B3A67' },
  1: { label: 'Mainly clear', icon: 'moon', color: '#2B3A67' },
  2: { label: 'Partly cloudy', icon: 'cloudy-night', color: '#374873' },
};

export function getWeatherInfo(code, isDay = true) {
  if (!isDay && NIGHT_OVERRIDES[code]) {
    return NIGHT_OVERRIDES[code];
  }
  return DAY_MAP[code] || { label: 'Unknown', icon: 'help-circle-outline', color: '#9AA5B1' };
}
