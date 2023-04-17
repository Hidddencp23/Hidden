import { View, Text } from 'react-native'
import React from 'react'

import moment from 'moment';




const SenderMessage = ({ message }) => {

  // since the user can make a new message, need to check null date
  let hours = null;
  let minutes = null;


 
  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();


  // current time on client side
  const currentTime = moment().toDate();


  //console.log(timeagonow); 
  
  
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

      {hours && minutes ? 
      <Text style={{ color: "black", textAlign: "right" }}>
          {hours}:{minutes} {ampm}
          </Text>
        : 
        null
      }
      
      



    </View>
    </>
  )
}

export default SenderMessage