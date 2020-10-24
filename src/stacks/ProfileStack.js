import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Profile from '../pages/Profile'
import EditProfile from '../pages/EditProfile'

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name ='EditProfile' component={EditProfile} />
        </Stack.Navigator>
    )
}