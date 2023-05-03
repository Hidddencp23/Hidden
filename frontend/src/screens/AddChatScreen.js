import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";


import { collection, onSnapshot, orderBy, query, limit, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';

import FriendList from '../components/FriendList';
//import ChatList from '../components/ChatList';


import ChatScreenNavBar from '../components/NavBars/ChatScreenNavBar';


const AddChatScreen = ({ navigation }) => {

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
        });
      }, [navigation]);

    return (
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.Button} onPress={() =>
              navigation.navigate("MessagingScreen")
            }>
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Text style={styles.text}>New Message</Text>
          </View>

          <View style={styles.padDown}></View>
            <FriendList navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        zIndex: 1,
        position: 'absolute',
        height: 100,
        width: "100%",
        paddingBottom: "3%",
        paddingTop: "13%",
        paddingHorizontal: "5%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
    },    
    text: {
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    Button: {
        backgroundColor: "white",
        height: "100%",
        width: "10%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },
    padDown: {
        marginBottom: 100
    }
});
export default AddChatScreen