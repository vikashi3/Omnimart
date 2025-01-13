import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const navigate = useNavigate();
  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignin = async (data) => {
    try {
      // const response = await axios.post(`https://omnimart.up.railway.app/api/auth/signin`, {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/auth/signin`, {
        email: data.email,
        password: data.password,
      });
      const token = response.data.token;
      console.log(token)
      toast.success("Login successful");
      localStorage.setItem("token", token);
      reset();
      navigate("/");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data || "Login failed";

        if (status === 400) {
          toast.error("User not registered.");
        } else if (status === 401) {
          toast.error("Invalid password.");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(message);
        }
      } else if (error.request) {
        toast.error("No response from the server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error in signin:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative bg-slate-200 min-h-screen flex p-4 md:p-12 lg:p-28 justify-center items-center">
    {/* <Link to="/adminSignin" className="absolute top-5 right-5 hover:bg-rose-500 py-2 px-4 font-md rounded-md bg-rose-600 text-white">Admin</Link> */}
      <div className="bg-white px-6 py-4 h-96 sm:h-auto md:px-8 md:py-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-rose-400 mb-6 md:mb-10 text-center">
          Sign In
        </h2>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleSignin)}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 md:mb-2">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required*",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  {...field}
                  placeholder="Enter your email"
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  autocomplete="email"
                />
              )}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1 md:mb-2">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required*" }}
              render={({ field }) => (
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    {...field}
                    placeholder="Enter your password"
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                    autocomplete="current-password"
                  />
                  {passwordVisible ? (
                    <BiShow
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
                    />
                  ) : (
                    <BiHide
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
                    />
                  )}
                </div>
              )}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 md:py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-red-400 transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-2 md:mt-4 text-center flex justify-center">
          <p className="text-gray-600">Don't have an account?&nbsp;</p>
          <Link to="/signup" className="text-rose-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
        <div className="flex justify-center mt-2 md:mt-3">
          <Link to="/" className="mx-auto text-slate-400 font-semibold hover:text-slate-500">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;