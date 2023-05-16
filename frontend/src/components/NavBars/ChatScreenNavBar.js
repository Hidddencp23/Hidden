import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";

import circleStyles  from '../../styles/circle';

import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../../hooks/firebase";


const ChatScreenNavBar = ({ navigation, title }) => {


    // navigation.goBack()
    return (
        <>
            {/*
             {Platform.OS === 'ios' ?
                    <View style={circleStyles.iosCircle}/> 
                    :
                    <View style={circleStyles.androidCircle}/> 
            }      
            */}
        
            
            <View style={styles.header}>
                    <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("MessagingScreen")}>
                        <Icon name="left" size={20} />
                    </TouchableOpacity>
                    <Text style={styles.baseText}>{title}</Text>
                    <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("")}>
                        <Icon name="info" size={20} />
                    </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontWeight:'bold',
        fontSize: 20,
        paddingLeft: "5%",
    },
    header: {
        height: 100,
        width: '100%' ,
        paddingRight: "10%",
        paddingLeft: "5%",
        paddingBottom: "3%",
        paddingTop: "13%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
    },
    headerImage: {
        height: 100,
        width: 100,
    },
    Button: {
        backgroundColor: "white",
        height: "100%",
        width: 40,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },

});

export default ChatScreenNavBar;