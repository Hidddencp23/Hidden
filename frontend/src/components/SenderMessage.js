import { View, Text } from 'react-native'
import React from 'react'

//import moment from 'moment';

const SenderMessage = ({ message }) => {

  // since the user can make a new message, need to check null date
  let hours = null;
  let minutes = null;

  
  if (typeof message !== 'undefined'){
      if (message.timestamp !== null){
          const date = new Date(message.timestamp.seconds)
          hours = date.getHours();
          minutes = ('0' + date.getMinutes()).slice(-2);
      }
  }
  
  

  // hour:min
  return (
    <>
    <View style={{
        alignSelf: "flex-start",
        marginLeft: "auto",
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight:25,
        paddingTop: 10,
        marginHorizontal: 3,
        marginVertical: 2,
        backgroundColor: "#83C3FF", 
        borderRadius: 15,
    }}>
      <Text style={{ color: "black" }}>{message.message}</Text>


      <Text style={{ color: "black", textAlign: "right" }}>

        { hours && minutes ? 
        <>
          {hours}:{minutes} 
        </>
        : 
        <>
        </>
        }
      </Text>



    </View>
    </>
  )
}

export default SenderMessage