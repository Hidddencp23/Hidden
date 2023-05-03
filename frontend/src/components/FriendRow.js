import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
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
import Icon from "react-native-vector-icons/AntDesign";


const FriendRow = ({ message, friendInfo, navigation }) => {
    const { user, userInfo } = useAuth();

    //console.log(message)

    const startNewChat = () => {
      addDoc(doc(db, "Chats"), {
        latestMessage: "",
        latestTimestamp: null,
        users: [user.uid, ]
      });
      updateDoc(doc(db, "Users", requestUserId), {
        outgoingFriendRequests: arrayRemove(user.uid),
        friendList: arrayUnion(user.uid),
        friendCount: increment(1),
      });
    };

    return (
        <TouchableOpacity
            style={styles.messagecard}
            onPress={startNewChat}
        >
            <Image
                style={styles.profPic}
                source={{uri:  friendInfo.profilePic  }}
            />

            <View style={styles.horizontal}>

                <View style>
                    <Text style={styles.text}>
                        { friendInfo.name }
                    </Text>
                    <Text style={styles.messagePad}>     
                        <Text>{message}</Text>   
                        
                    </Text>
                </View>


                <View style={styles.alignRight}>
                    <Text style={styles.alignIcon}>
                        <Icon name="plus" size={30} style={styles.plus} />
                    </Text>

                </View>
      
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    plus: {
      color: '#9e9e9e'
    },
    alignIcon: { 
      marginTop: 10,
      fontWeight: "bold",
      color: '#9e9e9e'
    },
    alignRight: {
      alignItems: 'flex-end',
    },
    messagePad: {
      paddingTop: 5,
      color: '#9e9e9e'
    },
    profPic: {
      width: 45,
      height: 45,
      borderRadius: 100,
      marginRight: 15
    },
    messagecard: {
      flexDirection: 'row',
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      borderRadius: 15,
      margin: 5,
      paddingBottom: 15,
      paddingTop: 15
  
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    horizontal: {
      flexDirection: 'row',
      flex: 1, 
      justifyContent: 'space-between',
      padding: 5,    
    },
    vertical: {
      flexDirection: 'column'
    },
    time: {
      textAlign: "right"
    }
  
  });

export default FriendRow