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
import ReceiverMessage from '../components/ReceiverMessage'
import { updateDoc, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, doc } from 'firebase/firestore'
import { db } from '../hooks/firebase'
import Icon from "react-native-vector-icons/AntDesign";
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import ChatScreenNavBar from '../components/NavBars/ChatScreenNavBar';


const TextingScreen = ({ navigation }) => {
    
    const { user, userInfo } = useAuth();
    const {params} = useRoute();
    const [input, setInput] =  useState("");
    const [messages, setMessages] = useState([]);
    const { chatId, chatUser} = params;


    //const [showmessages, setshowmessages] = useState([]);



    


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
        
        addDoc(collection(db , 'Chats', chatId, 'Messages'), {
            timestamp: serverTimestamp(),
            sender: user.uid,
            message: input
        });
        updateDoc(doc(db , 'Chats', chatId), {
            latestTimestamp: serverTimestamp(),
            latestMessage: input
        });

        setInput("");
    };


    
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none",
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
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

    useEffect(() => 
        onSnapshot(
            query(
                collection(db , 'Chats', chatId, 'Messages'),
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



    

    
  return (

    <View style={{flex: 1, paddingBottom: 5}}> 

        <ChatScreenNavBar navigation={navigation} title={chatUser.name}/>

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={5}
            >

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
                                <ReceiverMessage key={message.id} message={message} chatUser={chatUser}/>
                            )
                        }
                    />
                </TouchableWithoutFeedback>


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
    </View>

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

export default TextingScreen
