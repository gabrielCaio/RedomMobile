import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Preload from '../pages/Preload'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import MainTab from '../tabs/MainTab'
import Details from '../pages/Details'
import EditProfile from '../pages/EditProfile'
import NewPlace  from '../pages/NewPlace'

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Preload' component={Preload} />
            <Stack.Screen name = 'SignIn' component={SignIn} />
            <Stack.Screen name = 'SignUp' component={SignUp} />
            <Stack.Screen name = 'MainTab' component={MainTab} />
            <Stack.Screen name = 'Details' component={Details} />
            <Stack.Screen name = 'EditProfile' component={EditProfile} />
            <Stack.Screen name = 'NewPlace' component={NewPlace} />
        </Stack.Navigator>
    )
}