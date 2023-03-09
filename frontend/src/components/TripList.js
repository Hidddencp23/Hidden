import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import TripRow from './TripRow';

const TripList = ({ navigation, displayTrips }) => {
    const [trips, setTrips] = useState([]);
    const { user, userInfo } = useAuth();
    useEffect(() =>
        onSnapshot(
            query(
                collection(db, 'Trips'), where("user", "==", user.uid),
                orderBy('tripPostTime', 'desc')
            ),
            (snapshot) => {
                setTrips(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
                console.log(trips)
            }
        ),
        [])



    return (
        <ScrollView>
             {displayTrips === "My Trips" ? (
          <>
                {trips.map((item) => <TripRow tripInfo={item} key={item.id} navigation={navigation} />)}
          </>
        ) : null}

        {displayTrips === "Liked Trips" ? (
          <>
                {trips.map((item) => <TripRow tripInfo={item} key={item.id} navigation={navigation} />)}
          </>
        ) : null}

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