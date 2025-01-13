import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setAccountType(decoded.user.accountType);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountType, setIsLoggedIn, setAccountType }}>
      {children}
    </AuthContext.Provider>
  );
};
