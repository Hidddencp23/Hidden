import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';

const MessagingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.chat}>
        <ChatList navigation={navigation}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  chat: {
    marginTop: "10%"
  },
  text: {
    fontSize: 30,
  },
  messages: {
    height: '100%'
  },  
  messagingScreen: {
    paddingBottom: 75
  }
});

export default MessagingScreen;
