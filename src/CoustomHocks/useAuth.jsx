import { useContext } from "react";

import { AuthContext } from "../AuthProvider/AuthProvoder";


const useAuth = () => {
   const  auth= useContext(AuthContext)
   return auth
};

export default useAuth;