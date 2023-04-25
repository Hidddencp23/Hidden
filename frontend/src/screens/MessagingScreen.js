import React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';

import Icon from "react-native-vector-icons/Entypo";



const MessagingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.padDown}>
        <ChatList navigation={navigation}/>


        {/* <TouchableOpacity
            onPress={() => navigation.navigate("AddChatScreen")}
            style={styles.circularButton}>
            
            <Icon name="plus" size={30} style={{
                marginLeft: '0%'
            }}/>
      
        </TouchableOpacity> */}

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  messages: {
    height: '100%'
  },  
  messagingScreen: {
    paddingBottom: 75
  },
  padDown: {
    paddingTop: 25,
    height: '100%'
  },
  circularButton: {
    position: 'absolute',
    top: '77.5%',
    left: '67.5%',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#77C3EC',
    //marginTop: 200
  },
});

export default MessagingScreen;
