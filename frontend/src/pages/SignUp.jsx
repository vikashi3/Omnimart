import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const handleSignUp = async (data) => {
    try {
      // const response = await axios.post(`https://omnimart.up.railway.app/api/auth/signup`, {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/auth/signup`, {
        accountType: data.accountType,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      reset();
      toast.success("Signup successful");
      navigate("/SignIn");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Signup failed due to server error.");
      }
      console.error("Error in signup:", error);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex p-4 sm:p-10 justify-center items-center">
      <div className="bg-white py-4 px-6 sm:px-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-rose-400 mb-4 text-center">
          Sign Up
        </h2>
        <form
          className="flex flex-col gap-6 sm:gap-10"
          onSubmit={handleSubmit(handleSignUp)}
        >
          {/* Account Type Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Account Type
            </label>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Controller
                name="accountType"
                control={control}
                defaultValue="user"
                rules={{ required: "Account type is required" }}
                render={({ field }) => (
                  <>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="user"
                        checked={field.value === "user"}
                        onChange={field.onChange}
                        className="form-radio text-teal-400"
                      />
                      <span className="ml-2 text-gray-700">User</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="business"
                        checked={field.value === "business"}
                        onChange={field.onChange}
                        className="form-radio text-teal-400"
                      />
                      <span className="ml-2 text-gray-700">Business</span>
                    </label>
                    {/* <label className="flex items-center">
                      <input
                        type="radio"
                        value="admin"
                        checked={field.value === "admin"}
                        onChange={field.onChange}
                        className="form-radio text-teal-400"
                      />
                      <span className="ml-2 text-gray-700">Admin</span>
                    </label> */}
                  </>
                )}
              />
              {errors.accountType && (
                <p className="text-red-500">{errors.accountType.message}</p>
              )}
            </div>
          </div>

          {/* Two-Column Layout */}
          <div className="flex flex-wrap gap-4 sm:gap-10">
            {/* Left Column */}
            <div className="flex-1">
              <div className="mb-2">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "First name is required*",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "First name should contain only letters*",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="firstName"
                      {...field}
                      placeholder="Enter your first name"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  rules={{
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Last name should contain only letters*",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="lastName"
                      {...field}
                      placeholder="Enter your last name"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required*",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Email is not valid*",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      id="email"
                      {...field}
                      placeholder="Enter your email address"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Phone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone number is required*",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message:
                        'Phone number must be a valid number and can include "+" symbol*',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      id="phone"
                      {...field}
                      placeholder="Enter your phone number"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required*",
                    minLength: {
                      value: 6,
                      message: "Password must be 6 characters long.",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      id="password"
                      {...field}
                      placeholder="Enter your password"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Confirm Password is required*",
                    validate: (value) =>
                      value === watch("password") ||
                      "Password does not match.",
                  }}
                  render={({ field }) => (
                    <input
                      type="password"
                      id="confirmPassword"
                      {...field}
                      placeholder="Confirm your password"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-red-400 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-2 md:mt-4 text-center flex justify-center">
          <p className="text-gray-600">Already have an account?&nbsp;</p>
          <Link to="/signin" className="text-rose-400 font-semibold hover:underline">
            Sign in
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

export default SignUp;
