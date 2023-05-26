import {
    StyleSheet,
    Platform
  } from "react-native";

const profileStyles = StyleSheet.create({

    // profile
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
      position: 'relative',
      height: 150,
      width: 150,
      borderRadius: 100,
      borderStyle: "solid",
      borderWidth: 2,
      borderColor: 'black',
      marginTop: '5%',
      marginBottom: '5%',
      zIndex: 1
    },
    photoURLRow: {
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
      paddingTop: '2%',
      height: '20%'
    },
    profileSubTitle: {
      fontSize: 17,
      fontWeight: "normal",
      color: "black",
      //fontFamily: ''
    },
    friendsSubTitle: {
      fontSize: 17,
      fontWeight: "normal",
      color: "#77C3EC",
      //fontFamily: ''
    },
  
    // may need to resize through js
    tripImg: {
      marginLeft: '3%',
      width: '25%',
      height: '80%',
    },
  
    searchContainerProfile: {
  
      height: 48,
      width: '62.5%',
      backgroundColor: 'white',
      borderColor: 'white',
      borderRadius: 15,
      flexDirection: 'row',
      marginBotton: '5%',
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset : { width: 1, height: 8},
    },
  
    searchBarContainer: {
  
      height: 45,
      marginLeft: '7%',
      marginTop: '25%',
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
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset : { width: 1, height: 8},
    },
  
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
      height: 45,
      marginLeft: "7%",
      width: "86%",
      marginBottom: "5%",
  
    },
  
    addFriendButton: {
      backgroundColor: "#83C3FF",
      height: 45,
      width: '62.5%',
      marginLeft: "7%",
      borderRadius: 7,
      justifyContent: 'center',
      marginTop: "-5%",
      marginBottom: "5%"
  
    },
    addFriendText: {
      textAlign: 'center',
      fontWeight: 'bold'
    },
    messageButton: {
      backgroundColor: "#83C3FF",
      height: 45,
      width: '16%',
      marginLeft: "7.5%",
      borderRadius: 7,
      justifyContent: 'center',
      marginTop: "-5%",
      marginBottom: "5%"
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

    tripAlign: {
        borderBottomColor: "black",
        marginLeft: "5%",
        marginRight: "5%",
    },



    // trip diary
    tripImg: {
        marginLeft: '3%',
        width: '25%',
        height: '80%',
    },
    searchContainerExperiences: {
        height: 45,
        marginLeft: '7%',
        //marginTop: '25%',
        width: '62.5%',
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


  });

  export default profileStyles;