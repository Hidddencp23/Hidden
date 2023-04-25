import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Dimensions,
    ScrollView
} from 'react-native';

import { collection, onSnapshot, orderBy, query, limit, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';

import FriendRow from './FriendRow';

export const FriendList = ({ navigation }) => {
    
    const [chats, setChats] = useState([]);
    const [proxChats, setProxChats] = useState([]);

    const [friends, setFriends] = useState([]);

    const { user, userInfo } = useAuth();


    // get friends list
    useEffect(() =>

        {onSnapshot(
            query(

                // get user documents for friends
                collection(db, 'Users'), where("friendList", "array-contains", user.uid),
                //orderBy('latestTimestamp', 'desc')
            ),
            (snapshot) => {
                
                setFriends(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )

            }
        );
        

        },
        
        [])
        


    return (
        <ScrollView style={{
            paddingTop: 25,
            height: '100%'
          }}>

            {friends.map((item) => <FriendRow friendInfo={item} key={item.id} navigation={navigation} />)}
        
        </ScrollView>
    )
}

export default FriendList
