import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {signIn} = useAuth();
  const { register, handleSubmit } = useForm();
  const location = useLocation();

  const from = location.state?.from || '/';
  

  const onSubmit = (data) => {
    const {email,password} = data;
    signIn(email,password)
    .then(result=>{
      navigate("/");
      console.log(result);
    })
    .catch(error=>{
      console.log("🚀 ~ onSubmit ~ error:", error)
    })
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <h1 className="font-bold text-3xl text-start">
            Login Your Account
          </h1>

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input w-full"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
          <p>
            If you not register to go{" "}
            <Link to={"/register"} className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </form>
        <SocialLogin/>
      </div>
    </>
  );
};

export default Login;
