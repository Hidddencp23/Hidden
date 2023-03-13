import React from 'react';
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Dimensions
} from "react-native";

import { SearchBar } from 'react-native-elements';

import Icon from "react-native-vector-icons/Entypo";
// placeholder image for now
import deleteme from "../../assets/deleteme.png";


import { collection, onSnapshot, orderBy, query, limit, where, Timestamp, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';

import moment from 'moment';
//import firestore from 'firebase/firestore';

import firebase from "firebase/app";


// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const AddExperienceScreen = ({ route, navigation }) => {

  const { tripInfo } = route.params;

  const tripTitle = tripInfo[0];

  const [singleFile, setSingleFile] = useState(null);

  

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <SafeAreaView style={{ 
      height: Dimensions.get('window').height
    }}>

    <View style={styles.halfCircle}/>

    <Text style={styles.experienceTitle}>Add Experience</Text>

    <Text style={styles.tripTitle}>{tripTitle}</Text>


    <TouchableOpacity
        style={styles.imgUploadButton}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text>Select File</Text>
      </TouchableOpacity>


    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  halfCircle: {
    position:'absolute',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 2,
    height: Dimensions.get('window').width * 2,
    top: -1 * (Dimensions.get('window').height * .88),
    left: -1 * (Dimensions.get('window').width * .5),
    backgroundColor:'#77C3EC',
    justifyContent: 'center',
    alignItems: 'center'
  },

  experienceTitle: {
    textAlign: 'center',
    paddingTop: 65,
    fontSize: 25,
    fontWeight: 'bold',
  },

  tripTitle: {
    textAlign: 'left',
    paddingTop: 55,
    paddingLeft: '12.5%',
    fontSize: 25,
    fontWeight: 'bold',
  },

  imgUploadButton: {
    backgroundColor: "#83C3FF",
    height: 40,
    width: '62.5%',
    marginLeft: "7%",
    marginTop: "5%",
    borderRadius: 7,
    justifyContent: 'center',

  },



  text: {
    fontSize: 30,
  },
  editProf: {
    height: '100%'
  },  
  editProfScreen: {
    paddingBottom: 75
  }
});

export default AddExperienceScreen;