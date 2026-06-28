// Mock product catalog — 10 products across 5 categories.
// In a real app this would come from a backend API or Firebase.
// Images use picsum.photos for stable placeholder images.

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'];

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 2499,
    rating: 4.5,
    image: 'https://picsum.photos/seed/headphones/400/400',
    description: 'Over-ear wireless headphones with active noise cancellation, 30-hour battery life, and a foldable design for travel.',
    stock: 18,
  },
  {
    id: 'p2',
    name: 'Smart Watch Series 5',
    category: 'Electronics',
    price: 5999,
    rating: 4.3,
    image: 'https://picsum.photos/seed/smartwatch/400/400',
    description: 'Track your fitness, heart rate, and notifications on a vibrant AMOLED display with a week of battery life.',
    stock: 9,
  },
  {
    id: 'p3',
    name: 'Classic Denim Jacket',
    category: 'Fashion',
    price: 1799,
    rating: 4.1,
    image: 'https://picsum.photos/seed/denimjacket/400/400',
    description: 'A timeless denim jacket with a relaxed fit, button closures, and durable stitching for everyday wear.',
    stock: 25,
  },
  {
    id: 'p4',
    name: 'Running Sneakers',
    category: 'Sports',
    price: 3299,
    rating: 4.6,
    image: 'https://picsum.photos/seed/sneakers/400/400',
    description: 'Lightweight running shoes with breathable mesh and responsive cushioning, built for daily training.',
    stock: 14,
  },
  {
    id: 'p5',
    name: 'Ceramic Coffee Mug Set',
    category: 'Home',
    price: 899,
    rating: 4.7,
    image: 'https://picsum.photos/seed/mugset/400/400',
    description: 'Set of 4 minimalist ceramic mugs, microwave and dishwasher safe, 350ml capacity each.',
    stock: 40,
  },
  {
    id: 'p6',
    name: 'Yoga Mat Pro',
    category: 'Sports',
    price: 1299,
    rating: 4.4,
    image: 'https://picsum.photos/seed/yogamat/400/400',
    description: 'Extra-thick non-slip yoga mat with carrying strap, ideal for yoga, pilates, and home workouts.',
    stock: 22,
  },
  {
    id: 'p7',
    name: 'Natural Face Serum',
    category: 'Beauty',
    price: 1099,
    rating: 4.2,
    image: 'https://picsum.photos/seed/faceserum/400/400',
    description: 'Vitamin C face serum for brightening and hydration, suitable for all skin types.',
    stock: 30,
  },
  {
    id: 'p8',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 1899,
    rating: 4.0,
    image: 'https://picsum.photos/seed/speaker/400/400',
    description: 'Portable waterproof speaker with 12-hour playtime and deep bass for outdoor adventures.',
    stock: 16,
  },
  {
    id: 'p9',
    name: 'Leather Wallet',
    category: 'Fashion',
    price: 749,
    rating: 4.3,
    image: 'https://picsum.photos/seed/walletleather/400/400',
    description: 'Slim genuine leather wallet with RFID protection and 6 card slots.',
    stock: 35,
  },
  {
    id: 'p10',
    name: 'Indoor Plant Pot Set',
    category: 'Home',
    price: 999,
    rating: 4.5,
    image: 'https://picsum.photos/seed/plantpot/400/400',
    description: 'Set of 3 minimalist ceramic plant pots with drainage holes, perfect for succulents.',
    stock: 27,
  },
];

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
