# Weather Now

A mobile weather app built with **React Native + Expo** for the Intern Career Path App Development Internship (Beginner–Intermediate project). Shows current conditions, an hourly forecast, and a 7-day forecast, either for your device's GPS location or any city you search for.

## Features

- **Current Conditions** — temperature, "feels like", humidity, wind speed, and a weather icon/description that reflects real conditions (clear, cloudy, rain, snow, thunderstorm, etc.)
- **Geolocation** — automatically detects your location on launch (with permission) and reverse-geocodes it to a city name, using Expo's native location APIs (no extra API key needed for this part)
- **City Search** — search any city worldwide and switch the displayed weather to it
- **Hourly Forecast** — scrollable strip of the next 24 hours
- **7-Day Forecast** — daily highs/lows and rain probability
- **Error Handling** — distinct, recoverable states for: location permission denied, GPS/location errors, and weather-fetch network errors — each with a retry action
- **Pull to Refresh** — swipe down on the home screen to refetch the latest data

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React Native (Expo) |
| Navigation | React Navigation (native stack) |
| State management | React Context + Hooks |
| Geolocation | `expo-location` |
| Weather data | [Open-Meteo](https://open-meteo.com) — free, no API key required |
| City search | Open-Meteo Geocoding API — also free, no API key |
| Icons | `@expo/vector-icons` (Ionicons) |

## Why Open-Meteo?

Most weather tutorials use OpenWeatherMap, which requires creating an account and waiting for an API key to activate. Open-Meteo is fully free and keyless, so the app works immediately after `npm install` with zero configuration — useful for a student project with a tight deadline. If you'd rather use OpenWeatherMap (e.g. to practice handling API keys and `.env` files), the only file that would need to change is `src/services/weatherApi.js`.

## Project Structure

```
WeatherApp/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── components/        # WeatherCard, HourlyItem, ForecastItem, LoadingView, ErrorView
    ├── context/           # LocationContext (GPS permission + manual city selection)
    ├── navigation/         # AppNavigator (Home + Search stack)
    ├── screens/            # CurrentWeatherScreen, SearchScreen
    └── services/           # weatherApi, geocodingApi, weatherCodes (WMO code → icon/label mapping)
```

## Running the App

1. Install [Node.js](https://nodejs.org) and the Expo Go app on your phone (App Store / Play Store).
2. From inside this folder:
   ```bash
   npm install
   npx expo start
   ```
3. Scan the QR code shown in the terminal with the Expo Go app (Android) or the Camera app (iOS).
4. Allow location access when prompted, or tap the search icon to look up a city instead.

## Possible Extensions

- Switch between °C / °F units
- Save favorite/recent cities
- Weather alerts/warnings
- Background color animation transitions between weather states
- Widget/home-screen support
