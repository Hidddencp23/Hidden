import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import { StyleSheet, SafeAreaView } from 'react-native';
import ChatList from '../components/ChatList';
import useAuth from '../hooks/useAuth'
import TextingScreen from './TextingScreen';


const MessagingScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const [ currentChat, setCurrentChat] = useState(null);
  const [ currentChatUser, setCurrentChatUser] = useState(null);



  useEffect(() =>
      onSnapshot(
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
              // setChats({messages: chats.messages.reverse(), ...chats})
              console.log(" CHATLIST")
              console.log(snapshot.docs.map(doc => doc.id))
              snapshot.docChanges().forEach((change) => {
                console.log(change.doc.data())
                if (currentChat != null && currentChat.id == change.doc.data().id) {
                  console.log(" IM IFFFF")
                }
              });
              
              // console.log(chats)
          }
      ),
      [])

  return (
    <>
      
        {currentChat === null ?
        <ChatList chats={chats} setCurrentChat={setCurrentChat} setCurrentChatUser={setCurrentChatUser} navigation={navigation}/> 
      : <TextingScreen chats={chats} chatInfo={currentChat} chatUser={currentChatUser} setCurrentChat={setCurrentChat}/>}
    </>
  )
};

const styles = StyleSheet.create({

});

export default MessagingScreen;
