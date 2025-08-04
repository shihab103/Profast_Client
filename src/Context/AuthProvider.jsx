import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut=()=>{
    setLoading(true);
    return signOut(auth);
  }

  const googleLogin=()=>{
    return signInWithPopup(auth,provider);
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser);
        console.log('user in the auth state change',currentUser);
        setLoading(false);
    })
    return ()=>{
        unSubscribe();
    }
  },[])

  const authInfo = {
    createUser,
    signIn,
    user,
    loading,
    logOut,
    googleLogin
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
