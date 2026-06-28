import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CurrentWeatherScreen from '../screens/CurrentWeatherScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={CurrentWeatherScreen}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
