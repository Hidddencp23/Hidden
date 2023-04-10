
import React, { Fragment, Component, useState } from 'react';
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
  TouchableOpacity,
} from 'react-native';

import UploadImageAndroid from '../components/UploadImageAndroid';




// for testing, don't merge in

const AddExperienceScreen = ({ navigation }) => {


  return (
    <View style={{ marginTop: 200}}>
      <UploadImageAndroid />
    </View>
  )

  
};



export default AddExperienceScreen;
