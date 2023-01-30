import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import useAuth from '../hooks/useAuth';
import Icon from 'react-native-vector-icons/AntDesign';
import { handleSignIn } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
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
  };
  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate("LaunchScreen")}>
              <Text>
                <Icon name="left" size={18} color="Black" /> Back
              </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginTitle}>Sign In</Text>
      <Text style={styles.loginTitle}>Welcome Back!</Text>

      <View style={styles.inputView}>
        <TextInput 
          style = {styles.TextInput}
          defaultValue={email}
          onChangeText={handleEmailChange}
          placeholder="Email" 
          placeholderTextColor = "#000000"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput 
          style = {styles.TextInput}
          defaultValue={password}
          onChangeText={handlePasswordChange}
          placeholder="Password" 
          placeholderTextColor = "#000000"
          secureTextEntry={true}
        />
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.textButtons}>
          <TouchableOpacity onPress={signInWithGoogle}>
            <Text style={styles.signin}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signInWithGoogle}>
            <Text style={styles.forgotpassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>        
    </View>
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
    width:"50%",
    borderRadius:25,
    height:45,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"black",
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white'
  },
  textButtons: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 5,
    paddingHorizontal: 50
    
  },
  loginTitle: {
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
    marginBottom: 100
  },
  backButton: {
    
  }
})

export default LoginScreen;
