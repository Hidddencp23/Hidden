import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/AntDesign';
import { handleSignIn, handleResetPassword } from '../hooks/useAuth';
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

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [homeTown, setHomeTown] = useState('');
  const [loginType, setLoginType] = useState('signIn');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
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
  const handleSubmit = async () => {
    if (email === "" || password === "") {
      console.error("Invalid Credentials");
    } else {
      try {
        await handleSignIn(email, password);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handleGoogle = () => {
    setLoginType('Google');
    signInWithGoogle;
  }
  const testSignUpForm = () => {
    console.log('Name: ' + name)
    console.log('Email: ' + email);
    console.log('Password: ' + password)
    console.log('Home Town: ' + homeTown)
  }

  return (
    <SafeAreaView>

        { loginType === 'signIn' ? 
            <>
              <Text style={styles.loginTitle}>Sign In</Text>
              <Text style={styles.loginSecondaryTitle}>Welcome</Text>
              <Text style={styles.loginSecondaryTitle}>Back!</Text>
              <Text style={styles.TitleSpace}></Text>


              <TouchableOpacity style={styles.loginInputField} >
                <TextInput 
                  style={styles.loginUserText} 
                  value={email} 
                  onChangeText={handleEmailChange} 
                  placeholder = "Email" 
                  placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginInputField} >
                <TextInput 
                  style={styles.loginUserText} 
                  value={password} 
                  onChangeText={handlePasswordChange} 
                  secureTextEntry={true} 
                  placeholder = "Password" 
                  placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
 
              <View style={styles.buttonOptions}>
                <Text onPress={()=> setLoginType('signUp')} style={styles.formSubText}>Sign Up</Text>
                <Text onPress={()=> setLoginType('forgotPW')} style={styles.forgotPwText}>Forgot Password</Text>
              </View>
            </> : null
        }

        { loginType === 'signUp' ? 
          <>
              <Text style={styles.loginTitle}>Create Account</Text>
              <Text style={styles.loginSmallerTitle}>Create using your email and password</Text>
              <Text style={styles.loginSmallerTitle}>or login through socials</Text>
              <Text style={styles.TitleSpace}></Text>


              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={name} onChangeText={setName} placeholder = "Full Name" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={email} onChangeText={setEmail} placeholder = "Email" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>


              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={password} onChangeText={setPassword} secureTextEntry={true} placeholder = "Password" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={homeTown} onChangeText={setHomeTown} placeholder = "Home Town" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={() => {testSignUpForm()}}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <Text onPress={()=> setLoginType('signIn')} style={styles.formSubText}>Sign In</Text>
          </>
          : null
        }
        { loginType === 'forgotPW' ? 
          <>
              <Text style={styles.loginTitle}>Forgot Password?</Text>
              <Text style={styles.loginSmallerTitle}>You will receive a reset link to</Text>
              <Text style={styles.loginSmallerTitle}>the email provided in your account</Text>
              <Text style={styles.TitleSpace}></Text>

              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={email} onChangeText={setEmail} placeholder = "Email" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={handlePWReset}>
                <Text style={styles.loginButtonText}>Send Email</Text>
              </TouchableOpacity>

              <Text onPress={()=> setLoginType('signIn')} style={styles.formSubText}>Sign In</Text>
          </>
          : null
        }
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
    width:"100%",
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default LoginScreen;
