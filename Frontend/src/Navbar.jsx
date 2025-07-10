import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Will hold the decoded user info

  // Fetch user info from backend on initial render
  useEffect(() => {
    axios
      .get("http://localhost:8080/profile", {
        withCredentials: true
      })
      .then((res) => {
        setUser(res.data); // req.user sent from backend
      })
      .catch((err) => {
        console.log("User not authenticated:", err);
        setUser(null); // User is not logged in
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate("/"); // Redirect to home
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <>
      {!user ? (
        // Navbar when not logged in
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
        // Navbar when logged in
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

                <li className="relative nav-item group flex-grow flex items-center justify-center">
                  <button
                    className="bg-blue-800 text-white w-full text-center px-4 py-2 rounded-md transition duration-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
