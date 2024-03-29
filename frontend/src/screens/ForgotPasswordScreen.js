import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { handleResetPassword } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import NewSafeAreaView from '../components/NewSafeAreaView';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");


    const errorMap = {
        "Firebase: Error (auth/missing-email)." : "Must provide an email address", 
        "Firebase: Error (auth/invalid-email)." : "Email address is invalid", 
        "Firebase: Error (auth/user-not-found)." : "User with given email is not found"
    }

    const handlePWReset = async () => {
        try {
            setErrorMessage("");
            await handleResetPassword(email);
            setConfirmationMessage("Password reset email has been sent successfully")
        } catch (error) {
            setConfirmationMessage("")
            setErrorMessage(errorMap[error.message] ? errorMap[error.message] : "Error sending password reset email");
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <>
                <Text style={styles.loginTitle}>Forgot Password?</Text>
                <Text style={styles.loginSmallerTitle}>You will receive a reset link to</Text>
                <Text style={styles.loginSmallerTitle}>the email provided in your account</Text>
                <Text style={styles.TitleSpace}></Text>

                <TouchableOpacity>
                    <TextInput style={styles.loginInputField} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#8e8e8e" />
                </TouchableOpacity>

                <Text style={styles.confText}>{confirmationMessage}</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>


                <TouchableOpacity style={styles.loginButton} onPress={handlePWReset}>
                    <Text style={styles.loginButtonText}>Send Email</Text>
                </TouchableOpacity>
            </>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

    );
};


// added some new styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        backgroundColor: "#EDEDED",
        borderRadius: 30,
        width: "50%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        width: "100%",
        flex: 1,
        padding: 10,
        marginLeft: 0,
        borderRadius: 30
    },
    forgotpassword: {
        height: 30,
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 10,
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40,
        marginHorizontal: 75,
        borderRadius: 20
    },
    loginInputField: {
        backgroundColor: '#ECECEC',
        padding: 10,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        marginHorizontal: 75,
        borderRadius: 20
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20
    },
    confText: {
        color: 'green',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 20
    },
    loginTitle: {
        fontSize: 35,
        marginTop: 80,
        marginLeft: 40,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 30
    },
    loginSecondaryTitle: {
        fontSize: 20,
        marginLeft: 40,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 5
    },
    loginSmallerTitle: {
        fontSize: 18,
        marginLeft: 40,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 5
    },
    TitleSpace: {
        marginTop: 40
    },
    formSubText: {
        fontSize: 18,
        marginTop: 50,
        marginLeft: 50,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 100
    },
    forgotPwText: {
        fontSize: 18,
        marginTop: 50,
        marginRight: 50,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 100
    },
    buttonOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default ForgotPasswordScreen;
