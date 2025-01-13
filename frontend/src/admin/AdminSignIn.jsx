import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Default Admin Credentials
  const adminCredentials = {
    email: "admin@mail.com",
    // password: "Admin@123",
  };

  const handleSignin = async (data) => {
    try {
      // Check if entered credentials match the default admin credentials
      if (data.email === adminCredentials.email && data.password === "admin@123") {
        toast.success("Login successful");
        navigate("/adminhome"); // Navigate to the Admin Home Page
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Error in signin:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative bg-cyan-200 min-h-screen flex p-4 md:p-12 lg:p-28 justify-center items-center">
      <div className="bg-white px-6 py-4 h-96 sm:h-auto md:px-8 md:py-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-sky-500 mb-6 md:mb-10 text-center">
          Admin Panel
        </h2>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleSignin)}>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1 md:mb-2">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue="admin@mail.com"
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
                  autoComplete="email"
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
              // defaultValue="Admin@123"
              rules={{ required: "Password is required*" }}
              render={({ field }) => (
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    {...field}
                    placeholder="Enter your password"
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10"
                    autoComplete="current-password"
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
            className="w-full py-2 md:py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-400 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
