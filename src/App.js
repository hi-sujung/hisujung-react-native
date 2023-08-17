// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './utils/AuthContext'; // app에서 navigation을 AuthProvider로 감싸야 함
import MainComponent from './screens/myportfolio';
import LoginScreen from './screens/LoginScreen';
import ActivityScreen from './screens/ActivityScreen';
import ActListScreen from './screens/ActListScreen';
import RegisterScreen from './screens/RegisterScreen';
import EmailScreen from './screens/EmailScreen';
import SchoolActListScreen from './screens/SchoolActListScreen';
import SchoolActivityScreen from './screens/SchoolActivityScreen';
import MainScreen from './screens/MainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // for app test
    <AuthProvider> 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        /> 
      <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="SchoolActList"
          component={SchoolActListScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="SchollAct"
          component={SchoolActivityScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="ActList"
          component={ActListScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={{ headerShown: false }}
        /> 
        </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
  );
}