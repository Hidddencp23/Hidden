import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "./getMatchedUserInfo";
import { collection, onSnapshot, where, getDoc, doc } from "firebase/firestore";
import { db } from "../hooks/firebase";

import moment from "moment";

import Icon from "react-native-vector-icons/AntDesign";

const ChatRow = ({ chatInfo, navigation }) => {
  const { user } = useAuth();
  const [chatUser, setChatUser] = useState("");
  const chatId = chatInfo.id;
  //console.log(chatInfo)
  const getUserNameFromUid = async (uid) => {
    const docSnap = await getDoc(doc(db, "Users", uid));
    if (docSnap.exists()) {
      setChatUser(docSnap.data());
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      //console.log("No such document!");
    }
  };

  useEffect(() => {
    onSnapshot(doc(db, "Chats", chatId), (doc) => {
      //console.log("Chat Doc Changed");
      // console.log(doc)
      const otherUserUid = doc
        .data()
        ["users"].filter((id) => id != user.uid)[0];
      getUserNameFromUid(otherUserUid).catch(console.error);
    });
  }, []);

  const timeAgo =
    chatInfo.latestTimestamp != null
      ? moment
          .utc(chatInfo.latestTimestamp.toDate().toDateString())
          .local()
          .startOf("seconds")
          .fromNow()
      : "";

  return (
    <TouchableOpacity
      style={styles.messagecard}
      onPress={() =>
        navigation.navigate("TextingScreen", {
          chatId: chatId,
          chatUser: chatUser,
        })
      }
    >
      <Image
        style={styles.profPic}
        source={{ uri: /* profilepicTest */ chatUser.profilePic }}
      />

      <View style={styles.horizontal}>
        <View style>
          <Text style={styles.text}>
            {/*usernameTest*/} {chatUser.name}
          </Text>
          <Text style={styles.messagePad}>{chatInfo.latestMessage}</Text>
        </View>

        <View style={styles.alignRight}>
          <Text style={styles.alignDate}>{timeAgo}</Text>
          <View style={styles.arrowPad}>
            <Icon name="right" size={20} style={styles.arrow} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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

export default ChatRow;

// placeholder values for now
const usernameTest = "Test User";

const profilepicTest =
  "data:image/png;base64,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";
