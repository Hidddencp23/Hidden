import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();

  const image = { uri: "https://i.pinimg.com/originals/93/60/77/9360774666f5456e93511c87a4846c1a.jpg" };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.loginTitle}>Cal Poly Ride Share</Text>
        <TouchableOpacity style={styles.loginButton} onPress={signInWithGoogle}>
          <Text style={styles.loginButtonText}>Login to Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  loginButton: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 100,
    marginHorizontal: 75,
    borderRadius: 20
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18
  },
  loginTitle: {
    fontSize: 35,
    textAlign: 'center',
    color: 'black',
    marginBottom: 100
  }
})

export default LoginScreen;
