import React from "react";
import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';


const SearchScreen = ({natigation}) => {

    return (
        <KeyboardAvoidingView behavior="position"  keyboardVerticalOffset={-190}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <Text>Search</Text>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}


export default SearchScreen;