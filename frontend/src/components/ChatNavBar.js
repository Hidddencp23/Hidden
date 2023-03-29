import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";


const ChatNavBar = ({ navigation }) => {
    return (
        <>
            <View style={{
                position:'absolute',
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
                width: Dimensions.get('window').width * 2,
                height: Dimensions.get('window').width * 2,
                top: -1 * (Dimensions.get('window').height * .88),
                left: -1 * (Dimensions.get('window').width * .5),
                backgroundColor:'#83C3FF',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 90,
            }}/> 
            <View style={styles.header}>
                <Text style={styles.baseText}>Chat</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontWeight:'bold',
        fontSize: 20,
        paddingLeft: "5%",
    },
    header: {
        height: 100,
        paddingRight: "10%",
        paddingBottom: "3%",
        paddingTop: "13%",
        alignItems: 'center',
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
    },
    headerImage: {
        height: 100,
        width: 100,
    },
    addButton: {
        backgroundColor: "white",
        height: "100%",
        width: "200%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },

});

export default ChatNavBar;