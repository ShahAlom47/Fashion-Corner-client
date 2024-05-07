import React from 'react';
import useAuth from '../CoustomHocks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivetRout = ({children}) => {
    const {user,loading}=useAuth()

    if(loading){
        return (
            <div className="text-red-600 text-4xl my-4 text-center">
               Loading.....
            </div>   
        ); 
    }
    

    if(user){  
        return (
            <div>
                {children}
            </div>   
        );   
    }


    return ( <Navigate to={'/login'} state={location.pathname}> </Navigate>
       
    );
};

export default PrivetRout;