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


const AddChatScreen = ({ navigation }) => {


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
            <FriendList/>
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
        textAlign: 'center'
    },
    Button: {
        backgroundColor: "white",
        height: "100%",
        width: "10%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },
});
export default AddChatScreen