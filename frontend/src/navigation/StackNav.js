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

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
                    <Stack.Screen name="MessagingScreen" component={MessagingScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
                    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />
                    <Stack.Screen name="TextingScreen" component={TextingScreen} options={{ header: ({ navigation }) => <TopNavBar navigation={navigation} /> }} />

                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}  options={{ title: '' }}/>
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }} />
                </>
            )}

        </Stack.Navigator>
    );
};

export default StackNavigator;
