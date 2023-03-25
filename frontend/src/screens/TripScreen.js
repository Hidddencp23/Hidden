import React from "react";
import { View, Text } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useRoute } from '@react-navigation/native'


const TripScreen = ({navigation}) => {
    const { user } = useAuth();
    const {params} = useRoute();
    const { tripInfo } = params;
    return (
        <View>
            <Text>About {tripInfo.author}'s trip to {tripInfo.tripName}</Text>
        </View>
    )
}


export default TripScreen;