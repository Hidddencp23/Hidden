import { Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from './getMatchedUserInfo'
import { collection, onSnapshot, where, getDoc, doc } from 'firebase/firestore';
import { db } from "../hooks/firebase";
import { getUserFromUid } from '../hooks/useAuth'

const ChatRow = ({ chatInfo, setCurrentChat, setCurrentChatUser, navigation }) => {
	const { user } = useAuth();
	const [chatUser, setChatUser] = useState("");

	useEffect(() => {
		const otherUserUid = chatInfo.users.filter(id => id != user.uid)[0]
		getUserFromUid(otherUserUid)
			.then((userInfo) => setChatUser(userInfo))
			.catch(console.error)
	}, [])

	return (
		<TouchableOpacity
			style={styles.messagecard}
			onPress={() => {
				setCurrentChatUser(chatUser);
				setCurrentChat(chatInfo);
			}
				// 	navigation.navigate("TextingScreen", {state: {
				// 	chatInfo, chatUser
				// }})
			}
		>
			<Image
				style={styles.profPic}
				source={{ uri: chatUser.profilePic }}
			/>

			<View>
				<Text style={styles.text}>
					{chatUser.name}
				</Text>
				<Text>{chatInfo.latestMessage}</Text>
				<Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toDateString() : ""}</Text>
				<Text>{chatInfo.latestTimestamp != null ? chatInfo.latestTimestamp.toDate().toLocaleTimeString() : ""}</Text>

			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	profPic: {
		width: 50,
		height: 50,
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
		paddingBottom: 20,
		paddingTop: 20
	},
	text: {
		fontWeight: 'bold',
		fontSize: 16
	}
});

export default ChatRow