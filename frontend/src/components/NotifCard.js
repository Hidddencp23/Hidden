import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NotifCard = ({ data, navigation }) => {
    
    return (
        <View>
            <View style={styles.notifCard}>
                <Image source={{ uri: data.profPic }} style={styles.profPic} />
                <Text style={styles.nameText}>{data.username}
                    <Text style={styles.text}>{"Has interacted with your post from" + data.source + "to" + data.dest}</Text>
                </Text>
            </View>
            <View style={styles.notifIcons}>
                <TouchableOpacity onPress={() => navigation.navigate("MessagingScreen")}>
                    <Feather name="message-square" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    notifCard: {
        flexDirection: 'row'
    },
    profPic: {
        width: 45,
        height: 45,
        borderRadius: 100,
        marginRight: 15
    },
    nameText: {
        flex: 1,
        fontSize: 16,
        color: 'black',
        fontWeight: "bold",
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    notifIcons: {
        marginBottom: 15,
        marginLeft: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    status: {
        flexDirection: 'row'
    },
    iconCheck: {
        marginRight: 20
    }
})

export default NotifCard;