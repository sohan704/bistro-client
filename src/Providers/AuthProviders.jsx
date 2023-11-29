import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {

  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();
  const [theToken, setTheToken] = useState(null);
  
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  } 

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth,googleProvider);
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    });
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('Current User', currentUser);
       const userInfo = {email : currentUser?.email};

      if(currentUser){
           axiosPublic.post('/jwt', userInfo)
           .then(res => {
            if(res.data.token){
              localStorage.setItem('access-token',res.data.token);
              setTheToken(res.data.token);
             
            }
           })
      }else{
        //TODO: REMOVE TOKEN {if token stored in the client side. Local Storage or cookies}
         localStorage.removeItem('access-token');
         


      }

      setLoading(false);
      

    })

    return () => {
      return unsubscribe();
    }
  }, [axiosPublic])


  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    theToken,
    
  }


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;