# Week 4 — E-Commerce App: Core Development

## What was built this week

- Set up the Expo project and mock product catalog (`src/data/products.js`) covering 5 categories and 10 products
- Built `CartContext` for cart + order state management, persisted via `AsyncStorage`
- Built navigation: bottom tabs (Shop / Orders) with a nested stack for the shopping flow (Home → Product Detail → Cart → Checkout → Confirmation)
- Built the **Home / Catalog screen**: search bar, category filter chips, product grid
- Built the **Product Detail screen**: full description, rating, stock count, quantity selector, add-to-cart with confirmation alert

## Notes / Learnings

- This project is significantly more complex than the Expense Tracker — it has 6 screens instead of 3, and the cart needs to stay in sync across multiple screens (catalog badge count, cart screen, checkout summary), which is a good real-world test of Context-based state management.
- Chose to nest a Stack Navigator inside one Tab Navigator screen rather than a single flat stack, so the bottom tab bar stays visible while browsing/cart but the checkout flow still gets proper back-button behavior.
- A real payment gateway integration (Stripe, Razorpay) requires a merchant account and live API keys, so the checkout step simulates the payment call. This is documented clearly in the project's README so it's not a hidden gap.

## Next Week (Week 5)

- Build Checkout, Order Confirmation, and Order History screens
- Add form validation for the shipping address
- Final polish, testing on a real device, and README/GitHub finalization

See `Week5/ECommerceApp/` for the completed, final version of this app.
