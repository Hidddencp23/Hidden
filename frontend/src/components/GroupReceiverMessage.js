import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";

import moment from 'moment'; 

const GroupReceiverMessage = ({ message, userUid }) => {
  const [sender, setSender] = useState(null)

  let hours = null;
  let minutes = null;

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();


  // current time on client side
  const currentTime = moment().toDate();

  
  
  if (typeof message !== 'undefined'){
      if (message.timestamp !== null){
        if (datesAreOnSameDay(message.timestamp.toDate(), currentTime)){
        
          // server timestamp
          const serverDate = new Date(message.timestamp.toDate());

          // local time
          const local = serverDate.toLocaleString();

          //console.log(local)
          hours = serverDate.getHours();
 
          var ampm = hours >= 12 ? 'PM' : 'AM';

          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'

          minutes = ('0' + serverDate.getMinutes()).slice(-2);

        }

      }
  }

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

    <>
    <View style={{
      flexDirection: 'row'
    }}>


    {sender != null ?
      <Image
        source={{ uri: /* profilepicTest */  sender.profilePic }}
        alt="Avatar"
        style={{
        position: 'relative',
        height: 50,
        width: 50,
        borderRadius: 100,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: 'black',
        marginTop: '7.5%',
        marginBottom: '5%',
        zIndex: 1
        }}
      /> 
      : null
      
    }

    <View style={{
      alignSelf: "flex-start", 
      paddingBottom: 10,
      paddingLeft: 25,
      paddingRight:25,
      paddingTop: 10,
      marginHorizontal: 3,
      marginVertical: 2,
      marginHorizontal: 3, // move right
      marginVertical: 2,
      backgroundColor: "#D3D3D3",
      borderRadius: 15,
      marginTop: 25,
      marginLeft: 10,

  }}>
      <Text style={{ color: "black" }}>{message.message}</Text>
      <Text style={{ color: "grey" }}>{sender != null ? sender.name : null}</Text>
      {hours && minutes ? 
      <Text style={{ color: "grey", textAlign: "right" }}>
          {hours}:{minutes} {ampm}
          </Text>
        : 
        null
      }


    </View>

    </View>
    </>
    
  )
}

export default GroupReceiverMessage