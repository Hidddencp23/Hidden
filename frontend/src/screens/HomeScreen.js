import React from "react";
import { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";
import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import LocationList from "../components/LocationList";
import Icon from "react-native-vector-icons/AntDesign";
//import { Icon } from 'react-native-vector-icons';

// placeholder image for now
import deleteme from "../../assets/deleteme.png";

// need to connect db
//import { db } from '../hooks/firebase';

const HomeScreen = ({ navigation }) => {

  const { user, userInfo, logout } = useAuth();
  const [data, setData] = React.useState([]);
  console.log(user.uid)

  // placeholder trips to see if it works
  const exloc1 = {
    name: "Dubai Mall",
    type: "Shopping Mall",
    image: deleteme,
    dist: "1.6 miles"
  };

  const exloc2 = {
    name: "2nd Loc",
    type: "something",
    image: deleteme,
    dist: "1.6 miles"
  };

  const exloc3 = {
    name: "3rd Loc",
    type: "somethingl",
    image: deleteme,
    dist: "1.6 miles"
  };

  const exloc4 = {
    name: "idk",
    type: "Shopping Mall",
    image: deleteme,
    dist: "1.6 miles"
  };

  const exLoc = [exloc1, exloc2, exloc3, exloc4];

  let myKey = 0;


  return (
    <SafeAreaView style={{ height: "100%" }}>
    
{/* <View style={{

position:'absolute',
borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
width: Dimensions.get('window').width * 2,
height: Dimensions.get('window').width * 2,
top: -1 * (Dimensions.get('window').height * .88),
left: -1 * (Dimensions.get('window').width * .5),
justifyContent: 'center',
alignItems: 'center'

}}/> */}


      <ScrollView>
          <LocationList navigation={navigation} locations={exLoc}/>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  profileHeader: {
    justifyContent: 'center',
    marginTop: '15%',
    
    fontSize: 22,
    fontWeight: 'bold'
  },
  
  profTop: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "30%",

  },

  profTopBackground: {
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#77C3EC",
    left: 0,
    top: 0,
    height: '25%'
  },
  setHorizontal: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  photoURL: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: 'black',
    marginTop: '10%',
  },
  photoAlign: {
    marginTop: "20%",
    marginLeft: "10%",
    textAlign: "left",
  },

  upTextAlign: {
    marginTop: "25%",
    marginLeft: "10%",
    position: "absolute",
    marginLeft: "50%",
    marginTop: "25%",
    marginRight: "15%",
  },

  profileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: '6%',
  },
  profileSubTitle: {
    fontSize: 17,
    fontWeight: "normal",
    color: "black",
    marginTop: '4%',
    //fontFamily: ''
  },
  friendsSubTitle: {
    fontSize: 17,
    fontWeight: "normal",
    color: "#77C3EC",
    marginTop: '4%',
    //fontFamily: ''
  },

  // may need to resize through js
  tripImg: {
    marginLeft: '3%',
    width: '25%',
    height: '80%',
  },

  /*
  onlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "white",
    marginLeft: "110%",
    marginTop: "5%",
    position: "absolute",
  },

  offlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "grey",
    borderColor: "white",
    marginLeft: "110%",
    marginTop: "5%",
    position: "absolute",
  },
  */

  setHorizontalButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderRadius: 20,
  },

  toggleButton: {
    
    // need to update react native to see
    fontWeight: 'bold',
    //backgroundColor: '#FFFFFF',
    //tintColor: "#83C3FF",
 
    tintColor: "#FFFFFF",
    backgroundColor: '#83C3FF',

    height: "6%",
    marginLeft: "7%",
    marginTop: "5%",
    width: "86%",
    marginBottom: "5%",
  },

  addFriendButton: {
    backgroundColor: "#83C3FF",
    height: 40,
    width: '62.5%',
    marginLeft: "7%",
    marginTop: "5%",
    borderRadius: 7,
    justifyContent: 'center',

  },
  addFriendText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  messageButton: {
    backgroundColor: "#83C3FF",
    height: 40,
    width: '16%',
    marginLeft: "7.5%",
    marginTop: "5%",
    borderRadius: 7,
    justifyContent: 'center',
  },
  messageIcon: {
    textAlign: 'center',
    // alignItems: 'center'
  },

  buttonText: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  horizButtons: {
    flexDirection: "row",
    marginTop: '3%'
  },

  vertButtons: {
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
  myTripsDate: {
    marginLeft: "5%",
    color: "#BEBEBE",
    textAlign: "left",
    fontSize: 14,
    marginBottom: "5%",
  },

  myTripTab: {
    backgroundColor: "#FFFFFF",
    marginTop: "5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    height: 90,
    borderRadius: 20
  },

  line: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 20,
  },

  arrow: {
    marginLeft: "85%",
    float: "left",
    marginTop: "7.5%",
    position: "absolute",
  },

  profileScreen: {
    paddingBottom: 75,
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

export default HomeScreen;
