import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "./getMatchedUserInfo";
import {
  collection,
  onSnapshot,
  updateDoc,
  getDoc,
  doc,
  arrayRemove,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";
import moment from "moment";

const FriendRequest = ({ requestUserId, navigation }) => {
  const { user, userInfo } = useAuth();
  const [requestUser, setRequestUser] = useState("");
  const getUserNameFromUid = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", requestUserId));
    if (docSnap.exists()) {
      setRequestUser(docSnap.data());
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const acceptFriendRequest = () => {
    updateDoc(doc(db, "Users", user.uid), {
      incomingFriendRequests: arrayRemove(requestUserId),
      friendList: arrayUnion(requestUserId),
      friendCount: increment(1),
    });
    updateDoc(doc(db, "Users", requestUserId), {
      outgoingFriendRequests: arrayRemove(user.uid),
      friendList: arrayUnion(user.uid),
      friendCount: increment(1),
    });
  };

  const rejectFriendRequest = () => {
    updateDoc(doc(db, "Users", user.uid), {
      incomingFriendRequests: arrayRemove(requestUserId),
    });
    updateDoc(doc(db, "Users", requestUserId), {
      outgoingFriendRequests: arrayRemove(user.uid),
    });
  };

  useEffect(() => {
    getUserNameFromUid(requestUserId).catch(console.error);
  }, []);

  return (
    <View style={styles.messagecard}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OtherProfileScreen1", {
            otherUserInfo: requestUser,
            otherUserId: requestUserId,
          })
        }
      >
        <Image
          style={styles.profPic}
          source={{ uri: requestUser.profilePic }}
        />
      </TouchableOpacity>

      <View style={styles.horizontal}>
       
          <Text style={styles.text}>
            {requestUser.name}
          </Text>

        <TouchableOpacity onPress={() => acceptFriendRequest()}>
          <Icon name="check" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rejectFriendRequest()}>
          <Icon name="close" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowPad: {
    paddingTop: 10,
  },
  arrow: {
    color: "#9e9e9e",
  },
  alignDate: {
    marginLeft: "50%",
    fontWeight: "bold",
    color: "#9e9e9e",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  messagePad: {
    paddingTop: 5,
    paddingLeft: 5,
    color: "#9e9e9e",
  },
  profPic: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 15,
  },
  messagecard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    margin: 5,
    paddingBottom: 15,
    paddingTop: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  horizontal: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  vertical: {
    flexDirection: "column",
  },
  time: {
    textAlign: "right",
  },
});

export default FriendRequest;
