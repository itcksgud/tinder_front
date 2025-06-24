// src/navigation/AppStack.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Explore  from '../screens/app/Explore';
import Matches  from '../screens/app/Matches';
import Messages from '../screens/app/Messages';
import Profile  from '../screens/app/Profile';

export type AppTabParamList = {
  Explore:  undefined;
  Matches:  undefined;
  Messages: undefined;
  Profile:  undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Explore':  iconName = 'search-outline';            break;
            case 'Matches':  iconName = 'heart-outline';             break;
            case 'Messages': iconName = 'chatbubble-ellipses-outline'; break;
            case 'Profile':  iconName = 'person-outline';            break;
            default:         iconName = 'help-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:   '#7B61FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Explore"  component={Explore}  />
      <Tab.Screen name="Matches"  component={Matches}  />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile"  component={Profile}  />
    </Tab.Navigator>
  );
}
