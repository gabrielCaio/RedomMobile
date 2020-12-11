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
import AddMarker from '../pages/AddMarker'
import SeeProfile from '../pages/SeeProfile'
import Updates from '../pages/Updates'
import FocusOnNews from '../pages/FocusOnNews'

// Personal to user
import MyPlaces from '../pages/MyPlaces'
import ApprovePlaces from '../pages/ApprovePlaces'
import UploadImages from '../pages/UploadImagesPlace'

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
            <Stack.Screen name = 'MyPlaces' component={MyPlaces} />
            <Stack.Screen name = 'ApprovePlaces' component={ApprovePlaces} />
            <Stack.Screen name = 'UploadImages' component={UploadImages} />
            <Stack.Screen name = 'AddMarker' component={AddMarker} />
            <Stack.Screen name = 'SeeProfile' component={SeeProfile} />
            <Stack.Screen name = 'Updates' component={Updates} />
            <Stack.Screen name = 'FocusOnNews' component={FocusOnNews} />
        </Stack.Navigator>
    )
}