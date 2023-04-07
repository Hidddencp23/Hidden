import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, Image, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { where, getDoc, addDoc, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import { db } from "../hooks/firebase";


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
        <SafeAreaView>
            <Text>{poster["username"]}</Text>
            <Image source={{ uri: experience.image }} style={styles.locImg} />
            <Text>{experience.description}</Text>
            <Text>{experience.rating}</Text>
            <ScrollView>
                
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
      locImg: {
        width: "90%",
        height: "25%",
        borderRadius: 15,
    },
    });
export default Experience;