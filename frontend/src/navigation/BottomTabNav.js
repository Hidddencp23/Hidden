// ./navigation/TabNavigator.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, SearchStackNavigator, TripStackNavigator, ChatStackNavigator, ProfileStackNavigator } from "./StackNav";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const activeColor = "#1D92FF"
const inActiveColor = "#9DB2CE"

const HomeTabOptions = {
  tabBarIcon: (tabInfo) => {
    return (
      <Ionicons
        name="home"
        size={24}
        color={tabInfo.focused ? activeColor : inActiveColor}
      />
    );
  }
}

// const SearchTabOptions = {
//   tabBarIcon: (tabInfo) => {
//     return (
//       <Ionicons
//         name="search"
//         size={24}
//         color={tabInfo.focused ? activeColor : inActiveColor}
//       />
//     );
//   }
// }

const ChatTabOptions = {
  tabBarIcon: (tabInfo) => {
    return (
      <Ionicons
        name="chatbubble-sharp"
        size={24}
        color={tabInfo.focused ? activeColor : inActiveColor}
      />
    );
  }
}

const ProfileTabOptions = {
  headerShown: false,
  tabBarIcon: (tabInfo) => {
    return (
      <Ionicons
        name="md-person"
        size={24}
        color={tabInfo.focused ? activeColor : inActiveColor}
      />
    );
  }
}

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={HomeTabOptions}/>
      {/* <Tab.Screen name="Search" component={SearchStackNavigator} options={SearchTabOptions}/> */}
      <Tab.Screen name="Chat" component={ChatStackNavigator} options={ChatTabOptions}/>
      <Tab.Screen name="Profile" component={ProfileStackNavigator} options={ProfileTabOptions} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;