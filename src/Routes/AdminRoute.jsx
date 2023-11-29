import { useContext } from "react";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);

  const [isAdmin, isAdminLoading] = UseAdmin();
 
  const location = useLocation();
  
  if(loading || isAdminLoading){
    return <h1 className="text-8xl font-bold text-red-600">LOADING</h1>
  }

  if(user && isAdmin){
    return children;
  }

  return (
    <Navigate to='/' state={{from:location}} replace></Navigate>
  );
 
};

export default AdminRoute;