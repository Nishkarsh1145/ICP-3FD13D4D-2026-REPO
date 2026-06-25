import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherInfo } from '../services/weatherCodes';

export default function HourlyItem({ hour, isNow }) {
  const date = new Date(hour.time);
  const label = isNow ? 'Now' : date.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true });
  const info = getWeatherInfo(hour.weatherCode, true);

  return (
    <View style={styles.column}>
      <Text style={styles.time}>{label}</Text>
      <Ionicons name={info.icon} size={24} color="#FFFFFF" style={styles.icon} />
      <Text style={styles.temp}>{hour.temperature}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  column: { alignItems: 'center', width: 58 },
  time: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  icon: { marginVertical: 8 },
  temp: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});
