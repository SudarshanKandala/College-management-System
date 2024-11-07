import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { token } from './Home';
import { AuthContext } from './context/AuthProvider';
import { useNavigate } from 'react-router-dom';
function Admin() {
  const {accessToken} = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate hook
  // Logout function
  const [payload,setpayload] = useState();
  const [admin, setadmin] = useState([]);
  const [inst, setinstdata] = useState([]);
  const [dept, setdept] = useState([]);
  const [course, setcourse] = useState([]);
  const [stu, setstu] = useState([]);
  const [stucour, setstucour] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/instructor')
      .then((response) => setinstdata(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[accessToken]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/department')
      .then((response) => setdept(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[accessToken]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/students')
      .then((response) => setstu(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[accessToken]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/Courses')
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[accessToken]); 

  useEffect(() => {
    axios
      .get('http://localhost:8080/stucour')
      .then((response) => setstucour(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[accessToken]);

  useEffect(() => {
    if (!accessToken) return; // If no token, don't fetch
    axios
      .get("http://localhost:8080/decode_token", {
        headers: { Authorization: `Bearer ${accessToken}`},
      })
      .then((res) => {
        setpayload(res.data); // Set the user data
      })
      .catch((err) => {
        console.log("Error decoding token: ", err);
        // Handle token decoding failure (e.g., navigate to login or handle state)
      });
  }, [accessToken]); 

  useEffect(() => {
    if (!accessToken) return; 
    axios
      .get('http://localhost:8080/admindata')
      .then((response) => setadmin(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);
  

  return (
    <>
      
      {payload ? (
        <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 text-gray-100 flex flex-col items-center py-8 h-screen">
          {/* Admin Info */}
          <div className="text-center mb-8 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">welcome, {payload.name}</h1>
            <h2 className="text-xl font-semibold text-gray-400">Admin ID: {payload.username}</h2>
          </div>
          {/* Navigation Buttons */}
          <div className="flex flex-col space-y-4 w-full px-4">
            <Link to="/Student" className="w-full">
              <button
                type="button"
                className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
              >
                Student
              </button>
            </Link>
            <Link to="/Courses" className="w-full">
              <button
                type="button"
                className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
              >
                Courses
              </button>
            </Link>
            <Link to="/Department" className="w-full">
              <button
                type="button"
                className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
              >
                Department
              </button>
            </Link>
            <Link to="/Teacher" className="w-full">
              <button
                type="button"
                className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
              >
                Teacher
              </button>
            </Link>
            <Link to="/Show_tables" className="w-full">
              <button
                type="button"
                className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
              >
                Show Data
              </button>
            </Link>
          </div>
        </div>
      
        {/* Main Content Area */}
        <div className="w-3/4 bg-gray-900 text-gray-100 p-8 flex-auto">
          <h1 className="text-5xl font-extrabold text-center mb-8 text-white">Overview</h1>
      
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dept.map((d, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105"
                >
                  <h1 className="text-4xl font-bold text-white mb-4">{d.DepartmentName}</h1>
                  <h2 className="text-2xl font-semibold text-gray-400 mb-2">Department ID: {d.DepartnemtID}</h2>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Number of Courses: {course.filter((n) => n.DepartmentID == d.DepartnemtID).length}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Number of Students: {stu.filter((n) => n.BranchName == d.DepartmentName).length}
                  </h3>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    Number of Instructors: {inst.filter((n) => n.DepartmentID == d.DepartnemtID).length}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      
      ) : (
        <p>Loading...</p>
      )}

    </>
  )
}

export default Admin