import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
});

const useSecure = () => {
    const {user,LogOutUser}=useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use((config) => {
            return config
        },
            (error) => {

                if(error.response.status===401||error.response.status===403 ){
                    LogOutUser()
                    .then(()=>{
                        navigate('/login')
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                    
                }


            }
        )

    }, [LogOutUser,navigate])

    return axiosSecure

};

export default useSecure;