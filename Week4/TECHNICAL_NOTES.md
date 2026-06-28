# Week 4 — E-Commerce App: Initial Build & Technical Notes

## What Was Built This Week

### Project Setup
- Initialised Expo project with all required dependencies: React Navigation (native stack + bottom tabs), AsyncStorage, Expo Vector Icons
- Planned full app architecture before writing code: data layer → context → components → screens → navigation

### Product Catalog (Home Screen)
- Grid layout showing all 10 products across 5 categories
- **Category filter chips** — tap to filter by Electronics, Fashion, Home, Sports, Beauty
- **Live search bar** — filters products as you type using `useMemo` for performance
- **Cart badge** on the top-right cart icon shows item count in real time

### Product Detail Screen
- Full product info: image, category, name, rating, stock count, description, price
- **Quantity selector** with +/- buttons, capped at available stock
- **Add to Cart** button with confirmation alert offering "Keep Shopping" or "Go to Cart"

### Cart Screen
- Lists all cart items with image, name, price, quantity controls
- Quantity can be increased/decreased inline; hitting 0 removes the item
- Shows subtotal, shipping (₹49 flat), and total
- "Proceed to Checkout" button navigates to a placeholder screen (full checkout in Week 5)

### Cart State Management (`src/context/CartContext.js`)
- Global cart state using React Context + `useReducer`-style callbacks
- Cart persisted to device storage via `AsyncStorage` — survives app restarts
- `cartCount` and `cartTotal` computed with `useMemo` to avoid unnecessary recalculations

### Mock Product Data (`src/data/products.js`)
- 10 products across 5 categories with realistic names, prices (in ₹), ratings, descriptions, and stock counts
- Placeholder images from `picsum.photos` (stable, consistent per seed)

## What Is Not Done Yet (Planned for Week 5)
- Full Checkout screen (shipping form + payment method selection)
- Order Confirmation screen
- Order History screen
- Bottom tab navigation (Shop tab + Orders tab)
- Order persistence via AsyncStorage

## How to Run
```bash
npm install
npx expo start
```
Scan the QR code with Expo Go on your phone.

## Key Technical Decisions
- Used **React Context** over Redux — the cart state is straightforward enough that a full Redux setup would add unnecessary complexity for this project scope.
- Used **picsum.photos** with named seeds for product images — this gives consistent, stable placeholder images without needing a real image hosting solution.
- Kept the Checkout screen as a clear placeholder this week rather than rushing a broken implementation — cleaner to complete it properly in Week 5.
