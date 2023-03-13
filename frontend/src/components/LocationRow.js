import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";

const LocationRow = ({ locInfo, navigation }) => {
  const { user } = useAuth();


  return (
    <View
      style={{
        borderBottomColor: "black",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
    <TouchableOpacity>
    <View
      style={{
        borderBottomColor: "black",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <TouchableOpacity style={styles.myTripTab}>
        <View style={styles.horizView}>
          <Image source={locInfo.image} style={styles.locImg}></Image>
          <View style={styles.vertView}>
            <Text style={styles.locName}>{locInfo.name}</Text>
            <Text style={styles.locType}>{locInfo.type}</Text>
            <Text style={styles.locType}>{locInfo.dist}</Text>
          </View>
          <Icon name="right" size={20} style={styles.arrow} />
        </View>
      </TouchableOpacity>
    </View>

    </TouchableOpacity>
        </View>

  )
}

const styles = StyleSheet.create({
   
      // may need to resize through js
      locImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 15 
      },
    
      horizView: {
        flexDirection: "row",
        marginTop: '3%'
      },
    
      vertView: {
        flex: 1,
        flexDirection: "column",
      },
    
      locName: {
        marginLeft: "5%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
        marginTop: "3%",
        marginLeft: "5%",
      },
    
      locType: {
        marginLeft: "5%",
        color: "#BEBEBE",
        textAlign: "left",
        fontSize: 14,
        marginBottom: "2.5%",
      },
  
      myTripTab: {
        backgroundColor: "#FFFFFF",
        marginTop: "5%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        height: 90,
        borderRadius: 20
      },
    
      arrow: {
        marginLeft: "85%",
        float: "left",
        marginTop: "7.5%",
        position: "absolute",
      },
    
      profile: {
        height: "100%",
        alignItems: "center",
        paddingTop: "10%",
      },
      profileName: {
        fontSize: 30,
        marginTop: "5%",
      },
      profileText: {
        fontSize: 18,
        marginTop: "2%",
      },
    
      profButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 30,
      },
    
      logoutButton: {
        backgroundColor: "#0984e3",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
      },
      logoutText: {
        backgroundColor: "#0984e3",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20,
      },
      editButton: {
        backgroundColor: "#0984e3",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginRight: 30,
        borderRadius: 20,
      },
    
      profTextAlign: {
        display: "table-cell",
        textAlignVertical: "middle",
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
      },
});

export default LocationRow