import SegmentedControl from "@react-native-segmented-control/segmented-control";
import useAuth from "../hooks/useAuth";
import LocationList from "../components/LocationList";
import Icon from "react-native-vector-icons/AntDesign";
//import { Icon } from 'react-native-vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../hooks/firebase';
import SearchModal from '../components/SearchModal';
import distance from '../hooks/distance';
import HomeMap from '../components/HomeMap';
import LocationItem from '../components/LocationItem';

// placeholder image for now
import deleteme from "../../assets/deleteme.png";

// need to connect db
//import { db } from '../hooks/firebase';

const HomeScreen = ({ navigation }) => {
    const { user, userInfo } = useAuth();
    const [locations, setLocations] = useState([])
    const [panelProps, setPanelProps] = useState({
        fullWidth: false,
        openLarge: true,
        showCloseButton: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // closeOnTouchOutside: true
        // ...or any prop you want
    });
    const [isPanelActive, setIsPanelActive] = useState(true);
    const swipeUpDownRef = useRef();
    // swipeUpDownRef.current.showFull();

    console.log(user.uid)
    console.log(userInfo["email"])


    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const getAllLocations = async () => {
        const querySnapshot = await getDocs(collection(db, "HiddenLocations"));
        // setLocations(
        //     querySnapshot.docs.map(doc => ({
        //         id: doc.id,
        //         ...doc.data()
        //     }))
        // )
        let locs = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            locs.push({id: doc.id, ...doc.data()})
            // setLocations([...locations, doc.data()])
        });
        setLocations(locs)
    }

    const LocationView = ({ location }) => {
        return (
            <TouchableOpacity onPress={() =>
                navigation.navigate("LocationScreen", {
                    location
                })
            }>
                <View style={{
                    backgroundColor: "lightGrey",
                    height: 100,
                }}>
                    <Text>{location.name}</Text>
                    <Text>{location.description}</Text>
                    <Text>{location.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        getAllLocations().then(() => {
            console.log("locations");
            console.log(locations)
        }).catch(console.error);
    }, [])

    // console.log(userInfo)
    return (
        <SafeAreaView style={styles.homeScreen}>
            <HomeMap hiddenLocations={locations} ></HomeMap>
            <ScrollView style={{ height: '10%' }}> 
                {/* Temporary list to show locations. 
                    Should be swipeable component in the future */}
                
                {locations.map((location, index) => (
                    <LocationItem
                        navigation={navigation}
                        location={location}
                        key={index}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: 'white',
        paddingTop: "10%",
        height: '100%',
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    map: {
        height: '100%',
    },
    swipePanel: {
        marginTop: 1000
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
    }
});

export default HomeScreen;
