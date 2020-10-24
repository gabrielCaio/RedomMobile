import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'

import UserContext from './src/contexts/userContext'

import MainStack from './src/stacks/MainStack'

export default function App() {

  setStatusBarBackgroundColor("#262626", true);

  return (
    <UserContext>
      <NavigationContainer>
        <MainStack />
        <StatusBar style="light" />
      </NavigationContainer>
    </UserContext>
  );
}