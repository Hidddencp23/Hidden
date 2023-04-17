

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

const AddExperienceScreen = ({ navigation }) => {
  const { params } = useRoute();
  const { location } = params;
  const { user, userInfo } = useAuth();
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };
  //const [image, setImage] = useState(null);

  
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });
    if (!_image.cancelled) {
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
      await addPost(user.uid, location.id, starRating, image, description);
    } catch (error) {
      console.error("Unable to post", error);
    }
  }
  const addPost = async (userId, hiddenLocation, rating, image, description) => {
    try {
      addDoc(collection(db, "Experiences"), {
            userId: userId,
            hiddenLocation: hiddenLocation,
            rating: rating,
            image: image,
            description: description,
            datePosted: serverTimestamp(),
          });
          console.log("Experience added");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
  }
  /*arguments to pass:
    rating, image, hiddenLocation, datePosted, userId, description*/
  const StarRating = () => (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarRating(1)}>
            <MaterialIcons
              name={starRating >= 1 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(2)}>
            <MaterialIcons
              name={starRating >= 2 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(3)}>
            <MaterialIcons
              name={starRating >= 3 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(4)}>
            <MaterialIcons
              name={starRating >= 4 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(5)}>
            <MaterialIcons
              name={starRating >= 5 ? 'star' : 'star-border'}
              size={32}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-170}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ 
          height: Dimensions.get('window').height,
          alignItems: 'center'
        }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.Button} onPress={() =>
                navigation.navigate("LocationScreen", {
                    location
                })
            }>
                <Icon name="left" size={20}/>
            </TouchableOpacity>
            <Text style={styles.text}>Add Experience</Text>
          </View>
          <View style={styles.body}>
          <TouchableOpacity style={styles.box} onPress={addImage}>
            <Icon name='cloudupload' size={50} color={"#83C3FF"}/>
            <Text>Upload Photo/Video</Text>
          </TouchableOpacity>
            <View style={styles.rating}>
              <Text style={styles.text1}>Rating</Text>
              <StarRating/>
            </View>
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
            <TouchableOpacity style={styles.post} onPress={handleSubmit}>
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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

export default AddExperienceScreen;
