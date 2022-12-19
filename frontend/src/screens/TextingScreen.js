import { View, Text,
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
import ChatHeader from '../components/ChatHeader'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'
import getMatchedUserInfo from '../components/getMatchedUserInfo'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../hooks/firebase'

const TextingScreen = ({ navigation }) => {
    const { user } = useAuth();
    const {params} = useRoute();
    const [input, setInput] =  useState("");
    const [messages, setMessages] = useState([]);

    const { matchDetails } = params;

    useEffect(() => 
        onSnapshot(
            query(
                collection(db , 'notifs', matchDetails.id, 'messages'), 
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
    [matchDetails, db])

    const sendMessage = () => {
        addDoc(collection(db , 'notifs', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            message: input
        })

        setInput("");
    };

  return (
    <SafeAreaView style={{flex: 1}}>
        <ChatHeader navigation={navigation} title={getMatchedUserInfo(matchDetails.users, user.uid).username} />
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
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
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
                    <Button onPress={sendMessage} title="Send" color="#FF5864"/>
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