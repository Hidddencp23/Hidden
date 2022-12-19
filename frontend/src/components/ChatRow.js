import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'

const ChatRow = ({ matchDetails, navigation }) => {
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);


  return (
      <TouchableOpacity 
        style={styles.messagecard}
        onPress={() => navigation.navigate("TextingScreen", {
              matchDetails,
            })
          }
        >
          <Image  
            style={styles.profPic}
            source={{uri: matchedUserInfo?.profPic}}
          />

          <View>
            <Text style={styles.text}>
              {matchedUserInfo?.username}
            </Text>
            <Text>Say Hi!</Text>

          </View>
      </TouchableOpacity>
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

export default ChatRow