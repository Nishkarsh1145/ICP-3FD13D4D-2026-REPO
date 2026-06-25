import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchCities } from '../services/geocodingApi';
import { useLocationContext } from '../context/LocationContext';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);
  const { setManualLocation } = useLocationContext();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setError('');
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const cities = await searchCities(query);
        setResults(cities);
      } catch (err) {
        setError(err.message || 'Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSelect = (city) => {
    const label = [city.name, city.admin1].filter(Boolean).join(', ');
    setManualLocation(city.latitude, city.longitude, label || city.name);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.title}>Search City</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#9AA5B1" />
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          value={query}
          onChangeText={setQuery}
          autoFocus
          returnKeyType="search"
        />
        {loading && <ActivityIndicator size="small" color="#2B6CB0" />}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultRow} onPress={() => handleSelect(item)}>
              <Ionicons name="location-outline" size={18} color="#2B6CB0" />
              <View style={styles.resultText}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultSubtext}>
                  {[item.admin1, item.country].filter(Boolean).join(', ')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && query.trim().length >= 2 ? (
              <Text style={styles.emptyText}>No cities found for "{query}".</Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F5FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginHorizontal: 20,
    marginTop: 8,
  },
  input: { flex: 1, marginLeft: 8, fontSize: 14 },
  list: { paddingHorizontal: 20, paddingTop: 16 },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  resultText: { marginLeft: 12 },
  resultName: { fontSize: 15, fontWeight: '600', color: '#1A1A2E' },
  resultSubtext: { fontSize: 12, color: '#9AA5B1', marginTop: 2 },
  emptyText: { textAlign: 'center', color: '#9AA5B1', marginTop: 40, fontSize: 14 },
  errorText: { textAlign: 'center', color: '#FF6B6B', marginTop: 40, paddingHorizontal: 20 },
});
