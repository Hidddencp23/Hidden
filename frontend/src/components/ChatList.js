import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = ({  chats, setCurrentChat, setCurrentChatUser, navigation }) => {
    // const [chats, setChats] = useState([]);
    const { user } = useAuth();
    let x = 0;
    // useEffect(() =>
    //     onSnapshot(
    //         query(
    //             collection(db, 'Chats'), where("users", "array-contains", user.uid),
    //             orderBy('latestTimestamp', 'desc')
    //         ),
    //         (snapshot) => {
    //             setChats(
    //                 snapshot.docs.map(doc => ({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 }))
    //             )
    //             setChats({messages: chats.messages.reverse(), ...chats})
    //             console.log(" CHATLIST")

    //             console.log(chats)
    //         }
    //     ),
    //     [])



    return (
        <ScrollView>
            <>
                {chats.map((item) => <ChatRow setCurrentChat={setCurrentChat} setCurrentChatUser={setCurrentChatUser} chatInfo={item} key={item.id} navigation={navigation} />)}
            </>

        </ScrollView>
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