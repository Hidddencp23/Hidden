import React, { Fragment, Component, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { MaterialIcons } from '@expo/vector-icons';
import { collection, serverTimestamp, addDoc} from "firebase/firestore";
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';

import * as FileSystem from 'expo-file-system';

// source: https://www.atomlab.dev/tutorials/react-native-star-rating

const EditProfileScreen = ({ navigation }) => {
  const { user, userInfo } = useAuth();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const [name, setName] = useState("");
  const handleNameChange = (text) => {
    setName(text);
  };
  const [address, setAddress] = useState("");
  const handleAddressChange = (text) => {
    setAddress(text);
  };
  const [lat, setLat] = useState(0);
  const handleLatChange = (text) => {
    setLat(Number(text));
  };
  const [long, setLong] = useState(0);
  const handleLongChange = (text) => {
    setLong(Number(text));
  };

  
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!_image.canceled) {
      setImage(_image.assets[0]['uri']);

      // const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      
      // this is the base64 string of the uploaded image
      // could pass in a setter to get this value to the form
      // (or just pull out the function to the AddExperienceScreen)
      //setImageString(base64);

    }
  };
  

  const handleSubmit = async () => {
    try {
      await addPost(name, address, image, description, long, lat);
    } catch (error) {
      console.error("Unable to post", error);
    }
    console.log("submitted")
  }
  const addPost = async (name, address, image, description, long, lat) => {
    try {
      addDoc(collection(db, "HiddenLocations"), {
            name: name,
            address: address,
            description: description,
            image: image,
            coordinates: {latitude: +lat, longitude: +long},
            category: [],
            experiences: [],
            Liked: [],
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
  }
  return (
    <KeyboardAvoidingView behavior="position">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.body}>
          <TouchableOpacity style={styles.box} onPress={addImage}>
            <Icon name='cloudupload' size={20} color={"#83C3FF"}/>
            <Text>Upload Photo/Video</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={name}
                      onChangeText={handleNameChange}
                      maxLength={300}
                      multiline={true}
                      placeholder="Name"
                      placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={address}
                      onChangeText={handleAddressChange}
                      maxLength={300}
                      multiline={true}
                      placeholder="Address"
                      placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={description}
                      onChangeText={handleDescriptionChange}
                      maxLength={300}
                      multiline={true}
                      placeholder="Description"
                      placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={lat}
                      onChangeText={handleLatChange}
                      maxLength={300}
                      multiline={true}
                      numeric
                      placeholder="Latitude"
                      placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={long}
                      onChangeText={handleLongChange}
                      maxLength={300}
                      multiline={true}
                      numeric
                      placeholder="Longitude"
                      placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.post} onPress={handleSubmit}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
     </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  textInput: {
    paddingHorizontal: "2.5%",
    height: "100%",
    width: "100%"
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
    zIndex: 1,
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
    height: "10%",
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
});

export default EditProfileScreen;
