


import{  createContext, useEffect, useState } from "react";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
// import app from "../firebase.config";
// import axios from "axios"

import auth from "../../firebase.config";
import axios from "axios";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    // const auth = getAuth(app);
    const [loading ,setLoading]=useState(true)
    const [user,setUser]=useState(null)
    // const axiosSecure=useSecure() 

    const createUser =(email,password)=>{
        setLoading(true)
     return   createUserWithEmailAndPassword(auth, email, password)
        
    }
    const loginUser =(email,password)=>{
        setLoading(true)
     return   signInWithEmailAndPassword(auth, email, password)
        
    }

    const LogOutUser = () => {
        return signOut(auth)
    }


    // ==================
    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
          
            const logOutUser = currentUser?.email || user?.email
            const userEmail= {email:currentUser?.email}
            
            setUser(currentUser);
            setLoading(false)
            
            if(currentUser){
                axios.post('http://localhost:5000/jwt', userEmail,{withCredentials:true})
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

               
            }
          else{
            axios.post('http://localhost:5000/jwt/logout', logOutUser,{withCredentials:true})
                  .then(function (response) {
                    console.log('logout ',response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

          }
           
        });

        return () => unSubscribe
    }, [user])

  




    const userInfo={
       
        loading,
        createUser,
        loginUser,
        LogOutUser,
        user


    
    }

    return (<>
    <AuthContext.Provider value={userInfo}>
        {children}
    </AuthContext.Provider>
    </>
       
    );
};

export default AuthProvider;
