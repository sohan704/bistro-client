import { useContext } from "react";
import { FaGoogleWallet } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
  const {googleSignIn} = useContext(AuthContext);
   const axiosPublic = UseAxiosPublic();
   const navigate = useNavigate();


  const handleGoogleSignIn = () => {
     googleSignIn().then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,

      }
      axiosPublic.post('/users', userInfo).then(res => {
        console.log(res.data);
        navigate('/');
      
      });
     })
  }

  return (
    <div>
        <div>
          <button onClick={handleGoogleSignIn} className="btn btn-neutral"> <FaGoogleWallet></FaGoogleWallet>  GOOGLE LOGIN </button>
        </div>
    </div>
  );
};

export default SocialLogin;