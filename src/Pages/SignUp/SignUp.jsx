import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";



const SignUp = () => {


  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then(result => {
      const loggedUser = result.user;

      console.log(loggedUser);
      alert('NEW USER ADDED');
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email
          }
          axiosPublic.post('/users', userInfo).then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                title: "NEW USER ADDED!",
                text: "NEW USER ADDED!",
                icon: "success"
              });
              reset();
              navigate('/');
            }
          })
          // console.log('Profile Updated');

        }).catch(error => console.log(error));
    })
  }

  console.log(watch("example"))

  return (
    <>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                {errors.name && <span>This field is required</span>}

              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input type="text" {...register("photoURL", { required: true })} name="photoURL" placeholder="photoURL" className="input input-bordered" />
                {errors.photoURL && <span>photoURL is required</span>}

              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z])/ })} name="password" placeholder="password" className="input input-bordered" />
                {errors.password?.type === "required" && (
                  <p role="alert">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert">Password must be minimum 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p role="alert">Password must be maximum 20 characters</p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert">Password must be strong</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sign Up" />

              </div>
            </form>


            <div className='flex justify-center items-center'>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;