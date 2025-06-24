// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 실제 화면 파일 위치에 맞춰 경로 수정
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import VerifyEmail from '../screens/auth/VerifyEmail';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  VerifyEmail: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    </Stack.Navigator>
  );
}