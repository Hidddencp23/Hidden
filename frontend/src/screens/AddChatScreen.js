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


const AddChatScreen = ({ navigation }) => {


    return (
        <View>

            <FriendList/>
        </View>
    )
}

export default AddChatScreen