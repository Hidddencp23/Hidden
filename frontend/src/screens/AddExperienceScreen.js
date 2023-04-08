
import React from 'react';
import { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import StarRating from '../components/StarRating';


const AddExperienceScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ 
      height: Dimensions.get('window').height,
      alignItems: 'center'
    }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("HomeScreen")}>
            <Icon name="left" size={20}/>
        </TouchableOpacity>
        <Text style={styles.text}>Add Experience</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity style={styles.box}>
            <Icon name='cloudupload' size={50} color={"#83C3FF"}/>
            <Text>Upload Photo/Video</Text>
        </TouchableOpacity>
        <View style={styles.rating}>
          <Text style={styles.text1}>Rating</Text>
          <StarRating/>
        </View>
        <TouchableOpacity style={styles.box}>
          <TextInput
                  style={styles.loginInputField}
                
                  placeholder="Description"
                  placeholderTextColor="#8e8e8e" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.post}>
          <Text style={styles.postText}>POST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    weight: 'bold',
    paddingLeft: '12%'
  },
  text1: {
    fontSize: 15,
    weight: 500,
    paddingLeft: "10%"
  },
  rating: {
    width: "90%",
    paddingVertical: "5%"
    
  },
  postText: {
    fontSize: 20,
    weight: 'bold'
  },
  post: {
    width: "90%",
    height: "7%",
    backgroundColor: "#83C3FF",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'absolute',
    height: 100,
    width: "100%",
    paddingBottom: "3%",
    paddingTop: "13%",
    paddingHorizontal: "5%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#83C3FF',
    overflow: 'hidden',
  },
  body: {
    width: "100%",
    height: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
    alignItems: 'center',
    justifyContent: 'space-evenly'

  },
  box: {
    width: "90%",
    height: "25%",
    borderRadius: "15%",
    borderWidth: 2,
    borderColor: "#83C3FF",
    alignItems: 'center',
    justifyContent: 'center',

  },
  Button: {
    backgroundColor: "white",
        height: "100%",
        width: "10%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
  },
  editProf: {
    height: '100%'
  },  
  editProfScreen: {
    paddingBottom: 75
  }
});

export default AddExperienceScreen;
