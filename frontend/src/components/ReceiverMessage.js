import { View, Text, Image } from 'react-native'
import React from 'react'

const ReceiverMessage = ({ message, chatUser }) => {

  const date = new Date(message.timestamp.seconds)

  return (

    <>
    <View style={{
      flexDirection: 'row'
    }}>

    <Image
      source={{ uri: chatUser.profilePic }}
      alt="Avatar"
      style={{
      position: 'relative',
      height: 50,
      width: 50,
      borderRadius: 100,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: 'black',
      marginTop: '5%',
      marginBottom: '5%',
      zIndex: 1
      }}
    />

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

      <Text style={{ color: "#808080" }}>{date.getHours()}:{('0' + date.getMinutes()).slice(-2)}</Text>

    </View>



    </View>
    </>
  )
}

export default ReceiverMessage