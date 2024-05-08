import axios from "axios";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";



const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials:true,
  });

const useAxiosSecure = () => {
    const { LogOutUser}=useAuth();
    const navigate = useNavigate()
  

   useEffect(()=>{

    axiosSecure.interceptors.response.use((config)=> {
        
        return config;
      }, (error)=> {
        console.log(error.response);
        if(error.response.status===401||error.response.status===403 ){
         
            LogOutUser()
        .then(() => {
            navigate('/login')
        //    alert(error.response?.data?.message,)
         
          
        })
        .catch((error) => {
            console.log(error);
        });
    } 
        
        
        return Promise.reject(error);
      });
   },[LogOutUser,navigate])
    return axiosSecure
};

export default useAxiosSecure;