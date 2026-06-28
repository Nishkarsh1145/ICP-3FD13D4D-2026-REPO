# ShopEasy — E-Commerce Mobile App

A mobile shopping app built with **React Native + Expo** for the Intern Career Path App Development Internship (Advanced project). Users can browse a product catalog, filter by category, search, view product details, manage a cart, and complete a checkout flow that produces a persisted order history.

## Features

- **Product Catalog** — grid of products with category filter chips and live search
- **Product Detail** — full description, rating, stock, quantity selector, add-to-cart
- **Cart Management** — increase/decrease quantity, remove items, live subtotal/shipping/total
- **Checkout** — shipping address form with validation, payment method selection (Card / UPI / COD)
- **Order History** — every completed order is saved locally and viewable in the Orders tab
- **Persistence** — cart and orders survive an app restart via `AsyncStorage`

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React Native (Expo) |
| Navigation | React Navigation (bottom tabs + native stack) |
| State management | React Context + Hooks |
| Persistence | `@react-native-async-storage/async-storage` |
| Icons | `@expo/vector-icons` (Ionicons) |

## Project Structure

```
ECommerceApp/
├── App.js
├── app.json
├── babel.config.js
├── package.json
└── src/
    ├── components/        # ProductCard, CartItem, OrderItem, QuantitySelector
    ├── context/           # CartContext (cart + order state, persisted)
    ├── data/               # Mock product catalog (products.js)
    ├── navigation/         # AppNavigator (tabs + stack)
    ├── screens/            # Home, ProductDetail, Cart, Checkout, OrderConfirmation, OrderHistory
    └── utils/              # currency formatting, AsyncStorage helpers
```

## Running the App

1. Install [Node.js](https://nodejs.org) and the Expo Go app on your phone (App Store / Play Store).
2. From inside this folder:
   ```bash
   npm install
   npx expo start
   ```
3. Scan the QR code shown in the terminal with the Expo Go app (Android) or the Camera app (iOS).

## Note on Payments

This app simulates the checkout/payment step rather than wiring up a real payment gateway, since that requires a registered merchant account and live API keys (e.g. Stripe, Razorpay). The checkout flow, validation, and order persistence are fully real — only the actual money-movement step is mocked with a short delay to mimic a gateway call. To go live, you'd replace the `setTimeout` in `CheckoutScreen.js`'s `handlePlaceOrder` with a real API call to your payment provider's SDK.

## Possible Extensions

- Wishlist / favorites
- Product reviews and ratings submission
- Push notifications for order status updates
- Real backend (Firebase/Supabase) instead of local mock data
- Real payment gateway integration
