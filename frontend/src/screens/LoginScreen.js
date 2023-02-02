import React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';


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
  //const image = { uri: "https://i.pinimg.com/originals/93/60/77/9360774666f5456e93511c87a4846c1a.jpg" };

  // 'signIn' = sign in, 'signUp' = sign up
  const [loginType, setLoginType] = useState('signIn');


  // form info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [homeTown, setHomeTown] = useState('');



  const handleGoogle = () => {
    setLoginType('Google');
    signInWithGoogle;
  }


  // these get called on 'form' submit
  const testSignInForm = () => {
    console.log('Email: ' + email);
    console.log('Password: ' + password)
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
                <TextInput style={styles.loginUserText} value={email} onChangeText={setEmail} placeholder = "Email" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginInputField} >
                <TextInput style={styles.loginUserText} value={password} onChangeText={setPassword} secureTextEntry={true} placeholder = "Password" placeholderTextColor = "#8e8e8e"/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginButton} onPress={() => {testSignInForm()}}>
                <Text style={styles.loginButtonText}>Sign In</Text>
              </TouchableOpacity>
 
                
              <Text onPress={()=> setLoginType('signUp')} style={styles.formSubText}>Sign Up</Text>

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
 
    </SafeAreaView>  
  );
};


// added some new styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center"
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
    textAlign: 'center',
    fontSize: 18,
    color: 'white'

  },
  loginUserText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black'
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
    marginLeft: 40,
    fontWeight: "bold",
    color: 'black',
    marginBottom: 5
  }
})

export default LoginScreen;
