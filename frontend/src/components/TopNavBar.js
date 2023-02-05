import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';


const TopNavBar = ({ navigation }) => {
    return (
        <View style={styles.header}>
            <View style={styles.columnHeader}>
                <Image style={styles.headerImage} source={{ uri: '../../hidden_logo.PNG' }} />
                <Text style={styles.headerText}>Hidden</Text>
            </View>
            <View style={styles.columnHeader}>
                {// TODO: On press for post
                }<TouchableOpacity onPress={() => navigation.navigate("NotifScreen")}>
                    <AntDesign style={styles.headerNotif} name="bells" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("PostScreen")}>
                    <AntDesign name="plussquareo" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        padding: 10,
        paddingBottom: 10,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    headerImage: {
        height: 35,
        width: 80
    },
    headerText: {
        marginLeft: 10,
        fontSize: 15
    },
    headerNotif: {
        marginRight: 25
    },
    columnHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default TopNavBar;