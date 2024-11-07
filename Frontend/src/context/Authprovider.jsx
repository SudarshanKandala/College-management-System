import React, { useEffect } from 'react'
import { createContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

function AuthProvider({children}) {
  const [accessToken,setaccessToken] = useState();
  const [payload, setpayload] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("your_JWT_Token");
    if (storedToken) {
      setaccessToken(storedToken);
      axios
      .get("http://localhost:8080/decode_token", {
        headers: { Authorization : `Bearer ${storedToken}` },
      })
      .then((res) => {
        setpayload(res.data); // Set the user data
        console.log("User data received: ",res.data); // Log user data here
      })
      .catch((err) => {
        console.log("Error decoding token: ", err);
      });
    }
  }, [accessToken]);

  // Login function to update state and localStorage
  const login = (token) => {
    setaccessToken(token);
    localStorage.setItem("your_JWT_Token", token);
    axios
      .get("http://localhost:8080/decode_token", {
        headers: { Authorization : `Bearer ${token}` },
      })
      .then((res) => {
        setpayload(res.data); // Set the user data
        console.log("User data received: ",res.data); // Log user data here
      })
      .catch((err) => {
        console.log("Error decoding token: ", err);
      });
  };

  // Logout function to clear state and localStorage
  const logout = () => {
    setaccessToken(null);
    localStorage.removeItem("your_JWT_Token");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{accessToken,setaccessToken,login,logout,payload}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
