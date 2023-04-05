import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { AuthProvider } from './src/hooks/useAuth';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);


import { useState } from 'react';



// 
function getActiveRouteName(state) {
  if (!state || typeof state.index !== 'number') {
    return 'Unknown';
  }
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
}



function App() {


  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
