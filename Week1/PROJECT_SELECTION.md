# Week 1 — Project Selection & Wireframes

## Project Selection

For this self-learning internship, I selected the following two projects from the Project Bank:

1. **Weather Application** (Beginner to Intermediate) — chosen as the first project to build a solid foundation in core mobile development concepts: API integration, geolocation, responsive layouts, and error handling.
2. **E-Commerce Mobile App** (Advanced) — chosen as the second, higher-complexity project to practice multi-screen navigation, cart/state management, form validation, and a realistic checkout flow — the kind of architecture used in real production shopping apps.

**Why this pairing:** it follows a clear difficulty curve (Beginner/Intermediate → Advanced) matching the program's week-by-week structure, and together the two projects cover a broad set of mobile development fundamentals: external API consumption, device permissions (location), persistence, navigation patterns, state management at different scales, forms, and UI composition.

## Wireframes

### Weather Application

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ [locate]          [🔍]   │     │  <  Search City          │     │   Permission denied 🌥   │
│                          │     │  [ Search for a city... ]│     │                          │
│       Jammu               │     │                          │     │   We can't show weather  │
│   Wednesday, 18 June      │     │  📍 Jammu, J&K, India    │     │   for your location.     │
│        ☀️  32°            │     │  📍 Jammu, Punjab, India │     │                          │
│      Clear sky            │     │  📍 ...                 │     │   [   Try Again    ]    │
│    Feels like 35°          │     │                          │     │   Search for a city      │
│  ┌───────────────────┐    │     │                          │     │      instead              │
│  │ 💧 64%   💨 12km/h │    │     └─────────────────────────┘     └─────────────────────────┘
│  └───────────────────┘    │        Search screen                    Error / permission state
│  Next 24 Hours             │
│  [Now][1PM][2PM][3PM]...  │
│  7-Day Forecast            │
│  Today  ☀️  24°───32°     │
│  Thu    🌤  23°───30°     │
│  ...                       │
└─────────────────────────┘
   Home screen
```

### E-Commerce App

```
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│ Hey there 👋      🛒(3) │     │  <  [product image]      │     │  Your Cart                │
│ Discover great products  │     │                          │     │  ┌─────────────────────┐ │
│ [ Search products... ]   │     │  Electronics              │     │  │ 🎧 Headphones        │ │
│ [All][Electronics][...]  │     │  Wireless Headphones      │     │  │ ₹2,499  [-][2][+] 🗑 │ │
│ ┌────────┐ ┌────────┐    │     │  ⭐4.5 · 18 in stock      │     │  ├─────────────────────┤ │
│ │ image  │ │ image  │    │     │  ₹2,499                   │     │  │ Subtotal    ₹4,998  │ │
│ │ name   │ │ name   │    │     │  Description...           │     │  │ Shipping      ₹49   │ │
│ │ ₹price │ │ ₹price │    │     │  Quantity [-][1][+]       │     │  │ Total      ₹5,047   │ │
│ └────────┘ └────────┘    │     │  [   Add to Cart   ]      │     │  │[ Checkout ]          │ │
└─────────────────────────┘     └─────────────────────────┘     └─────────────────────────┘
   Home / Catalog                   Product Detail                    Cart
```

## Repository

Per the submission guidelines, all work for both projects will be committed into **one single GitHub repository**, organized into `Week1` through `Week6` folders. 
