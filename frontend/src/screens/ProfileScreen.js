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
  //SafeAreaView,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from "../hooks/useAuth";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";

// placeholder image for now
import TripList from '../components/TripList';

import profileStyles from '../styles/profiles.js';
//import styles from '../styles/profiles.js';
import circleStyles from '../styles/circle.js';
import { useWindowDimensions } from 'react-native';
//import NewSafeAreaView from '../components/NewSafeAreaView';

// need to connect db
//import { db } from '../hooks/firebase';

const ProfileScreen = ({ navigation }) => {

  const { user, userInfo, logout } = useAuth();
  const [data, setData] = React.useState([]);

  // this info comes from firbase, placeholders for the moment
  const [online, setOnline] = useState(1); // flag for indicator

  // state for liked / my trips toggle
  const [displayTrips, setdisplayTrips] = useState('My Trips');
  const [displayIndex, setDisplayIndex] = useState(0);

  const addFriend = "   Add Friend";

  // search bar (for trips)
  const [searchTrips, setSearchTrips] = useState();

  const [search, setSearch] = useState('');


  return (
    <SafeAreaView
      style={{
        height: Dimensions.get("window").height,
        backgroundColor: 'white',
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
        <SegmentedControl
  
          backgroundColor="#83C3FF"
          tintColor="#FFFFFF"
          activeFontStyle={{ color: "#83C3FF" }}
          fontStyle={{ color: "white" }}
          height="75%"
          marginLeft='7%'
          width="86%"
          marginBottom="5%"
          values={["My Trips", "Liked Locations"]}
          selectedIndex={displayIndex}
          onChange={(event) => {
            if (displayTrips == "My Trips") {
              setdisplayTrips("Liked Locations");
              setDisplayIndex(1);
              //setSearchTrips(exLikedTrips);
            } else {
              setdisplayTrips("My Trips");
              setDisplayIndex(0);
              //setSearchTrips(exMyTrips);
            }
          }}
        />
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

      </View>

      <View style={{ flex: 1, paddingBottom: "45%" }}>
        {displayTrips === "My Trips" ? (
          <>
            <TripList navigation={navigation} displayTrips={"myTrips"} />
          </>
        ) : null}

        {displayTrips === "Liked Locations" ? (
          <>
            <TripList navigation={navigation} displayTrips={"LikedLocations"} />
          </>
        ) : null}
      </View>
    </SafeAreaView>
  );
};



export default ProfileScreen;
