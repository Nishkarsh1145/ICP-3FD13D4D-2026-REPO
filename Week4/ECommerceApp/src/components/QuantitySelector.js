import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'medium' }) {
  const small = size === 'small';
  return (
    <View style={[styles.row, small && styles.rowSmall]}>
      <TouchableOpacity style={[styles.btn, small && styles.btnSmall]} onPress={onDecrease}>
        <Ionicons name="remove" size={small ? 14 : 18} color="#1A1A2E" />
      </TouchableOpacity>
      <Text style={[styles.qty, small && styles.qtySmall]}>{quantity}</Text>
      <TouchableOpacity style={[styles.btn, small && styles.btnSmall]} onPress={onIncrease}>
        <Ionicons name="add" size={small ? 14 : 18} color="#1A1A2E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F7', borderRadius: 10 },
  rowSmall: { borderRadius: 8 },
  btn:      { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  btnSmall: { width: 28, height: 28 },
  qty:      { minWidth: 28, textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#1A1A2E' },
  qtySmall: { fontSize: 13, minWidth: 20 },
});
