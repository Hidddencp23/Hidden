import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import useAuth from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/AntDesign';
import { handleSignup } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
    const { signInWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (email === "" || password === "") {
            console.error("Invalid Credentials");
        } else {
            try {
                await handleSignup(username, name, email, password, setLoading);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                    <Text style={styles.loginTitle}>Create Account</Text>
                    <Text style={styles.loginSmallerTitle}>Create using your email and password</Text>
                    <Text style={styles.loginSmallerTitle}>or login through socials</Text>
                    <Text style={styles.TitleSpace}></Text>
                    <TouchableOpacity>
                        <TextInput style={styles.loginInputField} value={username} onChangeText={setUserName} placeholder="Username" placeholderTextColor="#8e8e8e" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <TextInput style={styles.loginInputField} value={name} onChangeText={setName} placeholder="Full Name" placeholderTextColor="#8e8e8e" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <TextInput style={styles.loginInputField} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#8e8e8e" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <TextInput style={styles.loginInputField} value={password} onChangeText={setPassword} secureTextEntry={true} placeholder="Password" placeholderTextColor="#8e8e8e" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} disabled={loading} onPress={handleRegister}>
                        <Text style={styles.loginButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </SafeAreaView>
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

export default SignUpScreen;
