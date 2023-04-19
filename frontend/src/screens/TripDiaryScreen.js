import React, { useEffect, useState, useRef } from 'react';
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
  Platform
} from "react-native";

import { SearchBar } from 'react-native-elements';
import LocationView from '../components/LocationView';
import Icon from "react-native-vector-icons/Entypo";
// placeholder image for now
import deleteme from "../../assets/deleteme.png";
import { useRoute } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, limit, where } from 'firebase/firestore';
import { db } from '../hooks/firebase';

import profileStyles from '../styles/profiles.js';
import circleStyles from '../styles/circle';

const TripDiaryScreen = ({ route, navigation}) => {

  const { tripInfo } = route.params;
  let myKey = 1;
  const { params } = useRoute();
  const [locations, setLocations] = useState([]);

  // search bar (for trips)
  const [search, setSearch] = useState('');

  useEffect(() =>
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
  ),
  [])



  return (
    <SafeAreaView style={{ 
      height: Dimensions.get('window').height
    }}>

    

    {Platform.OS === 'ios' ?
            <View style={circleStyles.iosCircle}/> 
            :
            <View style={circleStyles.androidCircle}/> 
            }

    <SearchBar
      lightTheme
      round
      containerStyle={profileStyles.searchContainerExperiences}
      inputContainerStyle={profileStyles.searchInput}
      placeholder="Search"
      onChangeText={setSearch}
      value={search}   
    />

    <ScrollView>
    { (search != null && locations.length > 0)  ? (
      <>
          {locations
              .filter(x => String(x.title).includes(search))
              .map((item) => <LocationView location={item} key={myKey++} navigation={navigation} />)
          }
      </>

      ) : null}
    </ScrollView>

    <TouchableOpacity
        onPress={() => navigation.navigate("AddLocationScreen", {tripInfo})}
        style={profileStyles.circularButton}>
        
        <Icon name="plus" size={30} style={{
            marginLeft: '0%'
      }}/>
      
    </TouchableOpacity>

    </SafeAreaView>
  )
};


export default TripDiaryScreen;