import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import GroupTextingScreen from '../screens/GroupTextingScreen';

const ProxChatRow = ({ chatId, navigation }) => {
  const { user } = useAuth();
  const [ chatInfo, setChatInfo ] = useState(null);
  console.log("ProxChatId =" + chatId)
  

  useEffect(() => {
    onSnapshot(doc(db, "ProximityChats", chatId), (doc) => {
      console.log("Prox Chat Doc Changed");
      // console.log(doc)
      setChatInfo(doc.data())
    })
  }, [])


  return (
    <>
{ chatInfo != null ?   (<TouchableOpacity
      style={styles.messagecard}
      onPress={() => navigation.navigate("GroupTextingScreen", {
        chatId, chatInfo
      })
      }
    >
      <Image
        style={styles.profPic}
        source={{ uri: chatInfo.chatPic }}
      />

      <View>
        <Text style={styles.text}>
          {chatInfo.name}
        </Text>
        {/* <Text>{chatInfo.latestMessage}</Text>
        <Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toDateString(): ""}</Text>
        <Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toLocaleTimeString(): ""}</Text> */}

      </View>
    </TouchableOpacity>) : null}
  
  </>
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

export default ProxChatRow