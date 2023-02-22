import React from 'react';
import BottomTabNav from './BottomTabNav'
import { AuthStackNavigator } from './StackNav'
import useAuth from '../hooks/useAuth';


const Navigator = () => {
    const { user } = useAuth();

    return (
        <>
            {user ?
                (<BottomTabNav />) :
                <AuthStackNavigator />}
        </>
    );
}
export default Navigator