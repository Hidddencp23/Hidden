
import React, { Fragment, Component, useState } from 'react';
import {
  StyleSheet,
  //SafeAreaView,
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

import * as FileSystem from 'expo-file-system';
import NewSafeAreaView from '../components/NewSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTripScreen = ({ navigation }) => {
  const { user, userInfo } = useAuth();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const handleTitleChange = (text) => {
    setTitle(text);
  };

  // check start of file content to see if png or jpeg 
  // return base 64 header string (or error if not found)
  const getBase64Header = (fileContent) => {
    const isPNG = fileContent.slice(0, 8) === "iVBORw0K"; // PNG header
    const isJPEG = fileContent.slice(0, 4) === "/9j/"; // JPEG header
  
    if (isPNG) {
      return "data:image/png;base64,";
    } else if (isJPEG) {
      return "data:image/jpeg;base64,";
    } else {
      throw new Error("Invalid image format");
    }
  }


  const get64String = async(uri) => {

    // stuff after header
    var fileContent = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
    
    const fileSizeInBytes = await FileSystem.getInfoAsync(uri);

    // update sizes greater than 1 MB get rejected by firebase
    console.log('size: ' + fileSizeInBytes.size)
      
    if (fileSizeInBytes.size > 1000000) {
      console.log('image is too big: needs resizing')

      //console.log('size: ' + fileSizeInBytes.size)
      
      /*
      let result = await ImageResizer.createResizedImage(
        uri,
        1000,
        1000,
        'JPEG',
        1,
        null

      );
      */

      //console.log('done resizing')

      
      return '';

    }

    const header = getBase64Header(fileContent);
    const full64String = header + fileContent;

    setImage(full64String);

    return full64String;

  }


  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    if (!_image.canceled) {
      
      //console.log(_image.assets[0]['uri']);
      const formatted64 = await get64String(_image.assets[0]['uri']);
      //console.log(formatted64)

      // old code here
      //const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      //const formatted64 = "data:image/png;base64," + base64;

      // setting inside function now
      //setImage(formatted64);
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
    fontSize: 20,
    textAlign: 'center'
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
    borderRadius: 30,//"15%",
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