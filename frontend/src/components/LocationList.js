import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import LocationRow from './LocationRow';

const LocationList = ({ navigation, locations }) => {
    // const [locations, setLocations] = useState([]);
    const { user, userInfo } = useAuth();

    let likedKey = 0;

    return (
        <ScrollView>
            <>
            {locations.map((item) => <LocationRow locInfo={item} key={likedKey++} navigation={navigation} />)}
            </>

        </ScrollView>
    )
}

export default LocationList