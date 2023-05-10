import React, { useState } from 'react';
import UploadImageAndroid from '../components/UploadImageAndroid';
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth'
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
import { setDoc, doc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";

import * as ImagePicker from 'expo-image-picker';

import * as FileSystem from 'expo-file-system';



import ImageResizer from "react-native-image-resizer";


/*
import { Buffer } from "buffer";



import Resizer from 'react-native-image-resizer';
import { Platform } from 'react-native';

*/



const EditProfileScreen = ({ navigation }) => {
  const [changeName, setChangeName] = useState("");
  const { user, userInfo, logout } = useAuth();
  const [image, setImage] = useState(null);
  const handleChangeName = (text) => {
    setChangeName(text);
  };

  const handleSubmit = async () => {
    try {
      updateDoc(doc(db, "Users", user.uid), {
        name: changeName,
        profilePic: image,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  



  async function get64String(uri) {

    // stuff after header
    var fileContent = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' })
    
    const fileSizeInBytes = await FileSystem.getInfoAsync(uri);

    // sizes greater than 1 MB get rejected by firebase
    if (fileSizeInBytes.size > 1000000) {
      console.log('image is too big: needs resizing')

      console.log('size: ' + fileSizeInBytes.size)
      
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

      console.log('done resizing')

      
      

    }

    return "data:image/jpeg;base64," + fileContent;






  }

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.5, // take a look at this
      
    });
    if (!_image.canceled) {

      const formatted64 = await get64String(_image.assets[0]['uri']);
      //const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      //const formatted64 = "data:image/png;base64," + base64;
      setImage(formatted64);

      //console.log(formatted64)

    }
  };

  return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-170}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ 
          height: Dimensions.get('window').height,
          alignItems: 'center'
        }}>
          <TouchableOpacity style={styles.circle} onPress={addImage}>
            <Icon name='cloudupload' size={50} color={"#83C3FF"}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box}>
              <TextInput
                      style={styles.textInput}
                      value={changeName}
                      onChangeText={handleChangeName}
                      multiline={true}
                      placeholder="Change Name"
                      placeholderTextColor="#8e8e8e" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={handleSubmit}>
            <Text style={styles.postText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={logout}>
            <Text style={styles.postText}>Logout</Text>
          </TouchableOpacity>
          </SafeAreaView>
     </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({

  textInput: {
    paddingHorizontal: "2.5%",
    height: "100%",
    width: "100%"
  },
  circle: {
    marginTop: "10%",
    marginBottom: "10%" ,
    width: "20%",
    height: "10%",
    //borderRadius: "50%",
    borderRadius: 50, // look at this
    borderWidth: 2,
    borderColor: "#83C3FF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    paddingTop: "3%",
    marginTop: "10%",
    width: "90%",
    height: "6%",
    //borderRadius: "15%",
    borderRadius: 15, // look at this
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
  postText: {
    fontSize: 20,
    weight: 'bold'
  },
  save: {
    marginTop: "10%",
    width: "90%",
    height: "6%",
    backgroundColor: "#83C3FF",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default EditProfileScreen;
