import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Dimensions 
} from 'react-native';

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
            <ChatScreenNavBar title={'Search Friends'}/>

            <FriendList/>
        </View>
    )
}

export default AddChatScreen