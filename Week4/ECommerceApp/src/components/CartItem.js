import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../utils/currency';
import QuantitySelector from './QuantitySelector';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.bottom}>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            size="small"
          />
          <TouchableOpacity onPress={onRemove} style={styles.deleteBtn}>
            <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row:     { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginBottom: 12 },
  image:   { width: 64, height: 64, borderRadius: 8, backgroundColor: '#EEEEF2' },
  details: { flex: 1, marginLeft: 12, justifyContent: 'space-between' },
  name:    { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  price:   { fontSize: 13, color: '#FF6B6B', fontWeight: '700', marginTop: 2 },
  bottom:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  deleteBtn: { padding: 6 },
});
