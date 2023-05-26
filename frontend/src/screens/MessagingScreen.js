import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';

import Icon from "react-native-vector-icons/Entypo";
//import NewSafeAreaView from '../components/NewSafeAreaView';

import MessagingScreenNavBar from '../components/NavBars/MessagingScreenNavBar';
import { SafeAreaView } from 'react-native-safe-area-context';


const MessagingScreen = ({ navigation }) => {
  return (
    <View style={styles.padDown}>

        <ChatList navigation={navigation}/>

    </View>
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
    paddingTop: 0,
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
