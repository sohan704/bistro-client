import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";

const axiosSecure = axios.create({
  baseURL: 'https://restaurant-server-gamma.vercel.app'
})
const UseAxiosSecure = () => {
  // request interceptor to add authorization header for every secure call to the api
  const navigate = useNavigate();
  const {user, loading, logOut, theToken} = useContext(AuthContext);


  axiosSecure.interceptors.request.use(function(config){
    const token = localStorage.getItem('access-token');
    // console.log('REQUEST STOPPED BY INTERCEPTOR!', token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function(error){
    return Promise.reject(error);
  })


  //intercept 401 or 403 status 
  axiosSecure.interceptors.response.use(function(response){
    return response;
  },  async (error) => {
    const status = error.response.status;
    console.log('user is', user, 'loading is', loading, 'token is',theToken);
    console.log('Status in the interceptor',status);
    if((status === 401 || status === 403) && !loading && !!theToken){
      await logOut();
     navigate('/login')
    }
    return Promise.reject(error);
  })





   return axiosSecure;
};

export default UseAxiosSecure;