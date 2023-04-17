import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from 'expo-google-app-auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  updateProfile
} from '@firebase/auth';

import { auth, db, storage } from './firebase';
import { doc, setDoc, getDoc} from "firebase/firestore";
import { defaultProfilePic } from '../constants/profileConstants';
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage';

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

export const handleSignup = async (username, name, email, password, setLoading) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      try {
        setDoc(doc(db, "Users", auth.currentUser.uid), {
          username: username,
          name: name,
          email: email,
          friendCount: 0,
          friendList: [],
          likedTrips: [],
          myTrips: [],
          profilePic: defaultProfilePic,
          chats: [],
          proximityChats: []
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

export const upload = async(file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + '.png');
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file)
  const photoURL = getDownloadURL(fileRef)
  updateProfile(currentUser, {photoURL})

  setLoading(false);
}


export const handleResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  }
  catch (error) {
    throw error;
  }
}

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => onAuthStateChanged(auth, (user) => {
    const getDocSnap = async () => {
      const docSnap = await getDoc(doc(db, "Users", user.uid));
      if (docSnap.exists()) {
        setUserInfo(docSnap.data())
        console.log("Document data:", docSnap.data()["name"]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    if (user) {
      getDocSnap().then(setUser(user)).catch(console.error)
    } else {
      setUser(null);
    }
    setLoadingInitial(false);
  }),
    []
  );

  // const signInWithGoogle = async () => {
  //   setLoading(true);
  //   console.log("here")
  //   await Google.logInAsync(config).then(async (logInResult) => {
  //     if (logInResult.type == 'success') {
  //       const { idToken, accessToken } = logInResult;
  //       const credential = GoogleAuthProvider.credential(idToken, accessToken);
  //       await signInWithCredential(auth, credential);
  //     }

  //     return Promise.reject();
  //   })
  //     .catch(error => setError(error))
  //     .finally(() => setLoading(false));
  // }

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const memoedValue = useMemo(() => ({
    user,
    userInfo,
    loading,
    error,
    logout
  }), [user, userInfo, loading, error])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
};

export default function useAuth() {
  return useContext(AuthContext);
}