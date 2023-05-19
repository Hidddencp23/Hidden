

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
import { MaterialIcons } from '@expo/vector-icons';
import { collection, serverTimestamp, addDoc} from "firebase/firestore";
import { db } from '../hooks/firebase';
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';

import * as FileSystem from 'expo-file-system';
//import NewSafeAreaView from '../components/NewSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      aspect: [4,3],
      quality: 0.1,
    });
    if (!_image.canceled) {
      
      const formatted64 = await get64String(_image.assets[0]['uri']);

      // old code here
      //const base64 = await FileSystem.readAsStringAsync(_image.assets[0]['uri'], { encoding: 'base64' });
      //const formatted64 = "data:image/png;base64," + base64;

      // setting inside function now
      //setImage(formatted64);


    }
  };
  

  const handleSubmit = async () => {
    try {
      await addPost(user.uid, location.id, starRating, image, description);
    } catch (error) {
      console.error("Unable to post", error);
    }
    navigation.goBack()
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
        <View style={{ 
          height: Dimensions.get('window').height,
          alignItems: 'center'
        }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.Button} onPress={() =>
                navigation.navigate("LocationScreen", {
                    location
                })
            }>
                <Icon name="close" size={20}/>
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
