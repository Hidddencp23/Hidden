import SegmentedControl from "@react-native-segmented-control/segmented-control";
import useAuth from "../hooks/useAuth";
import LocationList from "../components/LocationList";
import Icon from "react-native-vector-icons/AntDesign";
//import { Icon } from 'react-native-vector-icons';
import { doc, collection, getDocs, updateDoc, arrayUnion} from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Image, SafeAreaView, Keyboard, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { db } from '../hooks/firebase';
import distance from '../hooks/distance';
import HomeMap from '../components/HomeMap';
import LocationItem from '../components/LocationItem';
import { SwipeablePanel } from 'rn-swipeable-panel';
import { SearchBar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native'


const AddLocationScreen = ({ navigation }) => {
    const { user, userInfo } = useAuth();
    const { params } = useRoute();
    const { tripInfo } = params;
    const [locations, setLocations] = useState([]);
    let myKey = 1;

    const [search, setSearch] = useState('');
    const getAllLocations = async () => {
        const querySnapshot = await getDocs(collection(db, "HiddenLocations"));
        let locs = []
        querySnapshot.forEach((doc) => {
            locs.push({id: doc.id, ...doc.data()})
        });
        setLocations(locs)
    }
    const handleAdd = async (location) => {
        try {
            updateDoc(doc(db, "Trips", tripInfo.id), {
                locations: arrayUnion(location.id)
              });
              console.log("Experience added");
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            navigation.navigate("TripDiaryScreen", {tripInfo})
      }
    const LocationView = ({ location }) => {
        return (
            <TouchableOpacity style={styles.locCard} onPress={() => handleAdd(location)}>
                <View style={styles.horizView}>
                    <Image source={{ uri: location.image }} style={styles.locImg} />
                    <View style={styles.vertView}>
                        <Text style={styles.locName}>{location.name}</Text>
                        <Text style={styles.locType}>{location.category}</Text>
                        <Text style={styles.locType}>{location.address}</Text>
                    </View>
                    <View style={styles.favLocation}>
                     <Icon name="plus" size={20} style={styles.heartIcon} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getAllLocations().then(() => {
        }).catch(console.error);
    }, [])

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container} keyboardVerticalOffset={-190}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.homeScreen} >         
            <View style={styles.searchPosition}>
                <SearchBar
                    lightTheme
                    round
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInput}
                    placeholder="Search"
                    onChangeText={setSearch}
                    value={search}></SearchBar>
            </View>   
                <Text style={styles.searchtitle} >Search Results</Text>
                    <ScrollView style={{ height: '100%' }}>
                        {(search != null && locations.length > 0) ? (
                            <>
                                {locations
                                    .filter(x => String(x.title).includes(search))
                                    .map((item) => <LocationView location={item} key={myKey++}/>)                                  
                                }
                            </>
                        ) : null}

                    </ScrollView>
            </SafeAreaView>
            </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
   
    homeScreen: {
        backgroundColor: 'transparent',
        height: '100%',
    },
    map: {
        position: 'absolute',
        top: '0%',
        left: 0,
        right: 0,
        bottom: 0,
    },
    filterRow: {
        flexDirection: 'row',
        paddingLeft: "5%",
        paddingTop: "2.5%"
    },
    filterText: {
        paddingLeft: "5%",
        marginRight: "2.5%",
        color: "black",
        textAlign: "left",
        fontSize: 14,
    },
    filterTouch: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#BFBFBF",
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        height: 25,
        borderRadius: 20,
    },
    listButton: {
        backgroundColor: "white",
        borderRadius: 50,
        position: "absolute",
        bottom: "5%",
        right: "5%",
      },
    icons: {
        paddingLeft: "10%",
        paddingRight: "15%",
        paddingTop: "1%",
        position: "absolute",
    },
    searchtitle: {
        marginLeft: "5%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 20,
    },
    swipePanel: {
       paddingTop: "2%",
    },
    sortBy: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 0
    },
    sortByTitle: {
        fontSize: 18
    },
    buttonStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        height: 25
    },
    searchContainer: {
        height: 48,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 15,
        flexDirection: 'row',
        marginBottom: '5%',
        marginHorizontal: '5%',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset : { width: 1, height: 8},
    },
    searchAlign: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "30%",
    
    },
    searchInput: {
        backgroundColor: 'transparent',
        height: 45,
        marginTop: -7.5
    },
    locImg: {
        marginLeft: '3%',
        width: 50,
        height: 50,
        borderRadius: 40
      },
    locCard: {
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        marginTop: "5%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        height: 90,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset : { width: 1, height: 5},
      },
    favLocation: {
        alignItems: 'center',
        paddingTop: "1%",
        width: "10%",
        height: "40%",
        borderRadius: 5,
    },
    heartIcon: {
        color: "#BFBFBF",
    },
    rowTextStyle: {
        fontSize: 18
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        fontSize: 18,
        marginHorizontal: 10
    },
    inputTitle: {
        marginLeft: 10
    },
    searchButton: {
        backgroundColor: '#0984e3',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 60
    },
    searchButtonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    clearSearches: {
        backgroundColor: '#0000',
        padding: 5,
        marginLeft: 10,
        marginRight: 200,
        marginTop: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    clearButtonText: {
        fontSize: 15,
        color: 'black',
        textAlign: 'center'
    },

    horizView: {
        backgroundColor: "lightGrey",
        flexDirection: "row",
        marginTop: '3%'
    },
    vertView: {
        flex: 1,
        flexDirection: "column",
    },
    
    locName: {
        marginLeft: "5%",
        color: "black",
        fontWeight: "bold",
        textAlign: "left",
        fontSize: 16,
        marginTop: "1%",
        marginLeft: "5%",
      },
    
      locType: {
        marginLeft: "5%",
        color: "#BEBEBE",
        textAlign: "left",
        fontSize: 14,
        marginBottom: "2.5%",
      },
     
});

export default AddLocationScreen;
