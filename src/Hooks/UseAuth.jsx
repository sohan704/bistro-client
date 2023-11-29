import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const UseAuth = () => {
  const {auth} = useContext(AuthContext);

  // const {auth, isLoading, user} = useContext(AuthContext); 
  // return {auth, isLoading, user}

  return auth;
};

export default UseAuth;