import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../hooks/firebase';
import { useRoute } from '@react-navigation/native'
import Experience from '../components/Experience';
import { where, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'


const LocationScreen = ({ navigation }) => {
    const { params } = useRoute();
    const { location } = params;
    const [experiences, setExperiences] = useState([]);
    console.log("HERE")
    console.log(location);

    useEffect(() => {
        // retrieves experiences that belong to this location
        onSnapshot(
            query(
                collection(db, 'Experiences'),
                where("hiddenLocation", "==", location.id),
                orderBy('datePosted', 'desc')
            ),
            (snapshot) =>
                setExperiences(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
        );
        console.log("experiences");
        console.log(experiences);
    },
        [])

    return (
        <SafeAreaView>
            <Text>{location.name}</Text>
            <Text>{location.description}</Text>
            <Text>{location.address}</Text>
            <Text>Activity</Text>
            <ScrollView>
                {experiences.map((experience, index) => (
                    <Experience experience={experience} key={index} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


export default LocationScreen;