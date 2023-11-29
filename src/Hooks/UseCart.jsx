import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const UseCart = () => {
  const axiosSecure = UseAxiosSecure();
  const {user} = useContext(AuthContext);
  
   const {refetch ,data: cart = []} = useQuery({
     queryKey: ['cart', user?.email],
     queryFn: async () =>{
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      return res.data
     }
   });

  return [cart, refetch];
};

export default UseCart;