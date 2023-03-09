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
import ProfileCard from "../components/ProfileCard";

import Icon from "react-native-vector-icons/AntDesign";
//import { Icon } from 'react-native-vector-icons';

// placeholder image for now
import TripList from '../components/TripList';

// need to connect db
//import { db } from '../hooks/firebase';

const ProfileScreen = ({ navigation }) => {
  const { user, userInfo, logout } = useAuth();
  const [data, setData] = React.useState([]);

  // this info comes from firbase, placeholders for the moment
  const [firstName, setFirstName] = useState("Juliet");
  const [lastName, setLastName] = useState("Parker");
  const [friends, setFriends] = useState(2000);
  const [online, setOnline] = useState(1); // flag for indicator

  // state for liked / my trips toggle
  const [displayTrips, setdisplayTrips] = useState('My Trips');
  const [displayIndex, setDisplayIndex] = useState(0);


  const addFriend = "   Add Friend";

  
  return (
    <SafeAreaView style={{ height: "100%" }}>

      
    <View style={{

      position:'absolute',
      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
      width: Dimensions.get('window').width * 2,
      height: Dimensions.get('window').width * 2,
      top: -1 * (Dimensions.get('window').height * .88),
      left: -1 * (Dimensions.get('window').width * .5),
      backgroundColor:'#77C3EC',
      justifyContent: 'center',
      alignItems: 'center'
      
    }}/>


      <View style={styles.profTop}>
      
        <View style={styles.circle} />
        <Image source={{uri: userInfo.profilePic}} alt="Avatar" style={styles.photoURL} />
        <Text style={styles.profileTitle}>
          {userInfo.name}{" "}

          {online ? 
          <Icon name="checkcircle" size={17} color="#00008B"/>
          :
          <Icon name="checkcircleo" size={17}/>
          }

        </Text>
          <Text style={styles.profileSubTitle}>Total Friends:
          <Text style={styles.friendsSubTitle}> {userInfo.friendCount}</Text>
        </Text>
        
      </View>


      <View style={styles.horizButtons}>

      <TouchableOpacity style={styles.addFriendButton}>
      
        <Text style={styles.addFriendText}>
        <Icon name="adduser" size={20}/>
          
          {addFriend}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.messageButton}>
        <Icon name="message1" size={20} style={{
          marginLeft: '32.5%'
        }}/>
          
      </TouchableOpacity>
        
      </View>

      <SegmentedControl
        style={styles.toggleButton}
        values={['My Trips', 'Liked Trips']}
        selectedIndex={displayIndex}
        onChange={(event) => {
          if (displayTrips == 'My Trips'){
            setdisplayTrips('Liked Trips');
            setDisplayIndex(1);
          }
          else {
            setdisplayTrips('My Trips');
            setDisplayIndex(0);
          }
        }}
      />

      <ScrollView>
             {displayTrips === "My Trips" ? (
          <>
        <TripList navigation={navigation} displayTrips={"myTrips"}/>
          </>
        ) : null}

        {displayTrips === "Liked Trips" ? (
          <>
        <TripList navigation={navigation} displayTrips={"likedTrips"}/>
          </>
        ) : null}
         
      </ScrollView>

      
    </SafeAreaView>
  );
};

/*


      <ScrollView>
        {displayTrips === "My Trips" ? (
          <FlatList
            data={exMyTrips}
            renderItem={({ item }) => <TripView trip={item} />}
          />
        ) : null}

        {displayTrips === "Liked Trips" ? (
          <FlatList
            data={exLikedTrips}
            renderItem={({ item }) => <TripView trip={item} />}
          />
        ) : null}
      </ScrollView>


*/

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

  myTripsTitle: {
    marginLeft: "5%",
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 16,
    marginTop: "3%",
    marginLeft: "5%",
  },

  myTripsUser: {
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

export default ProfileScreen;
