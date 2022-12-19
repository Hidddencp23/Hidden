import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';

const MessagingScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
        <ChatHeader title='Chat' navigation={navigation}/>
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
  }
});

export default MessagingScreen;
