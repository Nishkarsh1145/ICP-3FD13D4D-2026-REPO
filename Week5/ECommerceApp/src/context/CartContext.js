import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { loadCart, saveCart, loadOrders, saveOrders } from '../utils/storage';

const CartContext = createContext(null);

function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function CartProvider({ children }) {
  const [cart,     setCart]     = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Promise.all([loadCart(), loadOrders()]).then(([c, o]) => {
      setCart(c);
      setOrders(o);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => { if (isLoaded) saveCart(cart);     }, [cart,   isLoaded]);
  useEffect(() => { if (isLoaded) saveOrders(orders); }, [orders, isLoaded]);

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, image: product.image, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => i.productId === productId ? { ...i, quantity } : i)
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart]);

  const placeOrder = useCallback((shippingInfo) => {
    const order = {
      id:           makeId(),
      items:        cart,
      total:        cartTotal,
      shippingInfo,
      status:       'Confirmed',
      placedAt:     new Date().toISOString(),
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  }, [cart, cartTotal]);

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, updateQuantity, removeFromCart, cartTotal, cartCount, placeOrder, isLoaded }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
