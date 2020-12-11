import { setStatusBarBackgroundColor, setStatusBarHidden, StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { AppLoading } from 'expo';
import { Domine_400Regular,Domine_700Bold, useFonts } from '@expo-google-fonts/domine'

import UserContext from './src/contexts/userContext'

import MainStack from './src/stacks/MainStack'

export default function App() {
  let [fontsLoaded] = useFonts({
    Domine_400Regular,
    Domine_700Bold
  });

  setStatusBarBackgroundColor("#003B4C", true)
  setStatusBarHidden(true, true)

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <UserContext>
      <StatusBar style="light" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContext>
  )
}