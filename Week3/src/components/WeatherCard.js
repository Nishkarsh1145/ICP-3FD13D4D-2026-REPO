import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherInfo } from '../services/weatherCodes';

export default function WeatherCard({ locationLabel, current }) {
  const info = getWeatherInfo(current.weatherCode, current.isDay);
  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <View style={styles.container}>
      <Text style={styles.location}>{locationLabel}</Text>
      <Text style={styles.date}>{dateLabel}</Text>

      <View style={styles.mainRow}>
        <Ionicons name={info.icon} size={88} color="#FFFFFF" />
        <Text style={styles.temperature}>{current.temperature}°</Text>
      </View>

      <Text style={styles.description}>{info.label}</Text>
      <Text style={styles.feelsLike}>Feels like {current.feelsLike}°</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="water-outline" size={18} color="#FFFFFF" />
          <Text style={styles.detailValue}>{current.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Ionicons name="speedometer-outline" size={18} color="#FFFFFF" />
          <Text style={styles.detailValue}>{current.windSpeed} km/h</Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 12, paddingHorizontal: 20 },
  location: { color: '#FFFFFF', fontSize: 22, fontWeight: '700' },
  date: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  mainRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  temperature: { color: '#FFFFFF', fontSize: 72, fontWeight: '300', marginLeft: 8 },
  description: { color: '#FFFFFF', fontSize: 17, fontWeight: '600', marginTop: 4 },
  feelsLike: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 24,
    width: '100%',
  },
  detailItem: { flex: 1, alignItems: 'center' },
  detailDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.25)' },
  detailValue: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, marginTop: 4 },
  detailLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 2 },
});
