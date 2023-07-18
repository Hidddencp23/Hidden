import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { SearchBar } from 'react-native-elements';
import LocationView from '../components/LocationView';
import { useRoute } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from '../hooks/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth'

import profileStyles from '../styles/profiles.js';
import circleStyles from '../styles/circle';
//import NewSafeAreaView from '../components/NewSafeAreaView';

const TripDiaryScreen = ({ route, navigation }) => {
  const { user } = useAuth();

  const { tripInfo } = route.params;
  let myKey = 1;
  const { params } = useRoute();
  const [locations, setLocations] = useState([]);

  // search bar (for trips)
  const [search, setSearch] = useState('');

  useEffect(() => {

    if (tripInfo['locations'] != null) {
      if (tripInfo['locations'].length > 0) {
        onSnapshot(
          query(
            collection(db, 'HiddenLocations'),
            orderBy("__name__"),
            where("__name__", "in", tripInfo['locations']),
          ),
          (snapshot) => {
            setLocations(
              snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }))
            )
          }
        )
      }
    }
  },
    [])



  return (
    <SafeAreaView style={{
      height: Dimensions.get('window').height
    }}>



      {/*Platform.OS === 'ios' ?
            <View style={circleStyles.iosCircle}/> 
            :
            <View style={circleStyles.androidCircle}/> 
    */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.Button} onPress={() =>
          navigation.goBack()
        }>
          <Icon name="left" size={20} />
        </TouchableOpacity>
        <Text style={styles.text}>{tripInfo.tripName}</Text>
      </View>


      {(user.uid == tripInfo.user) ? (<View style={{ flexDirection: 'row', marginTop: 100 }}>
        <SearchBar
          lightTheme
          round
          containerStyle={profileStyles.searchContainerExperiences}
          inputContainerStyle={profileStyles.searchInput}
          placeholder="Search"
          onChangeText={setSearch}
          value={search}

        />
        <TouchableOpacity
          style={profileStyles.addTripButton}
          //onPress={() => navigation.navigate("AddTripScreen")}
          onPress={() => navigation.navigate("AddLocationScreen", { tripInfo })}
        >
          <Icon
            name="plus"
            size={20}
            style={{
              marginLeft: "35%",
            }}
          />
        </TouchableOpacity>
      </View>) : <View style={{ flexDirection: 'row', marginTop: 50 }}/>}




      <ScrollView>
        {(search != null && locations.length > 0) ? (
          <>
            {locations
              .filter(x => String(x.title).includes(search))
              .map((item) => <LocationView location={item} key={myKey++} navigation={navigation} />)
            }
          </>

        ) : null}
      </ScrollView>

      {/*
    <TouchableOpacity
        onPress={() => navigation.navigate("AddLocationScreen", {tripInfo})}
        style={profileStyles.circularButton}>
        
        <Icon name="plus" size={30} style={{
            marginLeft: '0%'
      }}/>
      
    </TouchableOpacity>
*/}

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  search: {
    width: 40
  },
  header: {
    zIndex: 1,
    position: 'absolute',
    height: 100,
    width: "100%",
    paddingBottom: "3%",
    paddingTop: "13%",
    paddingHorizontal: "5%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#83C3FF',
    overflow: 'hidden'
  },
  Button: {
    backgroundColor: "white",
    height: "100%",
    width: "10%",
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: "center"
  },
  text: {
    fontSize: 30,
    weight: 'bold',
    width: '80%',
    textAlign: 'center'
  },
});

export default TripDiaryScreen;