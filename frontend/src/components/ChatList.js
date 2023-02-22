import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const { user, userInfo } = useAuth();
    useEffect(() =>
        onSnapshot(
            query(
                collection(db, 'Chats'), where("users", "array-contains", user.uid),
                orderBy('latestTimestamp', 'desc')
            ),
            (snapshot) => {
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
                console.log(messages)
            }
        ),
        [])



    return (
        <ScrollView>
            <>
                {messages.map((item) => <ChatRow chatInfo={item} key={item.id} navigation={navigation} />)}
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