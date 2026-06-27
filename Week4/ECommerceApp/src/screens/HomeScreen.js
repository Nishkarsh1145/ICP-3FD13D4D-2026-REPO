import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

export default function HomeScreen({ navigation }) {
  const [query, setQuery]               = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { cartCount } = useCart();

  const filtered = useMemo(() =>
    PRODUCTS.filter((p) => {
      const matchCat   = activeCategory === 'All' || p.category === activeCategory;
      const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    }),
    [query, activeCategory]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey there 👋</Text>
          <Text style={styles.title}>Discover Products</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={24} color="#1A1A2E" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#9AA5B1" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Category chips */}
      <FlatList
        data={CATEGORIES}
        horizontal
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.chip, activeCategory === item && styles.chipActive]}
            onPress={() => setActiveCategory(item)}
          >
            <Text style={[styles.chipText, activeCategory === item && styles.chipTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Product grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#F7F7FA', paddingHorizontal: 16 },
  header:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  greeting:       { fontSize: 13, color: '#9AA5B1' },
  title:          { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginTop: 2 },
  cartBtn:        { width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  badge:          { position: 'absolute', top: -4, right: -4, backgroundColor: '#FF6B6B', borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText:      { color: '#fff', fontSize: 11, fontWeight: '700' },
  searchBar:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 12, height: 44, marginTop: 16 },
  searchInput:    { flex: 1, marginLeft: 8, fontSize: 14 },
  categoryList:   { marginTop: 16, marginBottom: 8 },
  chip:           { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', marginRight: 8 },
  chipActive:     { backgroundColor: '#1A1A2E' },
  chipText:       { fontSize: 13, color: '#4B5563', fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  grid:           { paddingBottom: 24 },
  row:            { justifyContent: 'space-between' },
  emptyText:      { textAlign: 'center', color: '#9AA5B1', marginTop: 40 },
});
