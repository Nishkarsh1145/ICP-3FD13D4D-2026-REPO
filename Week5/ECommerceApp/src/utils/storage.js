import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY   = '@shopeasy_cart_v1';
const ORDERS_KEY = '@shopeasy_orders_v1';

export async function loadCart() {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveCart(cart) {
  try { await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
}

export async function loadOrders() {
  try {
    const raw = await AsyncStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveOrders(orders) {
  try { await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch {}
}
