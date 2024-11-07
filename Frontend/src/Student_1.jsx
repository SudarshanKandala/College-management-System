import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';

function Student_1() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { accessToken } = useContext(AuthContext);
  const [payload, setPayload] = useState();
  const [stucour, setStucour] = useState([]);
  const [inst, setinstdata] = useState([]);
  const [course, setcourse] = useState([]);
  const [stu, setStu] = useState([]);
  const [messages, setMessages] = useState([]);
  const [did, setDid] = useState("");
  const [dept, setDept] = useState([]);
  const [courarr, setCourarr] = useState([]);
  const [messagesFetched, setMessagesFetched] = useState(false);
  const [cname, setCname] = useState([]);
  const [instname,setInstname] = useState([]);

  // Decode the token and set payload
  useEffect(() => {
    if (!accessToken) return; // If no token, don't fetch
    axios
      .get("http://localhost:8080/decode_token", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setPayload(res.data); // Set the user data
      })
      .catch((err) => {
        console.log("Error decoding token: ", err);
        // Handle token decoding failure (e.g., navigate to login or handle state)
      });
  }, [accessToken]);

  // Fetch students, student courses, and departments data
  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then((response) => setStu(response.data))
      .catch((error) => console.log('Error fetching students: ', error));

    axios.get('http://localhost:8080/stucour')
      .then((response) => setStucour(response.data))
      .catch((error) => console.log('Error fetching student courses: ', error));

    axios.get('http://localhost:8080/department')
      .then((response) => setDept(response.data))
      .catch((error) => console.log('Error fetching departments: ', error));

    axios
    .get('http://localhost:8080/instructor')
    .then((response) => setinstdata(response.data))
    .catch((error) => console.log('Error fetching data: ', error));

    axios
      .get('http://localhost:8080/Courses')
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  // Update courarr when payload or stucour is updated
  useEffect(() => {
    if (payload) {
      const temp = stucour.filter((s) => s.StudentNumber === payload.username).map((s) => s.CourseID);
      setCourarr(temp);
      setCname(stucour.filter((s) => s.StudentNumber === payload.username).map((s) => s.CourseName));
    }
  }, [payload,stucour]);

  // Fetch messages only once
  useEffect(() => {
    if (payload && courarr.length > 0 && !messagesFetched) {
      // Find the student and the corresponding department
      const student = stu.find((s) => s.StudentNumber === payload.username);
      if (student) {
        const department = dept.find((d) => d.DepartmentName === student.BranchName);

        if (department) {
          console.log("Department: ", department);
          setDid(department.DepartnemtID); // Set department ID correctly

          // Now loop through courses in courarr and fetch messages for each course ID
          courarr.forEach((courseID) => {
            console.log("Fetching messages for course: ", courseID);
            console.log("Department ID: ", department.DepartnemtID);

            // Fetch messages directly inside the loop
            axios.post("http://localhost:8080/messages", { did: department.DepartnemtID, cid: courseID })
              .then((result) => {
                // Check if result.data is already in messages before appending
                const newMessages = result.data.filter((message) =>
                  !messages.some((msg) => msg.id === message.id) // Assuming message has a unique id
                );
                setMessages((prevMessages) => [...prevMessages, ...newMessages]); // Append new unique messages
              })
              .catch((err) => console.log("Error fetching messages: ", err));
          });

          // Set messages fetched flag to true
          setMessagesFetched(true);
        } else {
          console.log("Department not found");
        }
      } else {
        console.log("Student not found");
      }
    }
  }, [payload, courarr, stu, dept,messagesFetched]);
  
  return (
    <>
      {payload ? (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        {/* Roll Number Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {payload.name}</h1>
          <h2 className="text-2xl font-semibold text-gray-400">{payload.username}</h2>
        </div>
    
        {/* Content: Notifications and Courses Enrolled Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Notifications (Messages) Table */}
          <div className="bg-gradient-to-r from-blue-800 via-purple-900 to-pink-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Notifications</h2>
            <div className="overflow-x-auto">
              <table className="min-w-max w-full table-auto bg-gray-700 border border-gray-600 rounded-lg">
                <thead>
                  <tr className="bg-gray-600 text-white">
                    <th className="py-3 px-4 text-left">Title</th>
                    <th className="py-3 px-4 text-left">Message From</th>
                    <th className="py-3 px-4 text-left">Course</th>
                    <th className="py-3 px-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((message, index) => {
                    let coursename = "";
                    const instructorName = course.map((c) => {
                      if (c.CourseID === message.CourseID) {
                        coursename = c.CourseName;
                        return inst.find((i) => i.InstructorID === c.InstructorID)?.InstructorName || "";
                      }
                    });
    
                    return (
                      <tr key={index} className="bg-gray-700 text-white">
                        <td className="py-2 px-4">{message.Title}</td>
                        <td className="py-2 px-4">{instructorName}</td>
                        <td className="py-2 px-4">{coursename}</td>
                        <td className="py-2 px-4">{message.Description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
    
          {/* Courses Enrolled Table */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Courses Enrolled</h2>
            <div className="overflow-x-auto">
              <table className="min-w-max table-auto bg-gray-700 border border-gray-600 rounded-lg shadow-lg mx-auto">
                <thead>
                  <tr className="bg-gray-600 text-white">
                    <th className="py-3 px-4 text-left">S.No</th>
                    <th className="py-3 px-4 text-left">Course ID</th>
                    <th className="py-3 px-4 text-left">Marks</th>
                    <th className="py-3 px-4 text-left">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {stucour.map((c, index) => (
                    c.StudentNumber === payload.username && (
                      <tr key={index} className="bg-gray-700 text-white">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{c.CourseID}</td>
                        <td className="py-2 px-4">{c.Marks}</td>
                        <td className="py-2 px-4">{c.Attendance}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Student_1;
