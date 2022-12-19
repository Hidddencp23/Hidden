import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; 

const BottomNavBar = ({ navigation }) => {
    return (
        <View style={styles.bottomNavBar}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("MessagingScreen")}>
                    <Feather name="inbox" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomNavBar: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0
    },
    navBar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingTop: 20,
        paddingBottom: 35,
        borderTopWidth: 1,
        borderTopColor: 'grey'
    }
})

export default BottomNavBar;