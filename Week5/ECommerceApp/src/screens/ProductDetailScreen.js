import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductById } from '../data/products';
import { formatPrice } from '../utils/currency';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Product not found.</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Alert.alert(
      'Added to Cart',
      `${product.name} (x${quantity}) added successfully.`,
      [
        { text: 'Keep Shopping', style: 'cancel' },
        { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#1A1A2E" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#FFB100" />
            <Text style={styles.ratingText}>{product.rating} rating</Text>
            <Text style={styles.stockText}> · {product.stock} in stock</Text>
          </View>

          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.descLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>Quantity</Text>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerPrice}>{formatPrice(product.price * quantity)}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#FFFFFF' },
  scroll:      { paddingBottom: 20 },
  imageWrapper:{ position: 'relative' },
  image:       { width: '100%', height: 300, backgroundColor: '#EEEEF2' },
  backBtn:     { position: 'absolute', top: 16, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  content:     { paddingHorizontal: 20, paddingTop: 16 },
  category:    { fontSize: 12, color: '#9AA5B1', textTransform: 'uppercase', letterSpacing: 0.5 },
  name:        { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginTop: 4 },
  ratingRow:   { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  ratingText:  { fontSize: 13, color: '#4B5563', marginLeft: 4 },
  stockText:   { fontSize: 13, color: '#9AA5B1' },
  price:       { fontSize: 24, fontWeight: '800', color: '#FF6B6B', marginTop: 12 },
  descLabel:   { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginTop: 20 },
  description: { fontSize: 14, color: '#4B5563', lineHeight: 21, marginTop: 6 },
  qtyRow:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 },
  qtyLabel:    { fontSize: 15, fontWeight: '600', color: '#1A1A2E' },
  footer:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#F0F0F3' },
  footerLabel: { fontSize: 12, color: '#9AA5B1' },
  footerPrice: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  addBtn:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A2E', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12 },
  addBtnText:  { color: '#FFFFFF', fontWeight: '700', marginLeft: 8 },
});
