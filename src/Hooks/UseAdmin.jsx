import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import UseAxiosSecure from "./UseAxiosSecure";

const UseAdmin = () => {
  const { user, loading, theToken } = useContext(AuthContext);

  const axiosSecure = UseAxiosSecure();

  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, 'isAdmin'],
    enabled: !loading && !!localStorage.getItem('access-token'),
    queryFn: async () => {

   
          console.log('enabled', loading, 'Here is the email:', user.email);
          const res = await axiosSecure.get(`/user/admin/${user.email}`);
          console.log(res.data);
          return res.data?.admin;
      
    

      // console.log('enabled', loading ,'Here is the email causing the main problem!', user?.email)
      // const res = await axiosSecure.get(`/user/admin/${user.email}`);
      // console.log(res.data);
      // return res.data?.admin;
    }


  });

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;