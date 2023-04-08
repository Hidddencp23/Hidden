import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, SafeAreaView, Image, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../hooks/firebase';
import { useRoute } from '@react-navigation/native'
import Experience from '../components/Experience';
import { where, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import Icon from "react-native-vector-icons/AntDesign";


const LocationScreen = ({ navigation }) => {
    const { params } = useRoute();
    const { location } = params;
    const [experiences, setExperiences] = useState([]);
    const descParagraph = 
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
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
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: location.image }} style={styles.locImg} />
            <TouchableOpacity style={styles.heartBox}>
                        <Icon name="heart" size={20} style={styles.heartIcon} />
            </TouchableOpacity>
            <ScrollView>
           
                <Text style={styles.title2}>{location.name}</Text>
                <Text style={styles.descTitle}>Description</Text>
                <Text style={styles.desc}>{descParagraph}</Text>
            
            <View style={styles.actRow}>
                <Text style={styles.actTitle}>Activity</Text>
                <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate("AddExperienceScreen", {
                    location})}>
                    <Icon name="plus" size={20} />
                </TouchableOpacity>
            </View>
            {experiences.map((experience, index) => <Experience experience={experience} key={index} />)}
           
            </ScrollView>
          </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
      },
    circle: {
        position:'absolute',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').width * 2,
        top: -1 * (Dimensions.get('window').height * .88),
        left: -1 * (Dimensions.get('window').width * .5),
        backgroundColor:'#83C3FF',
        justifyContent: 'center',
        alignItems: 'center',
        },
    actRow: {
        flexDirection: 'row',
        display: 'flex',
        paddingHorizontal: "5%",
        justifyContent: 'space-between'
    },
    locImg: {
        width: "90%",
        height: "25%",
        borderRadius: 15,
    },
    heartIcon: {
        color: "#BFBFBF",
    },
    heartBox: {
        top: "2%",
        right: "8%",
        alignItems: 'center',
        justifyContent: 'center',
        padding: "1%",
        borderRadius: 5,
        position: "absolute",
        backgroundColor: "white"
    },
    descTitle: {
        marginLeft: "5%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20,
        paddingVertical: "2.5%"

    },
    actTitle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20,

    },
    title2: {
        marginLeft: "5%",
        color: "#6E6E6E",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 27,
        paddingVertical: "2.5%"
    },
    desc: {
       padding: "5%",
        color: "#6E6E6E",
    },
    addIcon: {
        backgroundColor:"#83C3FF",
        borderRadius: "100%",
        padding: "1.5%"
       
    }

})

export default LocationScreen;