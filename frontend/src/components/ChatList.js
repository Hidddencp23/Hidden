import { Text, StyleSheet, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';
import ProxChatRow from './ProxChatRow';
import { proxChatLeftLimit } from '../constants/chatConstants';

const ChatList = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [proxChats, setProxChats] = useState([]);

    const { user, userInfo } = useAuth();

    const getProxChats = async () => {
        const querySnapshot = await getDocs(collection(db, "Users", user.uid, "proximityChats"));
        querySnapshot.forEach((doc) => {
            // let leftTimeDifference = 0
            // console.log(doc.data().leftProximity )
            // console.log(db.firestore.Timestamp.now().toDate())

            // if (doc.data().leftProximity != null){
            //     leftTimeDifference = serverTimestamp().toDate() - doc.data().leftProximity.toDate();
            //     console.log("Left time diff = " + leftTimeDifference)
            // }
            // if (leftTimeDifference > proxChatLeftLimit){
            //     deleteDoc(doc(db, "Users", user.uid, "proximityChats", doc.id)).catch(console.error)
            // }
            setProxChats([...proxChats, doc.data().chatId])
            console.log(doc.id, " => ", doc.data().chatId);
          });
      }



  


    useEffect(() =>
        {onSnapshot(
            query(
                collection(db, 'Chats'), where("users", "array-contains", user.uid),
                orderBy('latestTimestamp', 'desc')
            ),
            (snapshot) => {
                setChats(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
                console.log(chats)
            }
        );
        
        getProxChats().catch(console.error)
        },
        
        [])



    return (
        <ScrollView>
            <>
                {proxChats.map((item) => <ProxChatRow chatId={item} key={item} navigation={navigation} />)}
            </>
            <>
                {chats.map((item) => <ChatRow chatInfo={item} key={item.id} navigation={navigation} />)}
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