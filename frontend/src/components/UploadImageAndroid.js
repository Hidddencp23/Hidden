

import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    Dimensions,
    TouchableOpacity
  } from 'react-native';

import Icon from "react-native-vector-icons/AntDesign";

import * as ImagePicker from 'expo-image-picker';

import * as FileSystem from 'expo-file-system';



const UploadImageAndroid = () => {

  const [image, setImage] = useState(null);

  
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!_image.cancelled) {
      setImage(_image.assets[0]['uri']);

      const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      
      // this is the base64 string of the uploaded image
      // could pass in a setter to get this value to the form
      // (or just pull out the function to the AddExperienceScreen)
      //setImageString(base64);
      console.log(base64);

    }
  };
  


  return (
    <TouchableOpacity style={styles.box} onPress={addImage}>
      <Icon name='cloudupload' size={50} color={"#83C3FF"}/>
      <Text>Upload Photo/Video</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    box: {
        width: "90%",
        height: "25%",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#83C3FF",
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default UploadImageAndroid