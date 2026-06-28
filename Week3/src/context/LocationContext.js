import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext(null);

// status values: 'loading' | 'ready' | 'permission_denied' | 'error'
export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null); // { latitude, longitude, label }
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const useDeviceLocation = useCallback(async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const { status: permissionStatus } = await Location.requestForegroundPermissionsAsync();
      if (permissionStatus !== 'granted') {
        setStatus('permission_denied');
        return;
      }

      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const { latitude, longitude } = position.coords;

      // Reverse-geocode using the device's native geocoder (no extra API key needed).
      let label = 'Current Location';
      try {
        const places = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (places && places.length > 0) {
          const place = places[0];
          label = place.city || place.subregion || place.region || label;
        }
      } catch (geocodeErr) {
        // Reverse geocoding failing isn't fatal — we still have coordinates and can fetch weather.
        console.warn('Reverse geocoding failed:', geocodeErr);
      }

      setLocation({ latitude, longitude, label });
      setStatus('ready');
    } catch (err) {
      console.warn('Failed to get device location:', err);
      setErrorMessage('Could not determine your location. Please try again or search for a city instead.');
      setStatus('error');
    }
  }, []);

  const setManualLocation = useCallback((latitude, longitude, label) => {
    setLocation({ latitude, longitude, label });
    setStatus('ready');
    setErrorMessage('');
  }, []);

  useEffect(() => {
    useDeviceLocation();
  }, [useDeviceLocation]);

  const value = { location, status, errorMessage, useDeviceLocation, setManualLocation };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useLocationContext() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocationContext must be used within a LocationProvider');
  return ctx;
}
