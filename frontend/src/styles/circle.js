import React from "react";
import {
    StyleSheet,
    Platform,
    Dimensions
  } from "react-native";

const circleStyles = StyleSheet.create({

    iosCircle: {
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

    androidCircle: {
        position:'absolute',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 4,
        width: Dimensions.get('window').width * 2,
        height: Dimensions.get('window').height * 0.91,
        top: -1 * (Dimensions.get('window').height * .88),
        left: -1 * (Dimensions.get('window').width * .5),
        backgroundColor:'#83C3FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
    }

});

export default circleStyles;