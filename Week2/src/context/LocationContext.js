import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';

// Week 2 — GPS-only location. City search will be added in Week 3.
const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null); // { latitude, longitude, label }
  const [status, setStatus]     = useState('loading'); // 'loading' | 'ready' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getDeviceLocation();
  }, []);

  async function getDeviceLocation() {
    setStatus('loading');
    try {
      const { status: perm } = await Location.requestForegroundPermissionsAsync();
      if (perm !== 'granted') {
        setErrorMsg('Location permission denied. Please grant permission and restart the app.');
        setStatus('error');
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = pos.coords;

      // Reverse-geocode using the native OS geocoder (no extra API key needed)
      let label = 'Current Location';
      try {
        const places = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (places && places.length > 0) {
          label = places[0].city || places[0].subregion || places[0].region || label;
        }
      } catch (_) {
        // Reverse geocoding failing is non-fatal — we still have coordinates.
      }

      setLocation({ latitude, longitude, label });
      setStatus('ready');
    } catch (err) {
      setErrorMsg('Could not get your location. Please try again.');
      setStatus('error');
    }
  }

  return (
    <LocationContext.Provider value={{ location, status, errorMsg, retry: getDeviceLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocationContext must be used within a LocationProvider');
  return ctx;
}
