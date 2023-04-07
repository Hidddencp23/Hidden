import { View, Text } from 'react-native'
import React from 'react'

//import moment from 'moment';

const SenderMessage = ({ message }) => {

  // since the user can make a new message, need to check null date
  let hours = null;
  let minutes = null;

  /*

  // client timestamp now
  const timeAgo = moment.utc(moment().toISOString()).local().startOf('seconds').fromNow();

  // time of most recent message
  const timeAgoNow = serverTime != null ? moment.utc(serverTime.toDate().toISOString()).local().startOf('seconds').fromNow(): "";

  // time of this message
  const timeAgoMessage = message.timestamp != null ? moment.utc(message.timestamp.toDate().toISOString()).local().startOf('seconds').fromNow(): "";

  
  console.log(timeAgoMessage)
  */


  /*
    if time ago (curennt) != timeAgo of message[0], 
      - display current time ago
  */


      
  /*

  if (typeof message !== 'undefined'){
      if (message.timestamp !== null){
          const date = new Date(message.timestamp.seconds)
          hours = date.getHours();
          minutes = ('0' + date.getMinutes()).slice(-2);
      }
  }
  */
  
  

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

        {message.timestamp}
      </Text>



    </View>
    </>
  )
}

export default SenderMessage