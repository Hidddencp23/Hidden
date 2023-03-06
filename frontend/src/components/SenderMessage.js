import { View, Text } from 'react-native'
import React from 'react'

const SenderMessage = ({ message }) => {
  return (
    <View style={{
        alignSelf: "flex-start",
        marginLeft: "auto",
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight:25,
        paddingTop: 10,
        marginHorizontal: 3,
        marginVertical: 2,
        backgroundColor: "steelblue",
        borderRadius: 15,
    }}>
      <Text style={{ color: "white" }}>{message.msg}</Text>
    </View>
  )
}

export default SenderMessage