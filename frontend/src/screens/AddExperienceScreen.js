
import React from 'react';
import { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions
} from "react-native";



const AddExperienceScreen = ({ navigation }) => {


  return (
    <SafeAreaView style={{ 
      height: Dimensions.get('window').height
    }}>

    <Text style={styles.text}>Add Experience Screen</Text>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
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
