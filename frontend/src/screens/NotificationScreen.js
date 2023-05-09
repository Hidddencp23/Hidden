import React from "react";
import { View, Text, ScrollView } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/native'
import FriendRequest from '../components/FriendRequest'

const NotificationScreen = ({navigation}) => {
    const { user, userInfo } = useAuth();



    return (
        <ScrollView>
        <>
            {userInfo.incomingFriendRequests !== null ?
            <>
                {userInfo.incomingFriendRequests.map((item) => <FriendRequest requestUserId={item} key={item} navigation={navigation} />)}
            </>

            : null}
        </>
    </ScrollView>
    )
}


export default NotificationScreen;