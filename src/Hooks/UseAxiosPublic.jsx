import axios from "axios";

const UseAxiosPublic = () => {
  
  const axiosPublic = axios.create({
    baseURL: 'https://restaurant-server-gamma.vercel.app',

  })

  return axiosPublic;
};

export default UseAxiosPublic;