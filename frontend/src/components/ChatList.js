import { Text, StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = ({ navigation }) => {
    const [messages, setmessages] = useState([]);
    const { user } = useAuth();

    useEffect(() => 
        onSnapshot(query(collection(db, 'notifs'), where('usermatched', 'array-contains', user.uid)),
        (snapshot) =>
            setmessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        ), []);

    return (
        messages.length > 0 ? (
            <FlatList
             data={messages}
             keyExtractor={item => item.id}
             renderItem={({item}) => <ChatRow matchDetails={item} navigation={navigation}/>}/>
        ) : (
            <View>
                <Text>No Current Messages</Text>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    text: {
      fontSize: 30,
    },
    messages: {
      height: '100%'
    },  
    messagingScreen: {
      paddingBottom: 75
    },
    maindiv: {
    },
  });

export default ChatList