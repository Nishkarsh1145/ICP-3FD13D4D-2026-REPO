// Formats a number as Indian Rupees e.g. 2499 -> "₹2,499"
export function formatPrice(value) {
  const num = Number(value) || 0;
  return `₹${num.toLocaleString('en-IN')}`;
}
