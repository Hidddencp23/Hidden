import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';

const MessagingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.padDown}>
        <ChatList navigation={navigation}/>
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
    paddingTop: 25
  }
});

export default MessagingScreen;
