import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '../utils/currency';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#FFB100" />
          <Text style={styles.rating}>{product.rating}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image:  { width: '100%', height: 130, backgroundColor: '#EEEEF2' },
  info:   { padding: 10 },
  name:   { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  rating: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  price:  { fontSize: 15, fontWeight: '700', color: '#FF6B6B', marginTop: 6 },
});
