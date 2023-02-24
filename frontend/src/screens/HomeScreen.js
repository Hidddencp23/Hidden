import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../hooks/firebase';
import SearchModal from '../components/SearchModal';
import distance from '../hooks/distance';
import useAuth from '../hooks/useAuth'


const HomeScreen = ({ navigation }) => {
    const {user, userInfo } = useAuth();
    console.log(user.uid)
    console.log(userInfo["email"])
    return (
        <View style={styles.homeScreen}>
            <Text>Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeScreen: {
        backgroundColor: 'white',
        paddingBottom: 75,
        height: '100%'
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