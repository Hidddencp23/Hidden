import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";

const TripRow = ({ tripInfo, navigation }) => {
  const { user } = useAuth();
  const [tripUser, setTripUser] = useState("");
  const tripId = tripInfo.id;
  console.log(tripInfo);
  const getUserNameFromUid = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", uid));
    if (docSnap.exists()) {
      setTripUser(docSnap.data())
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  return (
    <View
      style={{
        borderBottomColor: "black",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
    <TouchableOpacity
      style={styles.tripTab}
      onPress={() => navigation.navigate("TripScreen", {
        tripInfo
      })
      }
    >
        <View style={styles.horizButtons}>

      <Image source={{ uri: tripInfo.image }} style={styles.tripImg} />
      <View>
        <Text style={styles.tripsTitle}> {tripInfo.tripName}</Text>
        <Text style={styles.tripsUser}> {"By: " + tripInfo.author}</Text>
        <Text style={styles.tripsDate}> {tripInfo.tripPostTime != null ? tripInfo.tripPostTime.toDate().toDateString(): ""}</Text>
      </View>
                <Icon name="right" size={20} style={styles.arrow} />

              </View>

    </TouchableOpacity>
        </View>

  )
}

const styles = StyleSheet.create({
  profPic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 15
  },
  tripcard: {
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
  },
  tripsTitle: {
    marginLeft: "5%",
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    marginTop: "3%",
    marginLeft: "5%",
  },

  tripsUser: {
    marginLeft: "5%",
    color: "#BEBEBE",
    textAlign: "left",
    fontSize: 14,
    marginBottom: "2.5%",
  },
  tripsDate: {
    marginLeft: "5%",
    color: "#BEBEBE",
    textAlign: "left",
    fontSize: 14,
    marginBottom: "5%",
  },

  tripTab: {
    backgroundColor: "#FFFFFF",
    marginTop: "5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    height: 90,
    borderRadius: 20
  },
  tripImg: {
    marginLeft: '3%',
    width: 50,
    height: 50,
  },
  horizButtons: {
    flexDirection: "row",
    marginTop: '3%'
  },
  arrow: {
    marginLeft: "85%",
    float: "left",
    marginTop: "7.5%",
    position: "absolute",
  },
});

export default TripRow