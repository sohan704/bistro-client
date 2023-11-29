import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();


  if(user){
    return children;
  }

  if(loading){
    return <h1 className="text-8xl font-bold text-red-600">LOADING</h1>
  }

  return (
    <Navigate to='/login' state={{from:location}} replace></Navigate>
  );
};

export default PrivateRoutes;