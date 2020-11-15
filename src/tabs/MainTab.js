import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from '../components/CustomTabBar'

const Tab = createBottomTabNavigator();

import Map from '../pages/Map';
import Gallery from "../pages/Gallery";
import Profile from '../pages/Profile'
import Search from "../pages/Search";
import NewPost from '../pages/NewPost'

export default () => {
  return (
    <Tab.Navigator 
      tabBar={(props) => <CustomTabBar {...props} />} 
      initialRouteName='Map'
      tabBarOptions={{keyboardHidesTabBar: true, style: { position: 'absolute' }}}
    >
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="NewPost" component={NewPost} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
