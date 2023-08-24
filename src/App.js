// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './utils/AuthContext'; // app에서 navigation을 AuthProvider로 감싸야 함
import MyportfolioScreen from './screens/MyportfolioScreen';
import LoginScreen from './screens/LoginScreen';
import ActivityScreen from './screens/ActivityScreen';
import ActListScreen from './screens/ActListScreen';
import RegisterScreen from './screens/RegisterScreen';
import EmailScreen from './screens/EmailScreen';
import SchoolActListScreen from './screens/SchoolActListScreen';
import SchoolActivityScreen from './screens/SchoolActivityScreen';
import MainScreen from './screens/MainScreen';
import PortfolioListScreen from './screens/PortfolioListScreen';
import viewNoticeLike from './screens/viewNoticeLike';
import ChatScreen from './screens/ChatScreen';
import CreatePortfolioScreen from './screens/CreatePortfolioScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // for app test
    <AuthProvider> 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 이메일 인증 */}
        <Stack.Screen
          name="Email"
          component={EmailScreen}
          options={{ headerShown: false }}
        />
        {/* 회원가입 */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        /> 
        {/* 로그인 */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        /> 
        {/* 메인 화면 */}
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        /> 
        {/* 좋아요 리스트 */}
        <Stack.Screen
          name="viewNoticeLike"
          component={viewNoticeLike}
          options={{ headerShown: false }}
        />

        {/* 챗봇 */}
        <Stack.Screen
            name="chatBotScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          />

        {/* 포트폴리오 리스트 */}
        <Stack.Screen
          name="PortfolioList"
          component={PortfolioListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 포트폴리오 생성 페이지 */}
        <Stack.Screen
          name="CreatePortfolio"
          component={CreatePortfolioScreen}
          options={{ headerShown: false }}
        /> 
        {/* 포트폴리오 상세페이지 */}
        <Stack.Screen
          name="myportfolio"
          component={MyportfolioScreen}
          options={{ headerShown: false }}
        />
        {/* 교내활동 리스트 */}
        <Stack.Screen
          name="SchoolActList"
          component={SchoolActListScreen}
          options={{ headerShown: false }}
        />
        {/* 교내활동 상세 페이지  */}
        <Stack.Screen
          name="SchoolAct"
          component={SchoolActivityScreen}
          options={{ headerShown: false }}
        />
        {/* 대외활동 리스트 */}
        <Stack.Screen
          name="ActList"
          component={ActListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 대외활동 상세 페이지 */}
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