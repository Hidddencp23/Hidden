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


  // had some issues aligning with react native's <Text/> tags
  //  lot of divs at the moment


  // for later use:
  // <Icon name="right" size={30} style={styles.arrow}/>

  return (
    <SafeAreaView>
      <div style={styles.profTop}>

        <div style={styles.setHorizontal}>

          <div style={styles.photoAlign}>
            <img src={deleteme} alt="Avatar" style={styles.photoURL}/>
          </div>

          <div style={styles.upTextAlign}>
            <div style={styles.setHorizontal}>
              <div style={styles.profileTitle}>{firstName} {lastName} </div>
              { online === 1 ? 
                <>
                  <div style={styles.onlineStatusCircle}></div>
                </>
                :
                <>
                  <div style={styles.offlineStatusCircle}></div>
                </>
              }

            </div>
            <div style={styles.profileSubTitle}>{friends} Friends</div>
          </div>

          </div>


      </div>


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
      

      <div>

      { displayTrips === 'mine' ? 

        <>
          {exMyTrips.map((trip) => {

                return (
                  <>
      

                    <TouchableOpacity style={styles.myTripTab}>

                      <div style={styles.horizButtons}>
                        <div style={styles.vertButtons}>
                          <div style={styles.myTripsTitle}>{trip.title}</div>
                          <div style={styles.myTripsUser}>{'By: ' + trip.user}</div>
                        </div>
                      <Icon name="right" size={20} style={styles.arrow}/>
                      </div>
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
                      <div style={styles.horizButtons}>
                        <div style={styles.vertButtons}>
                          <div style={styles.myTripsTitle}>{trip.title}</div>
                          <div style={styles.myTripsUser}>{'By: ' + trip.user}</div>
                        </div>
                      <Icon name="right" size={20} style={styles.arrow}/>
                      </div>
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

       </div>


      
    </SafeAreaView>
  )
};



const styles = StyleSheet.create({
  profTop: {
    backgroundColor: '#77C3EC',
    height: '35vh',
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px'
  },


  setHorizontal: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  profCol: {
    flexDirection: 'table',
    verticalAlign: 'middle'
  },

  photoURL: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: '5px'
  },
  photoAlign: {

    marginTop: '20%',
    marginLeft: '5%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center'
  },

  upTextAlign: {
    marginTop: '25%',
    marginLeft: '10%',
    fontFamily: 'Arial'
    
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
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '2px solid white',
    marginLeft: '40%',
    marginTop: '3%',
    position: 'absolute'
  },

  offlineStatusCircle: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'grey',
    border: '2px solid white',
    marginLeft: '40%',
    marginTop: '3%',
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
    height: '50px',
    marginBottom: '5%'
  },
  rightToggleButton: {
    backgroundColor: '#D3D3D3',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '5%',
    marginRight: '10%',
    width: '40%',
    height: '50px',
    marginBottom: '5%'
  },


  buttonText: {
    marginTop: '9%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  horizButtons: {
    flex: 1,
    flexDirection: 'row'
  },

  vertButtons: {
    flex: 0,
    flexDirection: 'col',
    fontFamily: 'Arial'
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
    borderRadius: '20px',
    borderColor: 'black',
    borderWidth: '20px'
  },

  arrow: {
    marginLeft: '80%',
    float: 'left',
    marginTop: '-12.5%',
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
    verticalAlign: 'middle',
    fontSize: 30,
    fontWeight: "bold",
    color: 'white'
  }
});



export default ProfileScreen;
