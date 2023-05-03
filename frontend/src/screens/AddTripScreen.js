
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
import { doc, collection, updateDoc, addDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth'
import * as ImagePicker from 'expo-image-picker';

const AddTripScreen = ({ navigation }) => {
  const { user, userInfo } = useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const handleTitleChange = (text) => {
    setTitle(text);
  };


  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.canceled) {
      //setImage(_image.assets[0]['uri']);
      const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      setImage(base64);
    }
  };


  const handleSubmit = async () => {
    try {
      await addPost(user.uid, userInfo.name, title, image);
    } catch (error) {
      console.error("Unable to post", error);
    }
    navigation.goBack()
  }

  const addToTrips = async (userid, tripid) => {
    try {
      updateDoc(doc(db, "Users", userid), {
        myTrips: arrayUnion(tripid)
      });
    } catch (error) {
      console.error("unable to update", error)
    }
  }
  const addPost = async (user, name, title, image) => {
    const tripRef = await addDoc(collection(db, "Trips"), {
      user: user,
      tripName: title,
      tripPostTime: serverTimestamp(),
      newestUpdateTime: serverTimestamp(),
      image: image,
      locations: [],
      author: name
    });
    await addToTrips(user, tripRef.id)
  }

  return (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-170}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{
          height: Dimensions.get('window').height,
          alignItems: 'center'
        }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.Button} onPress={() =>
              navigation.navigate("ProfileScreen")
            }>
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Text style={styles.text}>Add Trip</Text>
          </View>
          <View style={styles.body}>
            <TouchableOpacity style={styles.box} onPress={addImage}>
              <Icon name='cloudupload' size={50} color={"#83C3FF"} />
              <Text>Upload Cover Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box}>
              <TextInput
                style={styles.textInput}
                value={title}
                onChangeText={handleTitleChange}
                maxLength={35}
                multiline={true}
                placeholder="Trip Name"
                placeholderTextColor="#8e8e8e" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.post} onPress={handleSubmit}>
              <Text style={styles.postText}>Create New Trip</Text>
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
    width: '80%',
    textAlign: 'center'
  },
  textInput: {
    paddingHorizontal: "2.5%",
    height: "100%",
    width: "100%",
    fontSize: 20
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
});

export default AddTripScreen;