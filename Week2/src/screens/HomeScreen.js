import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator,
  TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocationContext } from '../context/LocationContext';
import { fetchWeather } from '../services/weatherApi';
import { getWeatherInfo } from '../services/weatherCodes';
import WeatherCard from '../components/WeatherCard';
import HourlyItem from '../components/HourlyItem';
import ForecastItem from '../components/ForecastItem';

export default function HomeScreen() {
  const { location, status, errorMsg, retry } = useLocationContext();
  const [weather, setWeather]     = useState(null);
  const [loading, setLoading]     = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (status === 'ready' && location) {
      loadWeather();
    }
  }, [status, location]);

  async function loadWeather() {
    setLoading(true);
    setFetchError('');
    try {
      const data = await fetchWeather(location.latitude, location.longitude);
      setWeather(data);
    } catch (err) {
      setFetchError('Could not load weather data. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  const bgColor = weather
    ? getWeatherInfo(weather.current.weatherCode, weather.current.isDay).color
    : '#2B6CB0';

  // --- Location loading ---
  if (status === 'loading') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#2B6CB0' }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.statusText}>Getting your location…</Text>
      </SafeAreaView>
    );
  }

  // --- Location error ---
  if (status === 'error') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#2B6CB0' }]}>
        <Ionicons name="cloud-offline-outline" size={48} color="#FFFFFF" />
        <Text style={styles.statusText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={retry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- Weather loading ---
  if (loading && !weather) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.statusText}>Loading weather…</Text>
      </SafeAreaView>
    );
  }

  // --- Weather fetch error ---
  if (fetchError && !weather) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
        <Ionicons name="wifi-outline" size={48} color="#FFFFFF" />
        <Text style={styles.statusText}>{fetchError}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadWeather}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- Weather ready ---
  return (
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: bgColor }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <WeatherCard locationLabel={location.label} current={weather.current} />

        <Text style={styles.sectionTitle}>Next 24 Hours</Text>
        <FlatList
          data={weather.hourly}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.time}
          contentContainerStyle={styles.hourlyList}
          renderItem={({ item, index }) => (
            <HourlyItem hour={item} isNow={index === 0} />
          )}
        />

        <Text style={styles.sectionTitle}>7-Day Forecast</Text>
        <View style={styles.forecastBox}>
          {weather.daily.map((day, i) => (
            <ForecastItem key={day.date} day={day} isToday={i === 0} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  screenContainer: { flex: 1 },
  statusText: {
    color: '#FFFFFF', marginTop: 16, fontSize: 14, textAlign: 'center',
  },
  retryBtn: {
    marginTop: 20, backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10,
  },
  retryText: { color: '#FFFFFF', fontWeight: '700' },
  scroll: { paddingBottom: 32 },
  sectionTitle: {
    color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '700',
    marginTop: 28, marginBottom: 12, marginHorizontal: 20,
  },
  hourlyList: { paddingHorizontal: 16 },
  forecastBox: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16, marginHorizontal: 20, paddingHorizontal: 16,
  },
});
