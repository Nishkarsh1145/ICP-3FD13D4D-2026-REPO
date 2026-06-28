import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: 'card-outline' },
  { id: 'upi', label: 'UPI', icon: 'phone-portrait-outline' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'cash-outline' },
];

const SHIPPING_FEE = 49;

export default function CheckoutScreen({ navigation }) {
  const { cart, cartTotal, placeOrder } = useCart();
  const [form, setForm] = useState({ fullName: '', address: '', city: '', pincode: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartTotal + SHIPPING_FEE;

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const isFormValid =
    form.fullName.trim().length > 1 &&
    form.address.trim().length > 5 &&
    form.city.trim().length > 1 &&
    /^\d{6}$/.test(form.pincode.trim()) &&
    /^\d{10}$/.test(form.phone.trim());

  const handlePlaceOrder = () => {
    if (!isFormValid) {
      Alert.alert('Missing info', 'Please fill in a valid shipping address and phone number.');
      return;
    }

    setIsProcessing(true);

    // Simulates a payment gateway call. A real integration (Stripe, Razorpay,
    // etc.) would happen here, and the order would only be confirmed after
    // the gateway returns a successful payment response.
    setTimeout(() => {
      const order = placeOrder({ ...form, paymentMethod });
      setIsProcessing(false);
      navigation.replace('OrderConfirmation', { orderId: order.id });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionLabel}>Shipping Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={form.fullName}
          onChangeText={(v) => updateField('fullName', v)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address (house no, street, area)"
          value={form.address}
          onChangeText={(v) => updateField('address', v)}
          multiline
        />
        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="City"
            value={form.city}
            onChangeText={(v) => updateField('city', v)}
          />
          <TextInput
            style={[styles.input, styles.flexInput]}
            placeholder="Pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={form.pincode}
            onChangeText={(v) => updateField('pincode', v)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={form.phone}
          onChangeText={(v) => updateField('phone', v)}
        />

        <Text style={styles.sectionLabel}>Payment Method</Text>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[styles.paymentOption, paymentMethod === method.id && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod(method.id)}
          >
            <Ionicons name={method.icon} size={20} color="#1A1A2E" />
            <Text style={styles.paymentLabel}>{method.label}</Text>
            <View style={[styles.radio, paymentMethod === method.id && styles.radioActive]} />
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionLabel}>Order Summary</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({cart.length})</Text>
            <Text style={styles.summaryValue}>{formatPrice(cartTotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>{formatPrice(SHIPPING_FEE)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.placeOrderButton, isProcessing && styles.placeOrderButtonDisabled]}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.placeOrderText}>Place Order · {formatPrice(total)}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginLeft: 12 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionLabel: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginTop: 20, marginBottom: 10 },
  input: {
    backgroundColor: '#F7F7FA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 10,
  },
  rowInputs: { flexDirection: 'row', gap: 10 },
  flexInput: { flex: 1 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7FA',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  paymentOptionActive: { borderColor: '#1A1A2E', backgroundColor: '#FFFFFF' },
  paymentLabel: { flex: 1, marginLeft: 12, fontSize: 14, color: '#1A1A2E', fontWeight: '500' },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#D1D5DB' },
  radioActive: { borderColor: '#1A1A2E', backgroundColor: '#1A1A2E' },
  summaryBox: { backgroundColor: '#F7F7FA', borderRadius: 12, padding: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1A1A2E', fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 8, marginTop: 2 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  totalValue: { fontSize: 16, fontWeight: '800', color: '#FF6B6B' },
  footer: { paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#F0F0F3' },
  placeOrderButton: {
    backgroundColor: '#1A1A2E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeOrderButtonDisabled: { opacity: 0.6 },
  placeOrderText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
