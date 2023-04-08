import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Image, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { where, getDoc, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";

const Experience = ({ experience }) => {
    const [poster, setPoster] = useState("");
    const getUserNameFromUid = async (uid) => {
        const docRef = doc(db, "Users", uid);
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setPoster(docSnap.data());
            } else {
                console.log("Document does not exist")
            }
        
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserNameFromUid(experience.userId).then(() => {
        }).catch(console.error);
    }, [])
        return (
        <View>
            <View style={styles.horizView}>
                <Image source={{ uri: poster["profilePic"] }} style={styles.profImg}/>
                <Text style={styles.profName}> {poster["name"]}</Text>
            </View>
           
            <View>
                <Image source={{ uri: experience.image }} style={styles.locImg} /> 
                <Text style={styles.desc}>{experience.description}</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
      },
      horizView: {
        flexDirection: "row",
        alignItems:"center",
        marginTop: '3%'
      },
      locImg: {
        width: "90%",
        height: "40%",
        marginVertical: "2.5%",
        marginHorizontal: "5%",
        borderRadius: "15%"
    },
    profName: {
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 15,
        paddingVertical: "2.5%"
    },
    profImg: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginRight: 15,
        marginLeft: "5%",

    },
    desc: {
        marginHorizontal: "5%",
        color: "#6E6E6E",
     },
    });
export default Experience;