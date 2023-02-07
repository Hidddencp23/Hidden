import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import { handleResetPassword } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handlePWReset = async () => {
        if (email === "") {
            console.error("Invalid Email");
        } else {
            try {
                await handleResetPassword(email);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <SafeAreaView>
            <>
                <Text style={styles.loginTitle}>Forgot Password?</Text>
                <Text style={styles.loginSmallerTitle}>You will receive a reset link to</Text>
                <Text style={styles.loginSmallerTitle}>the email provided in your account</Text>
                <Text style={styles.TitleSpace}></Text>

                <TouchableOpacity style={styles.loginInputField} >
                    <TextInput style={styles.loginUserText} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#8e8e8e" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handlePWReset}>
                    <Text style={styles.loginButtonText}>Send Email</Text>
                </TouchableOpacity>
            </>
        </SafeAreaView>
    );
};


// added some new styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
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
    loginErrorText: {
        color: 'red',
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
