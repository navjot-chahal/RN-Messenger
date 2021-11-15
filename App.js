import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/useAuthContext';
import LoginScreen from './Screens/LoginScreen';
import NavigationStacks from './Components/NavigationStacks/NavigationStacks';
import RegisterScreen from './Screens/RegisterScreen';

export default function App() {
  return (
    <AuthProvider>
      <NavigationStacks />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
