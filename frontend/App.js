import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { AuthProvider } from './src/hooks/useAuth';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
