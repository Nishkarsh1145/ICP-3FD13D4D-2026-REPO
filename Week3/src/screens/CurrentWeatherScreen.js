import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocationContext } from '../context/LocationContext';
import { fetchWeather } from '../services/weatherApi';
import { getWeatherInfo } from '../services/weatherCodes';
import WeatherCard from '../components/WeatherCard';
import HourlyItem from '../components/HourlyItem';
import ForecastItem from '../components/ForecastItem';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

export default function CurrentWeatherScreen({ navigation }) {
  const { location, status, errorMessage, useDeviceLocation } = useLocationContext();
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadWeather = useCallback(async () => {
    if (!location) return;
    setWeatherError('');
    try {
  const data = await fetchWeather(location.latitude, location.longitude);

  console.log("WEATHER DATA:", JSON.stringify(data, null, 2));

  setWeather(data);
} catch (err) {
  console.log("FULL ERROR:", err);
  console.log("ERROR MESSAGE:", err.message);

  setWeatherError(JSON.stringify(err));
}
  }, [location]);

  useEffect(() => {
    if (status === 'ready' && location) {
      setWeatherLoading(true);
      loadWeather().finally(() => setWeatherLoading(false));
    }
  }, [status, location, loadWeather]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  }, [loadWeather]);

  // --- Location-level states (permission denied, GPS error, still loading) ---
  if (status === 'loading') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#2B6CB0' }]}>
        <LoadingView message="Getting your location..." />
      </SafeAreaView>
    );
  }

  if (status === 'permission_denied') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#2B6CB0' }]}>
        <ErrorView
          message="Location permission was denied, so we can't show weather for your current location."
          onRetry={useDeviceLocation}
          onSearchInstead={() => navigation.navigate('Search')}
        />
      </SafeAreaView>
    );
  }

  if (status === 'error') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#2B6CB0' }]}>
        <ErrorView message={errorMessage} onRetry={useDeviceLocation} onSearchInstead={() => navigation.navigate('Search')} />
      </SafeAreaView>
    );
  }

  // --- Weather-level states (location is ready, but weather fetch itself can fail) ---
  console.log("Location:", location);
console.log("Weather:", weather);
  const backgroundColor =
  weather?.current
    ? getWeatherInfo(weather.current.weatherCode, weather.current.isDay).color
    : '#2B6CB0';
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={useDeviceLocation} style={styles.headerButton}>
          <Ionicons name="locate-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.headerButton}>
          <Ionicons name="search-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {weatherLoading && !weather ? (
        <LoadingView message="Fetching the latest forecast..." />
      ) : weatherError && !weather ? (
        <ErrorView message={weatherError} onRetry={loadWeather} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" />}
        >
   {weather?.current ? (
  <WeatherCard
    locationLabel={location?.label ?? "Current Location"}
    current={weather.current}
  />
) : (
  <Text style={{ color: "white", textAlign: "center", marginTop: 30 }}>
    Loading weather...
  </Text>
)}
          <Text style={styles.sectionTitle}>ChatGPT TEST 123</Text>
          <FlatList
           data={weather?.hourly || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.time}
            contentContainerStyle={styles.hourlyList}
            renderItem={({ item, index }) => <HourlyItem hour={item} isNow={index === 0} />}
          />

          <Text style={styles.sectionTitle}>7-Day Forecast</Text>
          <View style={styles.forecastCard}>
            {(weather?.daily || []).map((day, index) => (
              <ForecastItem key={day.date} day={day} isToday={index === 0} />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { paddingBottom: 32 },
  sectionTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  hourlyList: { paddingHorizontal: 16 },
  forecastCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingHorizontal: 16,
  },
});
