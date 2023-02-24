import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";

const ChatRow = ({ chatInfo, navigation }) => {
  const { user } = useAuth();
  const [chatUser, setChatUser] = useState("");
  const chatId = chatInfo.id
  console.log(chatInfo)
  const getUserNameFromUid = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", uid));
    if (docSnap.exists()) {
      setChatUser(docSnap.data())
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {
    onSnapshot(doc(db, "Chats", chatId), (doc) => {
      console.log("Chat Doc Changed");
      // console.log(doc)
      const otherUserUid = doc.data()["users"].filter(id => id != user.uid)[0]
      getUserNameFromUid(otherUserUid).catch(console.error)
    })
  }, [])


  return (
    <TouchableOpacity
      style={styles.messagecard}
      onPress={() => navigation.navigate("TextingScreen", {
        chatId, chatUser
      })
      }
    >
      <Image
        style={styles.profPic}
        source={{ uri: chatUser["profilePic"] }}
      />

      <View>
        <Text style={styles.text}>
          {chatUser["name"]}
        </Text>
        <Text>{chatInfo.latestMessage}</Text>
        <Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toDateString(): ""}</Text>
        <Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toLocaleTimeString(): ""}</Text>

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  profPic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15
  },
  messagecard: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    margin: 5,
    paddingBottom: 20,
    paddingTop: 20
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ChatRow