
import React from 'react';
import { useState } from 'react';
import BottomNavBar from '../components/BottomNavBar';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { collection, where, onSnapshot, orderBy, query } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import ProfileCard from '../components/ProfileCard';

import Icon from 'react-native-vector-icons/AntDesign';
//import { Icon } from 'react-native-vector-icons';

// placeholder image for now
import deleteme from '../../assets/deleteme.png';

// need to connect db
//import { db } from '../hooks/firebase';



const ProfileScreen = () => { 
  const { user, logout } = useAuth();
  const [data, setData] = React.useState([]);



  // this info comes from firbase, placeholders for the moment
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [friends, setFriends] = useState(0);
  const [online, setOnline] = useState(1); // flag for indicator

  // state for liked / my trips toggle
  const [displayTrips, setdisplayTrips] = useState('');


  // placeholder trips to see if it works
  const extrip1 = {
    user: 'Praneeth',
    title: 'Barcelona Trip'
  };

  const extrip2 = {
    user: 'Arden',
    title: 'Rome Trip'
  };

  const exLikedTrips = [ extrip1, extrip2 ]
  const exMyTrips = [ extrip2, extrip2, extrip2 ]


  // db is not connected yet
  /*
  React.useEffect(
    () =>
    onSnapshot(
        query(collection(db, "posts"), where("username", "==", user.displayName) ,orderBy("timeStamp")),
        (snapshot) => {
            setData(snapshot.docs)
        }
    )
  ) 
  */



  return (
    <SafeAreaView>
      <View style={styles.profTop}>

        <View style={styles.photoAlign}>
          <Image source={deleteme} alt="Avatar" style={styles.photoURL}/>
        </View>

        <View style={styles.upTextAlign}>
          <View style={styles.setHorizontal}>
            <Text style={styles.profileTitle}>{firstName} {lastName} </Text>

            { online === 1 ? 
              <>
                <View style={styles.onlineStatusCircle}></View>
              </>
              :
              <>
                <View style={styles.offlineStatusCircle}></View>
              </>
            }

          </View>
          <Text style={styles.profileSubTitle}>{friends} Friends</Text>
        </View>
      </View>


      <View style={styles.horizButtons}>
        <TouchableOpacity style={styles.leftToggleButton} onPress={() => {setdisplayTrips('liked')}}>
            <Text style={styles.buttonText}>Liked Trips</Text>
        </TouchableOpacity>
        <View
          style={{
            borderRightColor: 'black',
            borderRightWidth: StyleSheet.hairlineWidth,
            marginTop: '5%',
            marginBottom: '5%'
          }}
        />
        <TouchableOpacity style={styles.rightToggleButton} onPress={() => {setdisplayTrips('mine')}}>
            <Text style={styles.buttonText}>My Trips</Text>
        </TouchableOpacity>
      </View>
      

      <View>

      { displayTrips === 'mine' ? 

        <>
          {exMyTrips.map((trip) => {

                return (
                  <>
                    <TouchableOpacity style={styles.myTripTab}>

                      <View style={styles.horizButtons}>
                        <View style={styles.vertButtons}>
                          <Text style={styles.myTripsTitle}>{trip.title}</Text>
                          <Text style={styles.myTripsUser}>{'By: ' + trip.user}</Text>
                        </View>
                      <Icon name="right" size={20} style={styles.arrow}/>
                      </View>
                    </TouchableOpacity>
                  </>
                )
          })}
        </> 
      
        : null
    
      }


      { displayTrips === 'liked' ? 

        <>

          {exLikedTrips.map((trip) => {
              return (
                <>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginLeft: '5%',
                      marginRight: '5%'
                    }}
                  />
                  <TouchableOpacity style={styles.likedTripTab}>
                      <View style={styles.horizButtons}>
                        <View style={styles.vertButtons}>
                          <Text style={styles.myTripsTitle}>{trip.title}</Text>
                          <Text style={styles.myTripsUser}>{'By: ' + trip.user}</Text>
                        </View>
                      <Icon name="right" size={20} style={styles.arrow}/>
                      </View>
                  </TouchableOpacity>
                </>
              )

          })}

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginLeft: '5%',
              marginRight: '5%'
            }}
          />
        </>

        : null
    }

       </View>


      
    </SafeAreaView>
  )
};



const styles = StyleSheet.create({

  /*
  profTop: {
    backgroundColor: '#77C3EC',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },


  setHorizontal: {
    width: '100%',
    flex: 1,
    flexDirection: 'column'
  },


  photoURL: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 5
  },
  photoAlign: {
    marginTop: '20%',
    marginLeft: '10%',
    textAlign: 'left',
    alignItems: 'left'
  },

  upTextAlign: {
    marginTop: '25%',
    marginLeft: '10%',
    fontFamily: 'Arial',
    position: 'absolute',
    marginLeft: '50%',
    marginTop: '25%',
    marginRight: '15%'
  },


  profileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  },
  profileSubTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white'
  },


  onlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'white',
    borderColor: 'white',
    marginLeft: '110%',
    marginTop: '5%',
    position: 'absolute'
  },

  offlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'grey',
    borderColor: 'white',
    marginLeft: '110%',
    marginTop: '5%',
    position: 'absolute'
  },


  setHorizontalButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20
  },

  leftToggleButton: {
    backgroundColor: '#D3D3D3',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: '10%',
    marginTop: '5%',
    width: '40%',
    marginBottom: '5%'
  },
  rightToggleButton: {
    backgroundColor: '#D3D3D3',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '5%',
    marginRight: '10%',
    width: '40%',
    marginBottom: '5%'
  },


  buttonText: {
    marginTop: '5%',
    marginBottom: '5%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  horizButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent:'left'
  },

  vertButtons: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Arial',
    
  },

  myTripsTitle: {
    marginLeft: '5%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
    marginTop: '5%',
    marginLeft: '5%'
  },

  myTripsUser: {
    marginLeft: '5%',
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    marginBottom: '5%'
  },

  myTripTab: {
    backgroundColor: '#BEBEBE',
    marginTop: '3%',
    marginLeft: '10%',
    marginRight: '10%',
    height: '30%',
    borderRadius: 20
  },

  likedTripTab: {
    backgroundColor: 'transparent',
    marginTop: '3%',
    marginLeft: '10%',
    marginRight: '10%',
    height: '50%',
    borderRadius: 20,
  },

  line: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 20
  },

  arrow: {
    marginLeft: '85%',
    float: 'left',
    marginTop: '7.5%',
    position: 'absolute'
  },


  





  profileScreen: {
    paddingBottom: 75
  },
  profile: {
    height: '100%',
    alignItems: 'center',
    paddingTop: '10%'
  },
  profileName: {
    fontSize: 30,
    marginTop: '5%'
  },
  profileText: {
    fontSize: 18,
    marginTop: '2%'
  },
  
  profButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  
  logoutButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20
  },
  logoutText: {
    fontSize: 18,
    color: 'white'
  },
  editButton: {
    backgroundColor: '#0984e3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginRight: 30,
    borderRadius: 20
  },
  
  profTextAlign: {
    display: 'table-cell',
    textAlignVertical: 'middle',
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  }
  */


  profTop: {
    backgroundColor: '#77C3EC',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  
  setHorizontal: {
    width: '100%',
    flex: 1,
    flexDirection: 'column'
  },


  photoURL: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 5
  },
  photoAlign: {
    marginTop: '20%',
    marginLeft: '10%',
    textAlign: 'left',
  },

  upTextAlign: {
    marginTop: '25%',
    marginLeft: '10%',
    position: 'absolute',
    marginLeft: '50%',
    marginTop: '25%',
    marginRight: '15%'
  },


  profileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  },
  profileSubTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white'
  },

  onlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: 'white',
    borderColor: 'white',
    marginLeft: '110%',
    marginTop: '5%',
    position: 'absolute'
  },

  offlineStatusCircle: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'grey',
    borderColor: 'white',
    marginLeft: '110%',
    marginTop: '5%',
    position: 'absolute'
  },


  setHorizontalButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20
  },

  leftToggleButton: {
    backgroundColor: '#D3D3D3',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginLeft: '10%',
    marginTop: '5%',
    width: '40%',
    marginBottom: '5%'
  },
  rightToggleButton: {
    backgroundColor: '#D3D3D3',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '5%',
    marginRight: '10%',
    width: '40%',
    marginBottom: '5%'
  },


  buttonText: {
    marginTop: '5%',
    marginBottom: '5%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  horizButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'flex-start'
  },

  vertButtons: {
    flex: 1,
    flexDirection: 'column',
  },

  myTripsTitle: {
    marginLeft: '5%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 16,
    marginTop: '5%',
    marginLeft: '5%'
  },

  myTripsUser: {
    marginLeft: '5%',
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
    marginBottom: '5%'

  },

  myTripTab: {
    backgroundColor: '#BEBEBE',
    marginTop: '3%',
    marginLeft: '10%',
    marginRight: '10%',
    height: '30%',
    borderRadius: 20
  },

  likedTripTab: {
    backgroundColor: 'transparent',
    marginTop: '3%',
    marginLeft: '10%',
    marginRight: '10%',
    height: '50%',
    borderRadius: 20,

  },

  line: {

  },

  arrow: {
    marginLeft: '85%',
    float: 'left',
    marginTop: '7.5%',
    position: 'absolute'
  },


  





  profileScreen: {
  },
  profile: {
  },
  profileName: {
  },
  profileText: {
  },
  
  profButtons: {
  },
  
  logoutButton: {
  },
  logoutText: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20
  },
  editButton: {
    backgroundColor: '#0984e3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginRight: 30,
    borderRadius: 20
  },
  
  profTextAlign: {
    display: 'table-cell',
    textAlignVertical: 'middle',
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  }
});



export default ProfileScreen;


