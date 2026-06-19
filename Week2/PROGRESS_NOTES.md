# Week 2 — Weather App: Initial Build & Progress Notes

## What Was Built This Week

### Project Setup
- Initialised Expo project with `package.json`, `app.json` (including Android and iOS location permission strings), and `babel.config.js`
- Installed all required dependencies: `expo-location`, `@react-navigation/native`, `@react-navigation/native-stack`, `@expo/vector-icons`

### Core Screens & Navigation
- Built the **Home Screen** displaying:
  - Current temperature, "feels like", weather description, humidity, and wind speed
  - Horizontally scrollable **Next 24 Hours** strip
  - **7-Day Forecast** list with daily high/low and rain probability
- Set up **React Navigation** stack (single screen for now — city search coming in Week 3)

### API Integration
- Connected to **Open-Meteo** (`src/services/weatherApi.js`) — a free weather API requiring no API key or signup
- Fetching: current conditions, next 24-hour hourly data, and 7-day daily forecast in a single API call
- Built WMO weather code mapping (`src/services/weatherCodes.js`) to translate Open-Meteo's integer codes into icon names, labels, and background colors

### Geolocation
- Integrated `expo-location` to request foreground location permission from the user
- On permission grant: gets the device's GPS coordinates and reverse-geocodes them into a city name using the native OS geocoder (no extra API key needed)
- Basic error states handled inline on the Home Screen: location permission denied, GPS failure, and weather fetch failure — each with a retry button

## How to Run
```bash
npm install
npx expo start
```
Scan the QR code with Expo Go on your phone.

## Key Learning This Week
Using `expo-location` for both GPS and native reverse-geocoding meant I didn't need a separate geocoding API key. The Open-Meteo API returns WMO weather codes (integers like `0`, `61`, `95`) rather than strings, so I had to build a lookup table mapping those integers to readable labels and icons — that's what `weatherCodes.js` does.
