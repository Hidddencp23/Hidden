import { View, Text,
     StyleSheet, 
     TextInput, 
     Button, 
     KeyboardAvoidingView, 
     Platform, 
     SafeAreaView, 
     TouchableWithoutFeedback,
     Keyboard, 
     FlatList,
     TouchableOpacity
    } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChatHeader from '../components/ChatHeader'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import getMatchedUserInfo from '../components/getMatchedUserInfo'
import SenderMessage from '../components/SenderMessage'
import GroupReceiverMessage from '../components/GroupReceiverMessage'
import { updateDoc, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import { db } from '../hooks/firebase'
import Icon from "react-native-vector-icons/AntDesign";
import Ionicon from 'react-native-vector-icons/Ionicons'; 

import ChatScreenNavBar from '../components/NavBars/ChatScreenNavBar';

const GroupTextingScreen = ({ navigation }) => {
    const { user } = useAuth();
    const {params} = useRoute();
    const [input, setInput] =  useState("");
    const [messages, setMessages] = useState([]);
    const { chatId, chatInfo } = params;
    console.log("TextchatID: ");

    useEffect(() => 
        onSnapshot(
            query(
                collection(db , 'ProximityChats', chatId, 'Messages'),
                orderBy('timestamp', 'desc')
            ), 
            (snapshot) => 
                setMessages(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ... doc.data()
                    }))
                )
        ),
    [])

    const sendMessage = () => {
        addDoc(collection(db , 'ProximityChats', chatId, 'Messages'), {
            timestamp: serverTimestamp(),
            sender: user.uid,
            message: input
        });
        // updateDoc(doc(db , 'ProximityChats', chatId), {
        //     latestTimestamp: serverTimestamp(),
        //     latestMessage: input
        // });

        setInput("");
    };

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>

        <ChatScreenNavBar title={chatInfo.name}/>
        {/*<ChatHeader navigation={navigation} title={chatInfo.name} />*/}
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList 
                        data={messages}
                        inverted={-1}
                        style={{paddingLeft: 4,
                                }}
                        keyExtractor={item => item.id}
                        renderItem={({item: message}) => 
                            message.sender === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <GroupReceiverMessage key={message.id} message={message} userUid={message.sender}/>
                            )
                        }
                    />
                </TouchableWithoutFeedback>

{/*
                <View style={{ flexDirection: "row" }}>
                    <TextInput 
                        style={styles.messageinputbar}
                        placeholder="Send Message..."
                        placeholderTextColor="grey" 
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button onPress={sendMessage} title="Send" color="#FF5864"/>
                </View>
*/}

                <View style={{ flexDirection: "row" }}>
                    <Icon
                        name="plus"
                        size={20}
                        style={{
                            marginLeft: 15,
                            marginTop: 22
                        }}
                    />

                    <TextInput 
                        style={styles.messageinputbar}
                        placeholder=""
                        placeholderTextColor="grey" 
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                        backgroundColor="#EBECF0"
                    />



                    <TouchableOpacity
                    onPress={sendMessage} title="Send" color="#FF5864"
                    >
                    <Ionicon
                        name="send"
                        size={20}
                        style={{
                            marginTop: 22
                        }}
                        color="#83C3FF"
                    />


                    </TouchableOpacity>
                
                </View>

        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    messageinputbar: {
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
        borderColor: "transparent",
        width: "75%",
        borderRadius: 10
    },
})

export default GroupTextingScreen