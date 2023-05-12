import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import ReactNavigation from "react-navigation";

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from "../screens/HomeScreen";
import MessagingScreen from '../screens/MessagingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TopNavBar from '../components/NavBars/TopNavBar';
import useAuth from '../hooks/useAuth';
import TextingScreen from '../screens/TextingScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SearchScreen from '../screens/SearchScreen';
import TripScreen from '../screens/TripScreen';
import TripDiaryScreen from '../screens/TripDiaryScreen';
import AddTripScreen from '../screens/AddTripScreen';
import GroupTextingScreen from '../screens/GroupTextingScreen';
import LocationScreen from '../screens/LocationScreen';
import AddChatScreen from '../screens/AddChatScreen';
import ProfileScreenNavBar from '../components/NavBars/ProfileScreenNavBar';
import MessagingScreenNavBar from '../components/NavBars/MessagingScreenNavBar';
//import ChatScreenNavBar from '../components/NavBars/ChatScreenNavBar';
import GeneralNavBar from '../components/NavBars/EditProfileNavBar';
import OtherProfileScreen from '../screens/OtherProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AddLocationScreen from '../screens/AddLocationScreen';
import AddExperienceScreen from '../screens/AddExperienceScreen';
import SearchNavBar from '../components/SearchNavBar';
import LocationNav from '../components/LocationNav';

//import { CardStyleInterpolators } from '@react-navigation/stack';



const Stack = createNativeStackNavigator();

const screenOptionStyle = {

    headerStyle: {
        backgroundColor: "#9AC4F8",
        position: 'sticky'
    },
    headerTintColor: "white",
    headerBackTitle: "Back",

    // used for newer versions of react-navigation/stack
    //cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
    //cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

    //animation: "slide_from_right",
    animation: "slide_from_bottom"
};



const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ header: ({ navigation }) => <SearchNavBar navigation={navigation} /> }} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ animation: "slide_from_right", header: ({ navigation }) => <LocationNav navigation={navigation} /> }}/>
            <Stack.Screen name="AddExperienceScreen" component={AddExperienceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddLocationScreen" component={AddLocationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OtherProfileScreen" component={OtherProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ header: ({ navigation }) => <SearchNavBar navigation={navigation} /> }} />
        </Stack.Navigator>
    );
}


// header: ({ navigation }) => <ChatScreenNavBar navigation={navigation} /> }}
// header: ({ navigation }) => <ChatScreenNavBar navigation={navigation} />

const ChatStackNavigator = () => {
    return (

            <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{ header: ({ navigation }) => <MessagingScreenNavBar navigation={navigation} /> }} />
                <Stack.Screen name="TextingScreen" component={TextingScreen} options={{ animation: "slide_from_right", headerShown: false }}  />
                <Stack.Screen name="GroupTextingScreen" component={GroupTextingScreen} options={{ animation: "slide_from_right", headerShown: false }} />
                <Stack.Screen name="AddChatScreen" component={AddChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>

    );
}

const ProfileStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: ({ navigation }) => <ProfileScreenNavBar navigation={navigation} /> }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ header: ({ navigation }) => <GeneralNavBar navigation={navigation} title = "Settings"/> }}/>
            <Stack.Screen name="TripScreen" component={TripScreen} options={{ animation: "slide_from_right", header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="TripDiaryScreen" component={TripDiaryScreen} options={{ animation: "slide_from_right", headerShown: false }} />
            <Stack.Screen name="AddTripScreen" component={AddTripScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddExperienceScreen" component={AddExperienceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: true }} />
            <Stack.Screen name="OtherProfileScreen1" component={OtherProfileScreen} options={{ header: ({ navigation }) => <GeneralNavBar navigation={navigation} title="Profile" /> }} />

            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ animation: "slide_from_right", header: ({ navigation }) => <LocationNav navigation={navigation} /> }}/>
            <Stack.Screen name="AddLocationScreen" component={AddLocationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: '' }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }} />
        </Stack.Navigator>
    );
}

export { HomeStackNavigator, SearchStackNavigator, ChatStackNavigator, ProfileStackNavigator, AuthStackNavigator };
