import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Week 4 — placeholder screen. Full checkout form with
// shipping address, payment method selection, and order
// placement will be built in Week 5.
export default function CheckoutScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.body}>
        <Ionicons name="construct-outline" size={48} color="#D1D5DB" />
        <Text style={styles.heading}>Coming in Week 5</Text>
        <Text style={styles.sub}>
          The full checkout flow (shipping address, payment method, and order confirmation) will be completed next week.
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Back to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title:     { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  body:      { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  heading:   { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginTop: 16 },
  sub:       { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  backBtn:   { marginTop: 24, backgroundColor: '#1A1A2E', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  backBtnText: { color: '#FFFFFF', fontWeight: '700' },
});
