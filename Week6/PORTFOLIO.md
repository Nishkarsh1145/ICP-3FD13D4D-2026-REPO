# Week 6 — Final Portfolio & Submission

## Intern Details
- **Name:** Nishkarsh Jandial
- **Portal ID:** ICP-3FD13D4D-2026
- **Repo ID:** REPO-E3098805
- **GitHub Repository:** https://github.com/Nishkarsh1145/ICP-3FD13D4D-2026-REPO

---

## Projects Completed

### Project 1 — Weather App (Beginner to Intermediate)
**Location in repo:** `Week3/WeatherApp/`

**Description:**
A mobile weather application that shows real-time weather conditions for the user's GPS location or any searched city worldwide.

**Features Built:**
- Live GPS location detection using `expo-location`
- Reverse geocoding — converts coordinates to city name (no extra API key needed)
- Real-time weather data from Open-Meteo API (free, no API key required)
- Current conditions: temperature, feels like, humidity, wind speed
- Next 24 hours hourly forecast
- 7-day daily forecast with high/low temperatures and rain probability
- City search with debounced live results (Open-Meteo Geocoding API)
- Night/day weather icons and dynamic background colors
- Pull to refresh
- Full error handling: permission denied, GPS failure, network errors

**Key Skills Demonstrated:**
- API Integration (Open-Meteo)
- Geolocation & device permissions (expo-location)
- Responsive layouts
- Error handling
- React Context for state management

---

### Project 2 — E-Commerce App "ShopEasy" (Advanced)
**Location in repo:** `Week5/ECommerceApp/`

**Description:**
A full-featured mobile shopping app where users can browse products, manage a cart, and complete a checkout flow with order history.

**Features Built:**
- Product catalog with 10 products across 5 categories
- Category filter chips and live search
- Product detail screen with ratings, stock count, description
- Quantity selector on product detail and cart
- Full cart management: add, remove, update quantity
- Cart badge count on home screen
- Checkout screen with shipping address form and validation
- Payment method selection: Credit/Debit Card, UPI, Cash on Delivery
- Order confirmation screen after successful checkout
- Order history screen with all past orders
- Full data persistence via AsyncStorage (cart + orders survive app restarts)
- Bottom tab navigation: Shop tab + Orders tab

**Key Skills Demonstrated:**
- Complex navigation (nested stack inside bottom tabs)
- Cart management
- AsyncStorage persistence
- Form validation
- State management with React Context
- Product catalog architecture

---

## Weekly Progress Summary

| Week | Deliverable | Status |
|------|-------------|--------|
| Week 1 | Project selection + wireframes | ✅ Complete |
| Week 2 | Weather App initial build (GPS, current weather, forecast) | ✅ Complete |
| Week 3 | Weather App completed (city search, polish, README) | ✅ Complete |
| Week 4 | E-Commerce App initial build (catalog, detail, cart) | ✅ Complete |
| Week 5 | E-Commerce App completed (checkout, orders, navigation) | ✅ Complete |
| Week 6 | Final portfolio + submission | ✅ Complete |

---

## Tech Stack Used

| Tool | Purpose |
|------|---------|
| React Native + Expo | Mobile app framework |
| React Navigation | Screen navigation |
| expo-location | GPS + reverse geocoding |
| AsyncStorage | Local data persistence |
| Open-Meteo API | Weather data (free, no key) |
| Open-Meteo Geocoding API | City search (free, no key) |
| Expo Vector Icons | Icons throughout both apps |

---
