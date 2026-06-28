// Maps Open-Meteo WMO weather codes to labels, Ionicons names, and background colors.
// Reference: https://open-meteo.com/en/docs

const CODE_MAP = {
  0:  { label: 'Clear Sky',       icon: 'sunny',         color: '#F6AD37' },
  1:  { label: 'Mainly Clear',    icon: 'partly-sunny',  color: '#F6AD37' },
  2:  { label: 'Partly Cloudy',   icon: 'partly-sunny',  color: '#6CA6CC' },
  3:  { label: 'Overcast',        icon: 'cloud',         color: '#7C8DA6' },
  45: { label: 'Fog',             icon: 'cloudy',        color: '#9AA5B1' },
  48: { label: 'Freezing Fog',    icon: 'cloudy',        color: '#9AA5B1' },
  51: { label: 'Light Drizzle',   icon: 'rainy',         color: '#5B8FB9' },
  53: { label: 'Drizzle',         icon: 'rainy',         color: '#5B8FB9' },
  55: { label: 'Dense Drizzle',   icon: 'rainy',         color: '#4A7AA3' },
  61: { label: 'Slight Rain',     icon: 'rainy',         color: '#4A7AA3' },
  63: { label: 'Rain',            icon: 'rainy',         color: '#3E6B96' },
  65: { label: 'Heavy Rain',      icon: 'thunderstorm',  color: '#33597D' },
  71: { label: 'Slight Snow',     icon: 'snow',          color: '#A9C6E0' },
  73: { label: 'Snow',            icon: 'snow',          color: '#93B7DA' },
  75: { label: 'Heavy Snow',      icon: 'snow',          color: '#7AA3CC' },
  80: { label: 'Showers',         icon: 'rainy',         color: '#4A7AA3' },
  81: { label: 'Heavy Showers',   icon: 'rainy',         color: '#3E6B96' },
  95: { label: 'Thunderstorm',    icon: 'thunderstorm',  color: '#2E3A59' },
  99: { label: 'Severe Storm',    icon: 'thunderstorm',  color: '#1F2940' },
};

const NIGHT_OVERRIDES = {
  0: { label: 'Clear Night', icon: 'moon',         color: '#2B3A67' },
  1: { label: 'Mainly Clear', icon: 'moon',        color: '#2B3A67' },
  2: { label: 'Partly Cloudy', icon: 'cloudy-night', color: '#374873' },
};

export function getWeatherInfo(code, isDay = true) {
  if (!isDay && NIGHT_OVERRIDES[code]) return NIGHT_OVERRIDES[code];
  return CODE_MAP[code] || { label: 'Unknown', icon: 'help-circle-outline', color: '#9AA5B1' };
}
