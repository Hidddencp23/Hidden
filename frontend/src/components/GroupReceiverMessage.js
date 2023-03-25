import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";


const GroupReceiverMessage = ({ message, userUid }) => {
  const [sender, setSender] = useState(null)
  const getUserNameFromUid = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", uid));
    if (docSnap.exists()) {
      setSender(docSnap.data())
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  useEffect(() => {getUserNameFromUid(userUid).catch(console.error)}, [])

  return (
    <View style={{
      alignSelf: "flex-start",
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight:25,
      paddingTop: 10,
      marginHorizontal: 3,
      marginVertical: 2,
      marginHorizontal: 3,
      marginVertical: 2,
      backgroundColor: "grey",
      borderRadius: 15,
  }}>
      <Text style={{ color: "white" }}>{message.message}</Text>
      <Text style={{ color: "Black" }}>{sender != null ? sender.name : null}</Text>
    </View>
  )
}

export default GroupReceiverMessage