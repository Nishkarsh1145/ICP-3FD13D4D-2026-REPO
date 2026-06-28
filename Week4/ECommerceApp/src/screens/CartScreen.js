import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

const SHIPPING = 49;

export default function CartScreen({ navigation }) {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const total = cartTotal + (cart.length > 0 ? SHIPPING : 0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
        <View style={{ width: 22 }} />
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity style={styles.shopBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.productId}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
                onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
                onRemove={() => removeFromCart(item.productId)}
              />
            )}
          />
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(cartTotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>{formatPrice(SHIPPING)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
            {/* Checkout button placeholder — full checkout screen coming in Week 5 */}
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F7F7FA' },
  header:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title:        { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  list:         { paddingHorizontal: 16, paddingTop: 8 },
  empty:        { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText:    { fontSize: 15, color: '#9AA5B1', marginTop: 12 },
  shopBtn:      { marginTop: 18, backgroundColor: '#1A1A2E', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  shopBtnText:  { color: '#FFFFFF', fontWeight: '700' },
  summary:      { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1A1A2E', fontWeight: '600' },
  totalRow:     { borderTopWidth: 1, borderTopColor: '#F0F0F3', paddingTop: 10, marginTop: 4 },
  totalLabel:   { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  totalValue:   { fontSize: 18, fontWeight: '800', color: '#FF6B6B' },
  checkoutBtn:  { backgroundColor: '#1A1A2E', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  checkoutBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
