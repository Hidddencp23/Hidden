import React, { useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import NotifCard from '../components/NotifCard';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../hooks/firebase';

const NotifScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [notifs, setNotifs] = React.useState([]);

  useEffect (
    () =>
    onSnapshot (
        query (collection(db, "notifs"), 
        where("fornotifs.posteduser", "==", user.uid)),
        (snapshot) => {
            setNotifs(snapshot.docs)
        }
    )
  )

  return (
    <View style={styles.notifScreen}>
      <View style={styles.notifHeader}>
        <Text style={styles.text}>Notifications</Text>
      </View>
      <View style={styles.notifs}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={notifs}
          renderItem={({ item }) => {
            return (
              <NotifCard data={item} navigation={navigation} />
            )
          }}
        />
      </View>
      <BottomNavBar navigation={navigation} />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  notifHeader: {
    padding: 10,
    paddingBottom: 0
  },
  subText: {
    paddingVertical: 5,
    fontSize: 18
  },
  notifs: {
    height: '90%',
    padding: 10,
    paddingRight: 22
  },
  notifScreen: {
    paddingBottom: 75,
    backgroundColor: 'white'
  }
});

export default NotifScreen;
