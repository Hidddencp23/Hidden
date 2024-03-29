import SegmentedControl from "@react-native-segmented-control/segmented-control";
import useAuth from "../hooks/useAuth";
import AntIcon from "react-native-vector-icons/AntDesign";
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState, useRef } from 'react';
import { Image, Keyboard, View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { db } from '../hooks/firebase';
import distance from '../hooks/distance';
import HomeMap from '../components/HomeMap';
import LocationView from '../components/LocationView';
import { SwipeablePanel } from 'rn-swipeable-panel';
//import NewSafeAreaView from '../components/NewSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = ({ navigation }) => {
    const { user, userInfo } = useAuth();
    const [locations, setLocations] = useState([])
    const [panelProps, setPanelProps] = useState({
        isActive: true,
        fullWidth: true,
        onlySmall: true,
        showCloseButton: false,
        onClose: () => closePanel(),
        allowTouchOutside: true,
        smallPanelHeight: 700
    });
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [filter, setFilter] = useState(null);

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
            locs.push({ id: doc.id, ...doc.data() })
            // setLocations([...locations, doc.data()])
        });
        setLocations(locs)
    }

    const filterLocations = (location) => {
        if (filter == null) { return true }
        else if (filter == "favorites" && userInfo.LikedLocations.includes(location.id)) {
            return true
        }
        else if (location.category == filter) { return true }
    }

    const onFilterChanged = (filterCategory) => {
        if (filterCategory == filter) { setFilter(null) }
        else { setFilter(filterCategory) }
    }

    const filterBackgroundStyle = (filterName) => {
        return [styles.filterTouch, (filter == filterName) ? { backgroundColor: "#83C3FF" } : { backgroundColor: '#f2f0f0' }]
    }

    const filterIconStyle = (filterName) => {
        return (filter == filterName) ? { color: "white" } : { color: '#83C3FF' }
    }


    const SearchFilters = () => {
        return (
            <ScrollView horizontal={true} style={styles.filterRow}>
                <TouchableOpacity style={filterBackgroundStyle("favorites")} onPress={() => onFilterChanged("favorites")}>
                    <AntIcon name="heart" size={20} style={filterIconStyle("favorites")} />
                    <Text style={styles.filterText}> Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterBackgroundStyle("brunchSpots")} onPress={() => onFilterChanged("brunchSpots")}>
                <MaterialIcon name="brunch-dining" size={25} style={filterIconStyle("brunchSpots")} />
                    <Text style={styles.filterText}> Brunch Spot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={filterBackgroundStyle("dateSpot")} onPress={() => onFilterChanged("dateSpot")}>
                    <MaterialIcon name="local-restaurant" size={25} style={filterIconStyle("dateSpot")} />
                    <Text style={styles.filterText}> Date Spot</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }

    useEffect(() => {
        getAllLocations().then(() => {
        }).catch(console.error);
    }, [])

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container} keyboardVerticalOffset={-190}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.homeScreen} >
                    <HomeMap style={styles.map} hiddenLocations={locations.filter(filterLocations)} ></HomeMap>

                    <SwipeablePanel {...panelProps} isActive={isPanelActive} style={styles.swipePanel}>

                        {/* <Text style={styles.searchtitle} >Search Results</Text> */}
                        <SearchFilters></SearchFilters>
                        {locations.filter(filterLocations).map((location, index) => (
                            <LocationView
                                navigation={navigation}
                                location={location}
                                key={location.id}
                            />
                        ))}
                    </SwipeablePanel>
                    <TouchableOpacity style={styles.listButton} onPress={() => openPanel()}>
                        <AntIcon name="minus" color={"#BFBFBF"} size={50} style={{ justifyContent: "center" }}> </AntIcon>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    homeScreen: {
        backgroundColor: 'transparent',
        paddingTop: 0,
        height: '100%',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    filterRow: {
        paddingLeft: "5%",
        paddingTop: "2.5%",
        flex: "1",
    },
    filterText: {
        paddingLeft: "5%",
        color: "black",
        textAlign: "left",
        fontSize: 14,
    },
    filterTouch: {
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        height: 30,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    listButton: {
        backgroundColor: "white",
        borderRadius: 15,
        position: "absolute",
        width: "100%",
        bottom: "-3%",
        alignItems: "center",
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
        paddingBottom: "37%",
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
    },
    vertView: {
        flex: 1,
        flexDirection: "column",
    },
});

export default HomeScreen;
