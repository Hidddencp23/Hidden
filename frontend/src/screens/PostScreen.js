import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 

const PostScreen = ({ navigation }) => {
  return (
    <View style={styles.postScreen}>
      <View style={styles.posts}>
        <Text style={styles.text}>I am a posting as a...</Text>
        <View style={styles.postBoxes}>
        <TouchableOpacity onPress={() => navigation.navigate("PostDriverScreen")}>
            <View style={styles.postBox}>
              <Text style={styles.postBoxText}>Driver</Text>
              <AntDesign name="car" size={24} color="black" />
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PostRiderScreen")}>
            <View style={styles.postBox}>
              <Text style={styles.postBoxText}>Rider</Text>
              <MaterialCommunityIcons name="car-seat" size={24} color="black" />
            </View>
        </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar navigation={navigation}/>
    </View>
  )
};

const styles = StyleSheet.create({
  postScreen: {
    paddingBottom: 75,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 30,
    textAlign: 'center'
  },
  posts: {
    height: '100%',
    padding: 25
  },
  postBoxes: {
    marginVertical: 50
  },
  postBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15
  },
  postBoxText: {
    fontSize: 25
  }
});

export default PostScreen;
