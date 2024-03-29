import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";


const TopNavBar = ({ navigation }) => {
    return (
        <>
        {/*
             {Platform.OS === 'ios' ?
            <View style={circleStyles.iosCircle}/> 
            :
            <View style={circleStyles.androidCircle}/> 
            }
        */}

            <View style={styles.header}>
                    <Image style={styles.headerImage} source={require('../../Images/hidden_logo.png')} />
                    {/* <TouchableOpacity style={styles.addButton}>
                        <Icon name="plus" size={20} />
                    </TouchableOpacity> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingRight: "5%",
        paddingBottom: "3%",
        paddingTop: "13%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: 40,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },   
    
    circle: {
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
    },
    

});

export default TopNavBar;