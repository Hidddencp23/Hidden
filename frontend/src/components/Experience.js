import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  where,
  getDoc,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";


const Experience = ({ navigation, experience }) => {
  const [poster, setPoster] = useState("");
  const [likeLocation, setLikeLocation] = useState(false);
  const { user, userInfo } = useAuth();

  const handleLike = async () => {
    if (likeLocation == false) {
      setLikeLocation(true);
    } else {
      setLikeLocation(false);
    }
  };
  const getUserNameFromUid = async (uid) => {
    const docRef = doc(db, "Users", uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPoster(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserNameFromUid(experience.userId)
      .then(() => { })
      .catch(console.error);
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.horizView}
        onPress={() => {
          if (experience.userId == userInfo.uid) {
            navigation.navigate('Profile', { screen: 'ProfileScreen' });
          }
          else {
            navigation.navigate("OtherProfileScreen", {
              passedUserInfo: poster,
              otherUserId: experience.userId,
            });
          }
        }}
      >
        <Image source={{ uri: poster["profilePic"] }} style={styles.profImg} />
        <Text style={styles.profName}> {poster["name"]}</Text>
      </TouchableOpacity>

      <View>
        {experience.image ? (
          <Image source={{ uri: experience.image }} style={styles.locImg} />
        ) : null}
      </View>
      <View style={styles.buttons}>
        <View style={styles.activity}>
          <TouchableOpacity onPress={handleLike}>
            {likeLocation ? (
              <Icon name="heart" size={20} style={styles.isliked} />
            ) : (
              <Icon name="heart" size={20} style={styles.notliked} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.activity}>
          <MaterialIcons
            name="star"
            size={20}
            color={"#ffb300"}
          ></MaterialIcons>
          <Text> {experience.rating}</Text>
        </View>
      </View>
      <Text style={styles.desc}>{experience.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  horizView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: '3%',
    width: "100%"
  },
  buttons: {
    flexDirection: 'row',
    display: 'flex',
    paddingHorizontal: "5%",
    paddingVertical: "2.5%",
    justifyContent: 'space-between'
  },
  activity: {
    flexDirection: "row",
    alignItems: "center",
  },
  notliked: {
    color: "#BFBFBF",
  },
  isliked: {
    color: "#D42638",
  },
  locImg: {
    width: "90%",
    height: 200,
    // width: "90%",
    // height: "20%",
    marginHorizontal: "5%",
    marginVertical: "2.5%",
    borderRadius: 30//"15%"
  },
  profName: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 15,
    paddingVertical: "2.5%"
  },
  profImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 15,
    marginLeft: "5%",

  },
  desc: {
    marginHorizontal: "5%",
    color: "#6E6E6E",
  },
});
export default Experience;
