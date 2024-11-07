import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import Student from './Student';
import { token } from './Home';


function Show_tables() {
  const [dept, setdept] = useState([]);
  const [inst, setinstdata] = useState([]);
  const [course, setcourse] = useState([]);
  const [stu, setstu] = useState([]);
  const [stucour, setstucour] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/instructor')
      .then((response) => setinstdata(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/department')
      .then((response) => setdept(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/students')
      .then((response) => setstu(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/Courses')
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/stucour')
      .then((response) => setstucour(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 px-4">
  {/* Courses Table */}
  <h2 className="text-2xl font-bold text-center text-white mb-4">Courses</h2>
  <div className="overflow-x-auto">
    <table className="min-w-max table-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-auto">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-3 px-4 text-left">Course ID</th>
          <th className="py-3 px-4 text-left">Course Name</th>
          <th className="py-3 px-4 text-left">Instructor ID</th>
          <th className="py-3 px-4 text-left">Department ID</th>
        </tr>
      </thead>
      <tbody>
        {course.map((c) => (
          <tr key={c.CourseID} className="hover:bg-gray-600">
            <td className="py-2 px-4">{c.CourseID}</td>
            <td className="py-2 px-4">{c.CourseName}</td>
            <td className="py-2 px-4">{c.InstructorID}</td>
            <td className="py-2 px-4">{c.DepartmentID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Department Table */}
  <h2 className="text-2xl font-bold text-center text-white mt-8 mb-4">Department</h2>
  <div className="overflow-x-auto">
    <table className="min-w-max table-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-auto">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-3 px-4 text-left">Department ID</th>
          <th className="py-3 px-4 text-left">Department Name</th>
          <th className="py-3 px-4 text-left">Head ID</th>
        </tr>
      </thead>
      <tbody>
        {dept.map((c) => (
          <tr key={c.DepartnemtID} className="hover:bg-gray-600">
            <td className="py-2 px-4">{c.DepartnemtID}</td>
            <td className="py-2 px-4">{c.DepartmentName}</td>
            <td className="py-2 px-4">{c.HeadID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Student Table */}
  <h2 className="text-2xl font-bold text-center text-white mt-8 mb-4">Students</h2>
  <div className="overflow-x-auto">
    <table className="min-w-max table-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-auto">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-3 px-4 text-left">Student Name</th>
          <th className="py-3 px-4 text-left">Student Number</th>
          <th className="py-3 px-4 text-left">Branch Name</th>
        </tr>
      </thead>
      <tbody>
        {stu.map((c) => (
          <tr key={c.StudentNumber} className="hover:bg-gray-600">
            <td className="py-2 px-4">{c.StudentName}</td>
            <td className="py-2 px-4">{c.StudentNumber}</td>
            <td className="py-2 px-4">{c.BranchName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Instructors Table */}
  <h2 className="text-2xl font-bold text-center text-white mt-8 mb-4">Instructors</h2>
  <div className="overflow-x-auto">
    <table className="min-w-max table-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-auto">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-3 px-4 text-left">Instructor ID</th>
          <th className="py-3 px-4 text-left">Instructor Name</th>
          <th className="py-3 px-4 text-left">Is Head</th>
          <th className="py-3 px-4 text-left">Department ID</th>
        </tr>
      </thead>
      <tbody>
        {inst.map((c) => (
          <tr key={c.InstructorID} className="hover:bg-gray-600">
            <td className="py-2 px-4">{c.InstructorID}</td>
            <td className="py-2 px-4">{c.InstructorName}</td>
            <td className="py-2 px-4">{c.isHead ? "Yes" : "No"}</td>
            <td className="py-2 px-4">{c.DepartmentID}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Courses Enrolled Table */}
  <h2 className="text-2xl font-bold text-center text-white mt-8 mb-4">Courses Enrolled</h2>
  <div className="overflow-x-auto">
    <table className="min-w-max table-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg mx-auto">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-3 px-4 text-left">S.No</th>
          <th className="py-3 px-4 text-left">Roll Number</th>
          <th className="py-3 px-4 text-left">Course ID</th>
          <th className="py-3 px-4 text-left">Marks</th>
          <th className="py-3 px-4 text-left">Attendance</th>
        </tr>
      </thead>
      <tbody>
        {stucour.map((c, index) => (
          <tr key={index} className="hover:bg-gray-600">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{c.StudentNumber}</td>
            <td className="py-2 px-4">{c.CourseID}</td>
            <td className="py-2 px-4">{c.Marks}</td>
            <td className="py-2 px-4">{c.Attendance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  

  )
}

export default Show_tables
