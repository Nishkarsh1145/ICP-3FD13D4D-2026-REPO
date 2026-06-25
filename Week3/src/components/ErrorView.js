import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorView({ message, onRetry, onSearchInstead }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={48} color="#FFFFFF" />
      <Text style={styles.message}>{message}</Text>

      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}

      {onSearchInstead && (
        <TouchableOpacity style={styles.secondaryButton} onPress={onSearchInstead}>
          <Text style={styles.secondaryButtonText}>Search for a city instead</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  message: { color: '#FFFFFF', fontSize: 14, textAlign: 'center', marginTop: 14, lineHeight: 20 },
  button: {
    marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  secondaryButton: { marginTop: 14, paddingVertical: 8 },
  secondaryButtonText: { color: '#FFFFFF', opacity: 0.85, fontSize: 13, textDecorationLine: 'underline' },
});
