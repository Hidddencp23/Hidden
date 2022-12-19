import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';

const EditProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.editProfScreen}>
      <View style={styles.editProf}>
        <Text style={styles.text}>Edit Profile Screen</Text>
      </View>
      <BottomNavBar navigation={navigation}/>
    </View>
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

export default EditProfileScreen;
