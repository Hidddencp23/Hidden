import SegmentedControl from "@react-native-segmented-control/segmented-control";
import {
  collection,
  where,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
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
import SwipeUpDown from 'react-native-swipe-up-down';
import { SwipeablePanel } from 'rn-swipeable-panel';


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
                    backgroundColor: "grey",
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


    return (
        <SafeAreaView style={styles.homeScreen}>
            <Text>Home</Text>
            <HomeMap hiddenLocations={locations} ></HomeMap>
            <ScrollView style={{ height: '10%' }}>

                {locations.map((location, index) => (
                    <LocationView
                        location={location}
                        key={index}
                    />
                ))}


            </ScrollView>
            {/* <SwipeablePanel {...panelProps} isActive={isPanelActive} style={styles.swipePanel}>
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View>
                            <TouchableOpacity >
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    backgroundColor: "blue",
                                    height: 200,
                                }}
                            />
                            <View
                                style={{
                                    backgroundColor: "yellow",
                                    height: 200,
                                }}
                            />

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SwipeablePanel> */}
            {/* <SwipeUpDown
                ref={swipeUpDownRef}
                itemMini={(show) => (
                    <View
                        style={{
                            alignItems: "center",
                            height: 500,
                            backgroundColor: "blue",
                        }}
                    >
                        <Text onPress={show}>This is the mini view, swipe up!</Text>
                    </View>
                )}
                itemFull={(close) => (
                    <ScrollView>
                        <TouchableWithoutFeedback>
                            <View>
                                <TouchableOpacity onPress={close}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        backgroundColor: "blue",
                                        height: 200,
                                    }}
                                />
                                <View
                                    style={{
                                        backgroundColor: "yellow",
                                        height: 200,
                                    }}
                                />
                                <View
                                    style={{
                                        backgroundColor: "pink",
                                        height: 200,
                                    }}
                                />
                                <View
                                    style={{
                                        backgroundColor: "red",
                                        height: 200,
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                )}
                onShowMini={() => console.log("mini")}
                onShowFull={() => console.log("full")}
                animation="spring"
                extraMarginTop={24}
                disablePressToShow={true} // Press item mini to show full
                style={{ backgroundColor: "gray" }} // style for swipe
            /> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: 'white',
        // paddingBottom: 75,
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
