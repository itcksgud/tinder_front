// src/navigation/RootNavigator.tsx
import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

import AuthStack from './AuthStack';
import AppStack  from './AppStack';
import { useAuth } from '../context/AuthContext';

export default function RootNavigator() {
  const { auth, loading } = useAuth();
  const navRef = useRef<NavigationContainerRef<any>>(null);

  // 로그인/인증 상태가 바뀔 때마다 진입점을 리셋
  useEffect(() => {
    if (!loading && navRef.current) {
      const routeName = auth
        ? 'Explore'     // AppStack.initialRouteName 과 동일해야 함
        : 'Login';      // AuthStack.initialRouteName
      navRef.current.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: routeName }],
        })
      );
    }
  }, [auth, loading]);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navRef}>
      {auth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
