import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/AntDesign';
import { handleSignIn } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';


/*
      Previous Screen:

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.loginTitle}>Hidden</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => {setLoginType('login')}}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => {setLoginType('signUp')}}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleGoogle}>
          <Text style={styles.loginButtonText}>Google Login</Text>
        </TouchableOpacity>
      </ImageBackground>

*/

const LoginScreen = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setLoginError("Email and password are required");
    } else {
      try {
        await handleSignIn(email, password);
      } catch (error) {
        setLoginError("Email or password is incorrect");
      }
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.loginTitle}>Sign In</Text>
      <Text style={styles.loginSecondaryTitle}>Welcome</Text>
      <Text style={styles.loginSecondaryTitle}>Back!</Text>
      <Text style={styles.TitleSpace}></Text>

      <TouchableOpacity style={styles.loginInputField} >
        <TextInput
          style={styles.loginUserText}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email"
          placeholderTextColor="#8e8e8e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginInputField} >
        <TextInput
          style={styles.loginUserText}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#8e8e8e" />
      </TouchableOpacity>
      <Text style={styles.loginErrorText}>{loginError}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.buttonOptions}>
        <Text onPress={() => navigation.navigate("SignUpScreen")} style={styles.formSubText}>SignUp</Text>
        <Text onPress={() => navigation.navigate("ForgotPasswordScreen")} style={styles.forgotPwText}>Forgot Password</Text>
      </View>
    </SafeAreaView>
  );
};

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
    marginTop: 80,
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

export default LoginScreen;
