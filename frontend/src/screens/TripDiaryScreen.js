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
  Dimensions
} from "react-native";

import { SearchBar } from 'react-native-elements';

import Icon from "react-native-vector-icons/Entypo";
// placeholder image for now
import deleteme from "../../assets/deleteme.png";

const TripDiaryScreen = ({ route, navigation}) => {

  const { trip } = route.params;

  const tripTitle = trip[0];
  const experiences = trip[1];
  let myKey = 1;


  // search bar (for trips)
  const [search, setSearch] = useState('');


  const ExperienceView = ({ experience }) => (
    
    
    <View
      style={{
        borderBottomColor: "black",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <TouchableOpacity style={styles.myTripTab}>
        <View style={styles.horizButtons}>
          <Image source={experience.image} alt="Avatar" style={styles.tripImg}></Image>
          <View style={styles.vertButtons}>
            <Text style={styles.myTripsTitle}>{experience.title}</Text>
            <Text style={styles.myTripsUser}>{experience.date}</Text>

            <View style={styles.locationTextAlign}>
              <Icon name="location-pin" color="#83C3FF" size={20} />
              <Text style={styles.myTripsDate}>{experience.location}</Text>
            </View>
          </View>
          <Icon name="star" color="#FFEF00" size={20} style={styles.arrow} />
          <Text style={styles.ratingText}>{experience.rating}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={{ 
      height: Dimensions.get('window').height
    }}>



    

    <View style={styles.halfCircle}/>

    <Text style={styles.tripTitle}>{tripTitle}</Text>

    <SearchBar
      lightTheme
      round
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.searchInput}
      placeholder="Search"
      onChangeText={setSearch}
      value={search}   
    />

    <ScrollView>
    { (search != null && experiences.length > 0)  ? (
      <>
          {experiences
              .filter(x => String(x.title).includes(search))
              .map((item) => <ExperienceView experience={item} key={myKey++}/>)
          }
      </>
      ) : null}

    </ScrollView>

    <TouchableOpacity
        style={styles.circularButton}>
        
        <Icon name="plus" size={30} style={{
            marginLeft: '0%'
        }}/>
    </TouchableOpacity>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  halfCircle: {
    position:'absolute',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
    top: -1 * (Dimensions.get('window').height * .88),
    left: -1 * (Dimensions.get('window').width * .5),
    backgroundColor:'#77C3EC',
    justifyContent: 'center',
    alignItems: 'center'
  },

  circularButton: {
    position: 'absolute',
    top: '72.5%',
    left: '75%',

    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#77C3EC',
  },

  tripTitle: {
    textAlign: 'center',
    paddingTop: 65,
    fontSize: 25,
    fontWeight: 'bold',
  },

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

  searchContainer: {

    height: 45,
    marginLeft: '7%',
    marginTop: '2.5%',
    width: '84%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 10,
    flexDirection: 'row'
  },
  searchInput: {
    backgroundColor: 'transparent',
    height: 45,
    marginTop: -7.5
  },
  searchText: {
    marginTop: '5%',
    marginLeft: '7.5%'
  },

  searchAlign: {
    width: "100%",
    flexDirection: "row",
    marginLeft: '7%'
  },
  addTripButton: {
    backgroundColor: "#83C3FF",
    height: 45,
    width: '16%',
    marginLeft: "7.5%",
    borderRadius: 7,
    justifyContent: 'center',
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
    marginLeft: "2.5%",
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
    marginLeft: "80%",
    float: "left",
    marginTop: "1.5%",
    position: "absolute",
  },

  ratingText: {
    marginLeft: "87.5%",
    position: "absolute",
    float: "left",
    marginTop: "2%",
    color: '#BEBEBE'
  },

  locationTextAlign: {
    flexDirection: "row",
    marginTop: '0%'
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

export default TripDiaryScreen;