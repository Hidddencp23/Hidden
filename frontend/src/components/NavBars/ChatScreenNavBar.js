import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import circleStyles from "../../styles/circle";
import { collection, onSnapshot, where, getDoc, doc } from "firebase/firestore";
import { db } from "../../hooks/firebase";

const ChatScreenNavBar = ({ navigation, title, chatUser }) => {



  // navigation.goBack()
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate("MessagingScreen")}
        >
          <Icon name="left" size={20} />
        </TouchableOpacity>


        {chatUser ?
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OtherProfileScreenChat", {
                passedUserInfo: chatUser,
                otherUserId: chatUser.uid,
              });
            }}
          >
            <Text style={styles.baseText}>{chatUser.name}</Text>
          </TouchableOpacity>
          :
          <Text style={styles.baseText}>{title}</Text>
        }
        
        <TouchableOpacity
          style={styles.Button}
          
        >
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    height: 100,
    width: "100%",
    paddingRight: "5%",
    paddingLeft: "5%",
    paddingBottom: "3%",
    paddingTop: "13%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#83C3FF",
    overflow: "hidden",
  },
  headerImage: {
    height: 100,
    width: 100,
  },
  Button: {
    // backgroundColor: "white",
    height: "100%",
    width: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreenNavBar;
