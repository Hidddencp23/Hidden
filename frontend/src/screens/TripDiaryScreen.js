import React from 'react';
import { useState } from "react";
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

import Icon from "react-native-vector-icons/Entypo";
// placeholder image for now
import deleteme from "../../assets/deleteme.png";

import profileStyles from '../styles/profiles.js';
import circleStyles from '../styles/circle';

const TripDiaryScreen = ({ route, navigation}) => {

  const { experiences } = route.params;
  let myKey = 1;


  // search bar (for trips)
  const [search, setSearch] = useState('');



  const ExperienceView = ({ experience }) => (
    
    
    <View
      style={profileStyles.tripAlign}
    >
      <TouchableOpacity style={profileStyles.myTripTab}>
        <View style={profileStyles.horizButtons}>
          <Image source={{ uri: experience.image}} alt="Avatar" style={profileStyles.tripImg}></Image>
          <View style={profileStyles.vertButtons}>
            <Text style={profileStyles.myTripsTitle}>{experience.title}</Text>
            <Text style={profileStyles.myTripsUser}>{experience.date}</Text>

            <View style={profileStyles.locationTextAlign}>
              <Icon name="location-pin" color="#83C3FF" size={20} />
              <Text style={profileStyles.myTripsDate}>{experience.location}</Text>
            </View>
          </View>
          <Icon name="star" color="#FFEF00" size={20} style={profileStyles.arrow} />
          <Text style={profileStyles.ratingText}>{experience.rating}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );


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
    { (search != null && experiences != null)  ? (
      <>
        {experiences.length > 0 ? 
          <>
              {experiences
                  .filter(x => String(x.title).includes(search))
                  .map((item) => <ExperienceView experience={item} key={myKey++}/>)
              }
          </>
        : null }
      </>

      ) : null}
    </ScrollView>

    <TouchableOpacity
        onPress={() => navigation.navigate("AddExperienceScreen")}
        style={profileStyles.circularButton}>
        
        <Icon name="plus" size={30} style={{
            marginLeft: '0%'
      }}/>
      
    </TouchableOpacity>

    </SafeAreaView>
  )
};


export default TripDiaryScreen;