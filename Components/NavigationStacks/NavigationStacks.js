import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../context/useAuthContext';
import LoginScreen from '../../Screens/LoginScreen';
import RegisterScreen from '../../Screens/RegisterScreen';
import TasksScreen from '../../Screens/TasksScreen';
import Dashboard from '../../Screens/Dashboard';

const loginStack = createNativeStackNavigator();
const loggedInStack = createNativeStackNavigator();

const NavigationStacks = () => {
  const { loggedInUser } = useAuth();

  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#4287f5',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  };

  if (loggedInUser === undefined) return <Text>Loading screen</Text>;

  return (
    <>
      {loggedInUser ? (
        <NavigationContainer>
          <loginStack.Navigator screenOptions={globalScreenOptions}>
            <loginStack.Screen name="Dashboard" component={Dashboard} />
            <loginStack.Screen name="Tasks" component={TasksScreen} />
          </loginStack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <loggedInStack.Navigator screenOptions={globalScreenOptions}>
            <loggedInStack.Screen name="Login" component={LoginScreen} />
            <loggedInStack.Screen name="Register" component={RegisterScreen} />
          </loggedInStack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default NavigationStacks;

const styles = StyleSheet.create({});
