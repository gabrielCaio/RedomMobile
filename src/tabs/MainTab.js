import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

import Map from '../pages/Map';
import Gallery from "../pages/Gallery";
import Profile from '../pages/Profile'
import AddMarker from '../pages/AddMarker';
import Search from "../pages/Search";

export default () => {
  return (
    <Tab.Navigator 
      tabBar={(props) => <CustomTabBar {...props} />} 
      initialRouteName='Map'
      tabBarOptions={{ activeTintColor: "#eb5757", inactiveTintColor: "#f2f2f2" }}
    >
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="Search" component={Search} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="AddMarker" component={AddMarker} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
