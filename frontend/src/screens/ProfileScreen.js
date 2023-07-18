import React from "react";
import { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from "../hooks/useAuth";
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/AntDesign";

// placeholder image for now
import TripList from '../components/TripList';

import profileStyles from '../styles/profiles.js';


const ProfileScreen = ({ navigation }) => {

  const { user, userInfo, logout } = useAuth();

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
        <View 
        style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <SegmentedControl

            backgroundColor="#83C3FF"
            tintColor="#FFFFFF"
            activeFontStyle={{ color: "#83C3FF" }}
            fontStyle={{ color: "white" }}
            style={{ height: 45 }}
            marginLeft='4%'
            width="74%"
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
          <TouchableOpacity
            style={profileStyles.addTripButton}
            onPress={() => navigation.navigate("AddTripScreen")}
          >
            <Icon
              name="plus"
              size={20}
              style={{
                marginLeft: "30%",
              }}
            />
          </TouchableOpacity>
        </View>
        {/* <>
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
        </> */}

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
