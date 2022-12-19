import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { AuthProvider } from './src/hooks/useAuth';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNav />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
