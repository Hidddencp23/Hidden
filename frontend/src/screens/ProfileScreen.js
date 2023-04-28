import React, { useEffect } from "react";
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
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";
import { db } from '../hooks/firebase';

// placeholder image for now
import TripList from '../components/TripList';

import profileStyles from '../styles/profiles.js' ;
//import styles from '../styles/profiles.js';
import circleStyles from '../styles/circle.js';
import { useRoute } from '@react-navigation/native'
import TripRow from "../components/TripRow";

// need to connect db
//import { db } from '../hooks/firebase';

const ProfileScreen = ({ navigation}) => {

  const myprofile = 0; // need to connect to db

  const { user, userInfo, logout } = useAuth();
  const [data, setData] = React.useState([]);

  // this info comes from firbase, placeholders for the moment
  const [online, setOnline] = useState(1); // flag for indicator

  // state for liked / my trips toggle
  const [displayTrips, setdisplayTrips] = useState('My Trips');
  const [displayIndex, setDisplayIndex] = useState(0);
  const [trips, setTrips] = useState([])
  const addFriend = "   Add Friend";

  // search bar (for trips)
  const [searchTrips, setSearchTrips] = useState();

  const [search, setSearch] = useState('');
  useEffect(() => {
    console.log("here")
    if (userInfo["myTrips"].length > 0){
        onSnapshot(
            query(
                collection(db, 'Trips'), 
                where("user", "==", user.uid),
            ),
            (snapshot) => {
                setTrips(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            }
        )}},
    [])





  return (
    <SafeAreaView
      style={{
        height: Dimensions.get("window").height,
        backgroundColor: 'white'
      }}
    >

      <View style={profileStyles.profTop}>
        <View style={profileStyles.circle} />
        <Image
          source={{ uri: userInfo.profilePic }}
          alt="Avatar"
          style={profileStyles.photoURL}
        />
        <Text style={profileStyles.profileTitle}>
          {userInfo.name}{" "}
          {online ? (
            <Icon name="checkcircle" size={17} color="#77C3EC" />
          ) : (
            <Icon name="checkcircleo" size={17} />
          )}
        </Text>

        <Text style={profileStyles.profileSubTitle}>
          Total Friends:
          <Text style={profileStyles.friendsSubTitle}> {userInfo.friendCount}</Text>
        </Text>
      </View>

      <View
        style={{
          marginTop: 30,
        }}
      >
        {myprofile === 1 ? (
          <>
            <View style={profileStyles.horizButtons}>
              <TouchableOpacity style={profileStyles.addFriendButton}>
                <Text style={profileStyles.addFriendText}>
                  <Icon name="adduser" size={20} />

                  {addFriend}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={profileStyles.messageButton}>
                <Icon
                  name="message1"
                  size={20}
                  style={{
                    marginLeft: "32.5%",
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null}


        {myprofile === 0 ? 
            <SegmentedControl
              style={profileStyles.toggleButton}
              values={["My Trips", "Liked Trips"]}
              selectedIndex={displayIndex}
              onChange={(event) => {
                if (displayTrips == "My Trips") {
                  setdisplayTrips("Liked Trips");
                  setDisplayIndex(1);
                  //setSearchTrips(exLikedTrips);
                } else {
                  setdisplayTrips("My Trips");
                  setDisplayIndex(0);
                  //setSearchTrips(exMyTrips);
                }
              }}
            />

          :
        
          <SegmentedControl
            style={profileStyles.toggleButton}
            values={["Their Trips", "Liked Trips"]}
            selectedIndex={displayIndex}
            onChange={(event) => {
              if (displayTrips == "My Trips") {
                setdisplayTrips("Liked Trips");
                setDisplayIndex(1);
                //setSearchTrips(exLikedTrips);
              } else {
                setdisplayTrips("My Trips");
                setDisplayIndex(0);
                //setSearchTrips(exMyTrips);
              }
            }}/>
        }

        {myprofile === 0 ? (
          <>
            <View style={profileStyles.searchAlign}>
              <SearchBar
                lightTheme
                round
                containerStyle={profileStyles.searchContainerProfile}
                inputContainerStyle={profileStyles.searchInput}
                placeholder="Search"
                onChangeText={setSearch}
                value={search}
              />

              <TouchableOpacity
                style={profileStyles.addTripButton}
                onPress={() => navigation.navigate("AddTripScreen")}
              >
                <Icon
                  name="plus"
                  size={20}
                  style={{
                    marginLeft: "35%",
                  }}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : null}
      </View>

      <ScrollView>
            {trips !== null ?
            <>
                {trips.map((item) => <TripRow tripInfo={item} key={item.id} navigation={navigation} />)}
            </> 
            : 
            null
            }
        </ScrollView>
    </SafeAreaView>
  );
};



export default ProfileScreen;
