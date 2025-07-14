import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Student_login() {
  const [a_uname, set_uname] = useState("");
  const [a_pass, set_apass] = useState("");
  const navigate = useNavigate();
  const userref = useRef();

  useEffect(() => {
    userref.current.focus();
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/Studentlogin",
        { a_uname, a_pass },
        { withCredentials: true } // important for sending/receiving cookies
      );

      if (response.status === 200) {
        alert("Login successful");
        navigate("/"); // Navigate after login
        window.location.reload()
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          alert("Student Doesn't Exist!");
        } else if (status === 403) {
          alert("Invalid Password!");
        } else {
          console.error("Login error:", error.response.data);
          alert("Login failed");
        }
      } else {
        alert("Network or unknown error occurred");
      }
      navigate("/");
    }
  };

  return (
  <div className="inset-0 bg-gray-900 text-gray-100 flex justify-center items-center">
    <div className="w-full max-w-md px-4">
      <form
        onSubmit={handlesubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6"
      >
        <h3 className="text-4xl font-bold text-center text-white">
          Student Login
        </h3>

        <div className="flex flex-col space-y-2">
          <label htmlFor="id" className="text-lg font-medium">
            Enter your Roll Number:
          </label>
          <input
            type="text"
            id="id"
            value={a_uname}
            ref={userref}
            autoComplete="off"
            required
            onChange={(e) => set_uname(e.target.value)}
            className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="pass" className="text-lg font-medium">
            Enter password:
          </label>
          <input
            type="password"
            id="pass"
            value={a_pass}
            autoComplete="off"
            required
            onChange={(e) => set_apass(e.target.value)}
            className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-800 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 shadow-md w-full"
        >
          Login
        </button>

        <a href="http://localhost:8080/auth/google?role=Student" className="block">
          <button
            type="button"
            className="bg-blue-800 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 shadow-md w-full"
          >
            Login with Google
          </button>
        </a>
      </form>
    </div>
  </div>
);


}

export default Student_login;
