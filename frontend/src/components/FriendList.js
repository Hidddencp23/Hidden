import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Dimensions,
    ScrollView
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { collection, onSnapshot, orderBy, query, limit, where, getDocs, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import useAuth from '../hooks/useAuth';

import FriendRow from './FriendRow';

export const FriendList = ({ navigation }) => {
    
    const [search, setSearch] = useState('');

    const [friends, setFriends] = useState([]);
    const [chatFriends, setChatFriends] = useState([]);

    const { user, userInfo } = useAuth();

    /*
        get list of friends
        get list of friends with existing chats

        for each friend:
            if id is present in chatFriends, then "go to chat"
            if not present, "add chat"
    */

    // set the friends with existing chats
    const getFriendsWithChats = (chats) => {
       setChatFriends((chats.map((chat) => chat["users"])).flat())
    }

    const checkIfExistingChat = (item, friendId) => {
        if (chatFriends.includes(friendId)){
            return <FriendRow friendInfo={item} key={item.id} navigation={navigation} message={'Go To Chat'}/>
        }
        return <FriendRow friendInfo={item} key={item.id} navigation={navigation} message={'Add Chat'}/>
    }

    // get friends list
    useEffect(() =>

        {onSnapshot( 
            query(
                // get user documents for friends
                collection(db, 'Users'), where("friendList", "array-contains", user.uid),
            ),
            (snapshot) => { 
                setFriends(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            }
        );

        onSnapshot(
            query(
                collection(db, 'Chats'), where("users", "array-contains", user.uid),
            ),
            (snapshot) => {
                getFriendsWithChats(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                )
            }
        );

        },
        
        [])
    



    return (
        <ScrollView style={{
            paddingTop: 25,
            height: '100%'
          }}>

        <View style={styles.searchPosition}>
                <SearchBar
                    lightTheme
                    round
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInput}
                    placeholder="Search Friends"
                    onChangeText={setSearch}
                    value={search}>
                    
                </SearchBar>
            </View>


            {(search != null && friends.length > 0) ? (
                <>
                    {friends
                        .filter(x => String(x.name).includes(search))
                    .map((item) => checkIfExistingChat(item, item.id))}
                </>
            ) :
                null}
        
            

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        paddingRight: "10%",
        paddingBottom: "3%",
        paddingTop: "13%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
    },
    headerImage: {
        height: 100,
        width: 100,
    },
    addButton: {
        backgroundColor: "white",
        height: "100%",
        width: "200%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },   
    
    
    searchPosition:{
        //paddingTop: '25%',
        paddingLeft: '3%',
        paddingRight:'3%',
        //flex: 1,    
        //position: "absolute",
        //width: "100%",
        //height: "100%",
},
searchContainer: {
    height: 48,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: '5%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset : { width: 1, height: 8},
},

searchAlign: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "30%",

},
searchInput: {
    backgroundColor: 'transparent',
    height: 45,
    marginTop: -7.5
},

});

export default FriendList
