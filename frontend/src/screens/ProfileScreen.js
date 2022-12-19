import React from 'react';
import BottomNavBar from '../components/BottomNavBar';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { collection, where, onSnapshot, orderBy, query } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../hooks/firebase';
import ProfileCard from '../components/ProfileCard';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [data, setData] = React.useState([]);

  React.useEffect(
    () =>
    onSnapshot(
        query(collection(db, "posts"), where("username", "==", user.displayName) ,orderBy("timeStamp")),
        (snapshot) => {
            setData(snapshot.docs)
        }
    )
  )
  return (
    <View style={styles.profileScreen}>
      <View style={styles.profile}>
        <Image source={{ uri: user.photoURL }} style={styles.photoURL} />
        <Text style={styles.profileName}>{user.displayName}</Text>
        <Text style={styles.profileText}>{user.email}</Text>
        <View style={styles.profButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")} style={styles.editButton}>
            <Text style={styles.logoutText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={data}
          renderItem={({ index, item }) => {
            return (
              <ProfileCard post={item} />
            )
          }} 
        />
      </View>
      <BottomNavBar navigation={navigation} />
    </View>
  )
};

const styles = StyleSheet.create({
  profileScreen: {
    paddingBottom: 75
  },
  profile: {
    height: '100%',
    alignItems: 'center',
    paddingTop: '10%'
  },
  profileName: {
    fontSize: 30,
    marginTop: '5%'
  },
  profileText: {
    fontSize: 18,
    marginTop: '2%'
  },
  photoURL: {
    height: 150,
    width: 150,
    borderRadius: 100
  },
  profButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  logoutButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20
  },
  logoutText: {
    fontSize: 18,
    color: 'white'
  },
  editButton: {
    backgroundColor: '#0984e3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginRight: 30,
    borderRadius: 20
  }
});

export default ProfileScreen;
