import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";

//import circleStyles  from '../../styles/circle';

/*
<View style={styles.header}>
                <Text style={styles.baseText}>Messages</Text>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("AddChatScreen")}>
                    <Icon name="form" size={20} />
                </TouchableOpacity>
            </View>

*/

const MessagingScreenNavBar = ({ navigation }) => {
    return (
        <>

            <View style={styles.header}>
                <Text style={styles.baseText}>Messages</Text>
                <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate("AddChatScreen")}>
                        
                        <Icon name="form" size={20}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    baseText: {
        fontWeight:'bold',
        fontSize: 20,
        paddingLeft: "5%",
        
    },
    header: {
        height: 100,
        paddingRight: "10%",
        paddingBottom: "3%",
        paddingTop: "13%",
        backgroundColor: '#83C3FF',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: "32%"
    },
    headerImage: {
        height: 100,
        width: 100,
    },
    addButton: {
        //backgroundColor: "white",
        height: "100%",
        width: "200%",
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },   

    Button: {
        backgroundColor: "white",
        height: "100%",
        width: 40,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: "center"
      },

});

export default MessagingScreenNavBar;