import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import TripRow from './TripRow';

const TripList = ({ navigation, displayTrips, search }) => {
    const [trips, setTrips] = useState([]);
    const { user, userInfo } = useAuth();

    useEffect(() =>
    //console.log(userInfo[displayTrips]),
        
        onSnapshot(
            query(
                collection(db, 'Trips'), 
                orderBy("__name__"),
                where("__name__", "in", userInfo[displayTrips]),
            ),
            (snapshot) => {
                setTrips(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )

    
            }
            
        ),
        [])


    return (
        <ScrollView>
            {trips
            .filter(x => String(x.tripName).includes(search))
            .map((item) => <TripRow title={item.tripName} tripInfo={item} key={item.id} navigation={navigation} />)
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
    trips: {
        height: '100%'
    },
    messagingScreen: {
        paddingBottom: 75
    },
    maindiv: {
    },
});

export default TripList