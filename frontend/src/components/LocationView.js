import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";

const LocationView = ({ location, navigation }) => {
    return (
        <TouchableOpacity style={styles.locCard} onPress={() =>
            navigation.navigate("LocationScreen", {
                location
            })
        }>
            <View style={styles.horizView}>
                <Image source={{ uri: location.image }} style={styles.locImg} />
                <View style={styles.vertView}>
                    <Text style={styles.locName}>{location.name}</Text>
                    <Text style={styles.locType}>{location.category}</Text>
                    <Text style={styles.locType}>{location.address}</Text>
                </View>
                <TouchableOpacity style={styles.favLocation}>
                 <Icon name="heart" size={20} style={styles.heartIcon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
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
        marginTop: "3%",
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


export default LocationView;