import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator();
const ShopStack = createNativeStackNavigator();

// The "shopping" flow (browse -> detail -> cart -> checkout -> confirmation)
// lives inside a single stack so the back button and headers behave naturally,
// while still being accessible from the bottom tab bar.
function ShopStackNavigator() {
  return (
    <ShopStack.Navigator screenOptions={{ headerShown: false }}>
      <ShopStack.Screen name="Home" component={HomeScreen} />
      <ShopStack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <ShopStack.Screen name="Cart" component={CartScreen} />
      <ShopStack.Screen name="Checkout" component={CheckoutScreen} />
      <ShopStack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
    </ShopStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#1A1A2E',
          tabBarInactiveTintColor: '#9AA5B1',
          tabBarIcon: ({ color, size }) => {
            const iconName = route.name === 'HomeTab' ? 'storefront-outline' : 'receipt-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="HomeTab" component={ShopStackNavigator} options={{ title: 'Shop' }} />
        <Tab.Screen name="OrdersTab" component={OrderHistoryScreen} options={{ title: 'Orders' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
