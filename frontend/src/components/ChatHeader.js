import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ChatHeader = ({ title, navigation }) => {

    return (
        <View style={styles.mainheader}>
            <View style={styles.chatHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={34} color="black" />
                </TouchableOpacity>
                <Text>{title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Text: {
      fontSize: 50,
    },
    mainheader: {
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    chatHeader: {
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
    }
});

export default ChatHeader;