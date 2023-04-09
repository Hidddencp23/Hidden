import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";

import moment from 'moment';

import Icon from "react-native-vector-icons/AntDesign";

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


  const timeAgo = chatInfo.latestTimestamp != null ? 
  moment.utc(chatInfo.latestTimestamp.toDate().toDateString()).local().startOf('seconds').fromNow(): "";

  const timeAgoNow = moment.utc(moment().toISOString()).local().startOf('seconds').fromNow()
  // moment().toISOString()
  console.log(timeAgoNow);


  if (timeAgo != timeAgoNow){
    console.log('diff time!')
    console.log("server timestamp: " + timeAgo);
    console.log("current time: " + timeAgoNow);
  }


 

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
        source={{ uri: chatUser.profilePic }}
      />

      <View style={styles.horizontal}>

        <View style>
          <Text style={styles.text}>
            {chatUser.name}
          </Text>
          <Text style={styles.messagePad}>{chatInfo.latestMessage}</Text>
        </View>

        <View style={styles.alignRight}>
          <Text style={styles.alignDate}>

            {timeAgo != timeAgoNow ?
              <>
                {timeAgo} 
              </>
              : 
              null
            }
          </Text>


          <View style={styles.arrowPad}>
            <Icon name="right" size={20} style={styles.arrow} />
          </View>
        </View>
        

      </View>
    </TouchableOpacity>


    
  )
}

const styles = StyleSheet.create({
  arrowPad: {
    paddingTop: 10
  },
  alignDate: {
    marginLeft: '50%', 
    fontWeight: "bold"
  },
  alignRight: {
    alignItems: 'flex-end'
  },
  messagePad: {
    paddingTop: 5
  },
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
    paddingBottom: 30,
    paddingTop: 30

  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  },
  horizontal: {
    flexDirection: 'row'
  },
  vertical: {
    flexDirection: 'column'
  },
  time: {
    textAlign: "right"
  }
});

export default ChatRow