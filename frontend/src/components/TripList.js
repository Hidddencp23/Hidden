import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import TripRow from './TripRow';

const TripList = ({ navigation, displayTrips, otherUserInfo=null }) => {
    const [trips, setTrips] = useState([]);
    const { user, userInfo } = useAuth();

    //console.log('trips:')
    //console.log(trips[0]['experiences'])

    useEffect(() => {
        let displayUser = userInfo;
        if (otherUserInfo != null){
            displayUser = otherUserInfo;
        }
        if (displayUser[displayTrips].length > 0){
            onSnapshot(
                query(
                    collection(db, 'Trips'), 
                    orderBy("__name__"),
                ),
                (snapshot) => {
                    let locs = []
                    console.log("loc", locs)
                    snapshot.docs.forEach(doc => {
                        if(displayUser[displayTrips].includes(doc.id)){
                            locs.push({id: doc.id, ...doc.data()})
                        }        
                    }             
                    )
                    setTrips(locs)
                }
            )}},
        [userInfo])



    return (
        <ScrollView>
            {trips !== null ?
            <>
                {trips.map((item) => <TripRow tripInfo={item} key={item.id} navigation={navigation} />)}
            </> 
            : 
            null
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