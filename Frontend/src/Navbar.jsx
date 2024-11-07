import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { token } from './Home';
import { AuthContext } from './context/AuthProvider';


function Navbar() {
  const {accessToken,logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setuser] = useState(null); // Use null initially for cleaner checks
  const [token1, setToken] = useState(null); // Store token in state

  // Fetch the token from localStorage on component mount
  useEffect(() => {
    // const storedToken = localStorage.getItem("your_JWT_Token");
    setToken(accessToken); // Set toaccessTokenrom localStorage
    // console.log(accessToken);
  },[accessToken]); // Empty dependency array to ensure this only runs on mount

  // Fetch user data when token is available
  useEffect(() => {
    if (token1) {
      setIsLoggedIn(true);
      // console.log("Token exists, attempting to decode...");

      axios
        .get("http://localhost:8080/decode_token", {
          headers: { Authorization: `Bearer ${token1}` },
        })
        .then((res) => {
          setuser(res.data); // Set the user data
          // console.log("User data received: ", res.data); // Log user data here
        })
        .catch((err) => {
          console.log("Error decoding token: ", err);
          setIsLoggedIn(false); // Handle token decoding failure
        });
    } else {
      setIsLoggedIn(false); // No token, user is not logged in
    }
  },[token1]); // Dependency on token to ensure API call when token is available

  // Monitor user changes, if needed
//   useEffect(() => {
//     if (user) {
//       console.log("This is from user side: ", user);
//     }
//   }, [user]); // Log user information when it's updated

  // const handleLogout = () => {
  //   localStorage.removeItem("your_JWT_Token"); // Remove the token
  //   setIsLoggedIn(false);
  //   navigate("/"); // Redirect to home or login page after logout
  // }

  return (
    <>  
      {!accessToken ? (
        // Show this Navbar when not logged in
        <div className='sticky top-0 z-50'>
          <br className="mb-2" />
          <nav className="w-full flex justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg py-2 px-4">
              <ul className="flex space-x-4 text-lg font-medium pl-0 mb-0">
                <li className="nav-item flex-grow flex items-center justify-center">
                  <Link
                    className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item flex-grow flex items-center justify-center">
                  <Link
                    className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                    to="/Student_login"
                  >
                    Student
                  </Link>
                </li>
                <li className="nav-item flex-grow flex items-center justify-center">
                  <Link
                    className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                    to="/Teacher_login"
                  >
                    Teacher
                  </Link>
                </li>
                <li className="nav-item flex-grow flex items-center justify-center">
                  <Link
                    className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                    to="/Admin_login"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </nav>    
        </div>
      ) : (
        // Show this Navbar when logged in
        <div className='sticky top-0 z-50'>
          <br className="mb-2" />
          <nav className="w-full flex justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg py-2 px-4">
              <ul className="flex space-x-4 text-lg font-medium pl-0 mb-0">
                <li className="nav-item flex-grow flex items-center justify-center">
                  <Link
                    className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                {user && (
                  <li className="nav-item flex-grow flex items-center justify-center">
                    {user.user === 'Student' && (
                      <Link
                        className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                        to="/Student_1"
                      >
                        Student
                      </Link>
                    )}
                    {user.user === 'Teacher' && (
                      <Link
                        className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                        to="/Teacher_1"
                      >
                        Teacher
                      </Link>
                    )}
                    {user.user === 'Admin' && (
                      <Link
                        className="text-white w-full text-center px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300 no-underline"
                        to="/Admin"
                      >
                        Admin
                      </Link>
                    )}
                  </li>
                )}
                <li className="relative nav-item group flex-grow flex items-center justify-center">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full text-center px-4 py-2 rounded-md transition duration-300" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar
