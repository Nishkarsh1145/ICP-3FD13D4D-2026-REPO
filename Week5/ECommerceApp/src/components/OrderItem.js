import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatPrice } from '../utils/currency';

export default function OrderItem({ order }) {
  const date = new Date(order.placedAt);
  const dateLabel = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>Order #{order.id.split('-')[1]}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      <Text style={styles.date}>{dateLabel}</Text>
      <Text style={styles.itemsLine} numberOfLines={1}>
        {order.items.map((i) => i.name).join(', ')}
      </Text>
      <View style={styles.footerRow}>
        <Text style={styles.itemCount}>{itemCount} item(s)</Text>
        <Text style={styles.total}>{formatPrice(order.total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1A1A2E',
  },
  statusBadge: {
    backgroundColor: '#E8F8EE',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: '#1E9E5A',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#9AA5B1',
    marginTop: 2,
  },
  itemsLine: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemCount: {
    fontSize: 12,
    color: '#9AA5B1',
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B6B',
  },
});
