import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {

  const captchaRef = useRef(null);
  const { signIn } = useContext(AuthContext);



  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log('from is ', from, 'and location is ', location);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then(result => {
      const user = result.user;
      console.log(user);
      alert('logged in');
      navigate(from, { replace: true }).catch(error => console.log(error));
    })
  }

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card w-full md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>



              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                {/* <input onBlur={handleValidateCaptcha}  type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" required /> */}
                
                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />
              </div>

{/* disabled={disabled} */}

              <div className="form-control mt-6">
                <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
              </div>
            </form>
            <div className="divider divider-neutral">OR</div>
            <div className='flex justify-center items-center'>
              <SocialLogin></SocialLogin>
            </div>
            <p><small>New Here?  <Link to='/signup'>Create an Account</Link> </small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;