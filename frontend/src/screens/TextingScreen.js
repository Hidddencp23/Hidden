import {
    View, Text,
    StyleSheet,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from 'react-native'
import React, { useEffect, useState } from 'react'
import TextHeader from '../components/TextHeader'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import getMatchedUserInfo from '../components/getMatchedUserInfo'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { arrayUnion, updateDoc, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import { db } from '../hooks/firebase'

const TextingScreen = ({ chats, chatInfo, chatUser, setCurrentChat, navigation }) => {
    const { user } = useAuth();
    const { params } = useRoute();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    // const { chatInfo, chatUser } = params;
    console.log(chatInfo);

    const sendMessage = () => {
        // addDoc(collection(db, 'Chats', chatId, 'Messages'), {
        //     timestamp: serverTimestamp(),
        //     sender: user.uid,
        //     message: input
        // });
        updateDoc(doc(db, 'Chats', chatInfo.id), {
            latestTimestamp: serverTimestamp(),
            latestMessage: input,
            messages: arrayUnion({
                // timestamp: serverTimestamp(),
                sender: user.uid,
                msg: input
            })
        });

        setInput("");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TextHeader navigation={navigation} setCurrentChat={setCurrentChat} title={chatUser.name} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}>
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                    {console.log("chatInfo.messages")}
                    {/* {console.log(chatInfo.messages)} */}
    
                    <FlatList
                        data={chatInfo.messages}
                        inverted={-1}
                        style={{
                            paddingLeft: 4,
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                        message.sender === user.uid ? (
                                <SenderMessage message={message} />
                            ) : (
                                <ReceiverMessage message={message} />
                            )
                        }
                    />
                    </>
                </TouchableWithoutFeedback>


                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={styles.messageinputbar}
                        placeholder="Send Message..."
                        placeholderTextColor="grey"
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button onPress={sendMessage} title="Send" color="#FF5864" />
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
        borderColor: "grey",
        width: "75%",
    },
})

export default TextingScreen