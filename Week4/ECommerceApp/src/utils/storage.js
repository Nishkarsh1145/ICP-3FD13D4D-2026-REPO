import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_KEY = '@shopeasy_cart_v1';

export async function loadCart() {
  try {
    const raw = await AsyncStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load cart:', err);
    return [];
  }
}

export async function saveCart(cart) {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (err) {
    console.warn('Failed to save cart:', err);
  }
}
