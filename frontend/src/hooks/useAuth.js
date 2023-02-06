import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut
} from '@firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext({});

const config = {
  androidClientId: '1091224521228-k4c92o3ctrfjqt2hrciqt7cftv2ft0vt.apps.googleusercontent.com',
  iosClientId: '1091224521228-ea9lg9j78pfmop8cn5t4muct74i767ue.apps.googleusercontent.com',
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "location"],
}

export const handleSignIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch (error) {
    throw error;
  }
};

export const handleSignup = async (username, name, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(() => {
    try {
      setDoc(doc(db, "Users", auth.currentUser.uid), {
        username: username,
        name: name,
        email: email,  
      });
      console.log("User added: ", auth.currentUser.uid);
    } catch (e) {
      console.error("Error adding document: ", e);      
    }
  })
    .catch((error) => {
      console.error(error);
    });
} 
export const handleResetPassword = async(email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log(email);
  })
  .catch((error) => {
    console.error(error);
  });
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    setLoadingInitial(false);
  }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    console.log("here")
    await Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type == 'success') {
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const memoedValue = useMemo(() => ({
    user,
    loading,
    error,
    signInWithGoogle,
    logout
  }), [user, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
};

export default function useAuth() {
  return useContext(AuthContext);
}