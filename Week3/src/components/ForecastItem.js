import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getWeatherInfo } from '../services/weatherCodes';

export default function ForecastItem({ day, isToday }) {
  const date = new Date(day.date + 'T00:00:00');
  const label = isToday ? 'Today' : date.toLocaleDateString('en-IN', { weekday: 'short' });
  const info = getWeatherInfo(day.weatherCode, true);

  return (
    <View style={styles.row}>
      <Text style={styles.day}>{label}</Text>
      <View style={styles.iconWrap}>
        <Ionicons name={info.icon} size={20} color="#FFFFFF" />
        {day.precipitationProbability > 30 && (
          <Text style={styles.precip}>{day.precipitationProbability}%</Text>
        )}
      </View>
      <Text style={styles.tempMin}>{day.tempMin}°</Text>
      <View style={styles.tempBar}>
        <View style={styles.tempBarTrack} />
      </View>
      <Text style={styles.tempMax}>{day.tempMax}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  day: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', width: 64 },
  iconWrap: { width: 60, alignItems: 'center' },
  precip: { color: '#9FD3FF', fontSize: 10, marginTop: 2 },
  tempMin: { color: 'rgba(255,255,255,0.7)', fontSize: 13, width: 30, textAlign: 'right' },
  tempBar: { flex: 1, paddingHorizontal: 10 },
  tempBarTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 2 },
  tempMax: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', width: 30 },
});
