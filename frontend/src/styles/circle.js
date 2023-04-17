import React from "react";
import {
    StyleSheet,
    Platform,
    Dimensions
  } from "react-native";

const circleStyles = StyleSheet.create({

    iosCircle: {
        position:'absolute',
        borderRadius: 1200, //Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').height * 0.925,
        top: -1 * (Dimensions.get('window').height * .88),
        left: -1 * (Dimensions.get('window').width * .5),
        backgroundColor:'#83C3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
    },

    androidCircle: {
        
        position:'absolute',
        borderRadius: 1200,//Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').height * 0.925,
        top: -1 * (Dimensions.get('window').height * .88),
        left: -1 * (Dimensions.get('window').width * .5),
        backgroundColor:'#83C3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
        //transform: [{ scaleX: 2 }],

        /*
        position:'absolute',
        marginTop: 20,
        width: 150,
        height: 150,
        backgroundColor: '#83C3FF',
        borderRadius: 120,
        transform: [{ scaleX: 2 }],
        */
    }

});

export default circleStyles;