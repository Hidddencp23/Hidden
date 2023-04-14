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
    },
        [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>{location.name}</Text>
            </View>
            <ScrollView> 
            <Image source={{ uri: location.image }} style={styles.locImg} />
            <View style={styles.heartContainer}>
                <TouchableOpacity style={styles.heartBox}>
                            <Icon name="heart" size={20} style={styles.heartIcon} />
                </TouchableOpacity>
            </View>
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
        height: "100%",
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
      },
    actRow: {
        flexDirection: 'row',
        display: 'flex',
        paddingHorizontal: "5%",
        justifyContent: 'space-between'
    },
    locImg: {
        width: "90%",
        height: 200,
        // width: "90%",
        // height: "25%",
        borderRadius: 15,
        marginHorizontal: "5%",
        marginTop: "10%"
    },
    heartContainer:{
        position: "absolute",
        paddingTop: "15%",
        paddingLeft: "85%",
        paddingRight: "7%"
    },

    heartIcon: {
        color: "#BFBFBF",
    },
    heartBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: "1%",
        borderRadius: 5,
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
    titleView: {
        backgroundColor: 'white',
        position: 'absolute',
        width: "100%",
        zIndex: 1,
        paddingLeft: "5%",
        paddingHorizontal: "2.5%"

    },
    title: {
        color: "#6E6E6E",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 27,
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