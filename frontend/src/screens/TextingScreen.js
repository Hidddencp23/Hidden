import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import getMatchedUserInfo from "../components/getMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  updateDoc,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../hooks/firebase";
import Icon from "react-native-vector-icons/AntDesign";
import Ionicon from "react-native-vector-icons/Ionicons";
import moment from "moment";

import ChatScreenNavBar from "../components/NavBars/ChatScreenNavBar";

const TextingScreen = ({ navigation }) => {
  const { user, userInfo } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [chatInfo, setChatInfo] = useState(null);
  const { chatId, chatUser } = params;
  /*
    const formatMessages = (messages) => {

        let messagetimes = [];
    
        if (messages){
            for (let i in messages){
                if (messages[i] != null && messages[i].timestamp != null){
                    console.log(moment.utc((messages[i].timestamp).toDate().toISOString()).local().startOf('seconds').fromNow())
                    let timeAgoMessage = moment.utc(messages[i].timestamp.toDate().toISOString()).local().startOf('seconds').fromNow();
                    //let timeAgoMessage = moment.utc((messages[i].timestamp).toDate().toDateString()).local().startOf('seconds').fromNow();
                    messagetimes.push(timeAgoMessage);
                }
            }
        }
    
        
        let newArr = [];
    
        let i = 0;
        for (i in messagetimes){
            if (( i === 0 || messagetimes[i] !== messagetimes[i - 1])){
                newArr.push(messagetimes[i]);
            }
            else {
                newArr.push(null)
            }
        }
    
        return newArr;
    }
    */

  const sendMessage = () => {
    let currentTimestamp = Timestamp.now();
    updateDoc(doc(db, "Chats", chatId), {
      latestTimestamp: currentTimestamp,
      latestMessage: input,
      messages: arrayUnion({
        timestamp: currentTimestamp,
        sender: user.uid,
        message: input,
      }),
    });

    setInput("");
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  /*

    useEffect(() => {

        if (messages != null){
            let showtimes = formatMessages(messages);
            let tempmessages = messages;

            let i = 0;
            for (i in tempmessages){
                tempmessages[i].timestamp = showtimes[i];
            }
            
            setshowmessages(tempmessages);
        }
    }, 
    [messages]);
    */

  // get other's profile
  // send into ReceiverMessage
  // move receiver cards right
  // fix tab colors
  // clean up bottom search bar

  useEffect(
    () =>
      onSnapshot(doc(db, "Chats", chatId), (doc) =>{
        let docData = doc.data()
        docData.messages = docData.messages.reverse()
        setChatInfo(docData)
      }
      ),
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <ChatScreenNavBar navigation={navigation} chatUser={chatUser} />

      <KeyboardAvoidingView
        //behavior={Platform.OS === "ios" ? "padding" : "height"}
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
        //keyboardVerticalOffset={0} 
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={ chatInfo != null ? chatInfo.messages : null}
            inverted={-1}
            style={{ paddingLeft: 4 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.sender === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage
                  key={message.id}
                  message={message}
                  chatUser={chatUser}
                />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          {/* <Icon
            name="plus"
            size={20}
            style={{
              marginLeft: 15,
              marginTop: 22,
            }}
          /> */}

          <TextInput
            style={styles.messageinputbar}
            placeholder=""
            placeholderTextColor="grey"
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
            backgroundColor="#EBECF0"
          />

          <TouchableOpacity onPress={sendMessage} title="Send" color="#FF5864">
            <Ionicon
              name="send"
              size={20}
              style={{
                marginTop: 22,
                marginRight: 12,
                flexGrow: 1
              }}
              color="#83C3FF"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  messageinputbar: {
    height: 40,
    margin: 12,
    marginBottom: 22,
    borderWidth: 0.5,
    flexGrow: 1,
    padding: 10,
    borderColor: "transparent",
    width: "75%",
    borderRadius: 10,
  },
});

export default TextingScreen;
