import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const AddTripScreen = ({ navigation }) => {
  return (
    <View style={styles.editProfScreen}>
      <View style={styles.editProf}>
        <Text style={styles.text}>Add Trip Screen</Text>
      </View>
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

export default AddTripScreen;