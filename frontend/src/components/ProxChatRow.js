import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import GroupTextingScreen from '../screens/GroupTextingScreen';

import Icon from "react-native-vector-icons/AntDesign";

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


      <View style={styles.horizontal}>
        <Text style={styles.text}>
          {chatInfo.name}
        </Text>

        <View style={styles.arrowPad}>
            <Icon name="right" size={20} style={styles.arrow} />
        </View>

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
  },
  arrowPad: {
    paddingTop: 0
  },
  arrow: {
    color: '#9e9e9e'
  },
  alignDate: {
    marginLeft: '50%', 
    fontWeight: "bold",
    color: '#9e9e9e'
  },
  alignRight: {
    alignItems: 'flex-end'
  },
  messagePad: {
    paddingTop: 5,
    paddingLeft: 5,
    color: '#9e9e9e'
  },
  horizontal: {
    flexDirection: 'row',
    flex: 1, 
    justifyContent: 'space-between',
  
  },
  vertical: {
    flexDirection: 'column'
  },
  time: {
    textAlign: "right"
  }
});

export default ProxChatRow