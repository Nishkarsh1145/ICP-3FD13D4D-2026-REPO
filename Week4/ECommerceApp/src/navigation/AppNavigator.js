import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen           from '../screens/HomeScreen';
import ProductDetailScreen  from '../screens/ProductDetailScreen';
import CartScreen           from '../screens/CartScreen';
import CheckoutScreen       from '../screens/CheckoutScreen';

// Week 4: single stack navigator.
// Bottom tabs with Order History will be added in Week 5.
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home"          component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart"          component={CartScreen} />
        <Stack.Screen name="Checkout"      component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
