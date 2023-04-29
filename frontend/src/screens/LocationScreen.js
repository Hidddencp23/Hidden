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
    const [likeLocation, setLikeLocation] = useState(false);
    const handleLike = async () => {
        if(likeLocation == false)
        {
            setLikeLocation(true)
        }
        else {
            setLikeLocation(false)
        }
      }
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
                <TouchableOpacity style={styles.heartBox} onPress={handleLike}>
                {likeLocation ? (<Icon name="heart" size={20} style={styles.isliked} />) : (<Icon name="heart" size={20} style={styles.notliked} />)}
                </TouchableOpacity>
            </View>
                <Text style={styles.descTitle}>Description</Text>
                <Text style={styles.desc}>{location.description}</Text>
            
            <View style={styles.actRow}>
                <Text style={styles.actTitle}>Activity</Text>
                <TouchableOpacity style={styles.addIcon} onPress={() => navigation.navigate("AddExperienceScreen", {
                    location})}>
                    <Icon name="plus" size={20} />
                </TouchableOpacity>
            </View>
            {experiences.map((experience, index) => <Experience navigation={navigation} experience={experience} key={index} />)}
           
            </ScrollView>
          </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: "100%",
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
    notliked: {
        color: "#BFBFBF",
    },
    isliked: {
        color: "#D42638",
    },
    heartBox: {
        alignItems: 'center',
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
        paddingVertical: "2.5%",
        

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
        alignItems: 'center',
        zIndex: 1,

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