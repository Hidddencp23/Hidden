import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from "../screens/HomeScreen";
import MessagingScreen from '../screens/MessagingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TopNavBar from '../components/TopNavBar';
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
import ProfileScreenNavBar from '../components/ProfileScreenNavBar';

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};


const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />

        </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
        </Stack.Navigator>
    );
}


const ChatStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="TextingScreen" component={TextingScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="GroupTextingScreen" component={GroupTextingScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />

        </Stack.Navigator>
    );
}

const ProfileStackNavigator = () => {
    
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: ({ navigation }) => <ProfileScreenNavBar navigation={navigation} /> }} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="TripScreen" component={TripScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
            <Stack.Screen name="TripDiaryScreen" component={TripDiaryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTripScreen" component={AddTripScreen} options={{ headerShown: false }} />
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
