import React from 'react';
import BottomTabNav from './BottomTabNav'
import { AuthStackNavigator } from './StackNav'
import useAuth from '../hooks/useAuth';


const Navigator = () => {
    const { user, userInfo } = useAuth();

    return (
        <>
            {(userInfo && user) ?
                (<BottomTabNav />) :
                <AuthStackNavigator />}
        </>
    );
}
export default Navigator