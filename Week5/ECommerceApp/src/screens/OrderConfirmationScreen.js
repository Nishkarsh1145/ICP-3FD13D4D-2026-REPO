import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={48} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>
        Your order #{orderId.split('-')[1]} has been confirmed and will be on its way soon.
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('OrdersTab')}
      >
        <Text style={styles.primaryButtonText}>View Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('HomeTab')}
      >
        <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1E9E5A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  primaryButton: {
    backgroundColor: '#1A1A2E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  secondaryButton: { paddingVertical: 14, marginTop: 6 },
  secondaryButtonText: { color: '#6B7280', fontWeight: '600', fontSize: 14 },
});
