import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { createUser } = useAuth();
  const onSubmit = (data) => {
    const { email, password } = data;
    createUser(email, password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    createUser();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset ">
          <h1 className="font-bold text-3xl text-start">
            Register Your Account
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
          <button className="btn btn-neutral mt-4">Register</button>
          <p>
            If you are already registed to go{" "}
            <Link to={"/login"} className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
        <SocialLogin/>
      </div>
    </>
  );
};

export default Register;
