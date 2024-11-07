import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Student from './Student';
import Teacher from './Teacher';
import Courses from './Courses';
import Department from './Department';
import Display from './Display';
import Show_tables from './Show_tables';
import Student_1 from './Student_1';
import Teacher_1 from './Teacher_1';
import Admin from './Admin';
import Navbar from './navbar';
import { AuthContext } from './context/AuthProvider';

export const token = localStorage.getItem("your_JWT_Token");

function Home() {
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
  },[token]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/department')
      .then((response) => setdept(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[token]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/students')
      .then((response) => setstu(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[token]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/Courses')
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[token]); 

  useEffect(() => {
    axios
      .get('http://localhost:8080/stucour')
      .then((response) => setstucour(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  },[token]);

  return (
    <>  
    <div className="bg-gray-900 text-gray-100 min-h-screen absolute top-0">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://ugcounselor-content.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/05/19123831/IIIT-Nagpur.jpg)' }}>
        <div className="bg-black bg-opacity-60 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to Indian Institute of Information Technology, Nagpur
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mt-4">
            Excellence in Education and Innovation
          </p>
          <a href="#about" className="mt-8 text-xl bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg">
            Learn More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-8">About Us</h2>
        <p className="text-lg text-gray-400 leading-relaxed text-center max-w-2xl mx-auto">
        Indian Institute of Information Technology, Nagpur (IIITN) is one of the 20 Indian Institutes of Information Technology established under the Public-Private Partnership Scheme by the Ministry of Education (erstwhile Ministry of Human Resource Development), Government of India. IIITN has been declared as an “Institution of National Importance” under the provisions of the Indian Institute of Information Technology (Public-Private Partnership) Act, 2017.
        </p>
      </section>

      {/* Departments Section */}
      <section id="departments" className="container mx-auto py-16 px-8 bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-white">Computer Science</h3>
            <p className="text-gray-400 mt-4">
              Our Computer Science department focuses on core computing principles, artificial intelligence, and software development. 
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-white">Electronics & Communication</h3>
            <p className="text-gray-400 mt-4">
              The ECE department delves into the world of embedded systems, signal processing, and communication technology.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-white">Information Technology</h3>
            <p className="text-gray-400 mt-4">
              Offering cutting-edge courses on web development, cloud computing, cybersecurity, and data science.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="container mx-auto py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Administration</h2>
        <p className="text-lg text-gray-400 leading-relaxed text-center max-w-2xl mx-auto">
          Our experienced faculty are dedicated to creating a conducive learning environment where research and innovation are at the forefront.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          
          {/* Faculty 1 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <img 
              src="https://testing.iiitn.ac.in/assets/images/director3.jpg" 
              alt="Dr. O. G. Kakde" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Dr. O. G. Kakde</h3>
            <p className="text-gray-400 mt-2">Director, IIITN</p>
          </div>

          {/* Faculty 2 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <img 
              src="https://iiitn.ac.in/institute/director_img.jpg" 
              alt="Shri Kailas N. Dakhale" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Shri Kailas N. Dakhale</h3>
            <p className="text-gray-400 mt-2">Registrar, IIITN</p>
          </div>

          {/* Faculty 3 */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
            <img 
              src="https://iiitn.ac.in/27082024/Dr.%20Tausif%20Diwan.jpg" 
              alt="Dr. Tausif Diwan" 
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-white">Dr. Tausif Diwan</h3>
            <p className="text-gray-400 mt-2">Associate Dean, IIITN</p>
          </div>

        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="bg-gray-800 py-16 px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Contact Us</h2>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-lg mb-8 md:mb-0">
            <address>IIIT Nagpur Campus <br />Survey No. 140,141/1 <br />behind Br. Sheshrao Wankhade Shetkari Sahkari Soot Girni, Village - Waranga,<br />PO - Dongargaon(Butibori),<br />Tahsil- Nagpur (Rural),<br />District Nagpur, Maharashtra- 441108</address>
            <br />
            <p>Email: registrar@iiitn.ac.in</p>
            <p>Ph.no: 9405215010</p>
          </div>
          <a href="mailto:registrar@iiitn.ac.in" className="bg-blue-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg">
            Email Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Indian Institute of Information Technology, Nagpur</p>
        </div>
      </footer>
    </div>

      {/* <p className='dark:text-white'>Display of Home page elements!!!</p> */}
      {/* <div className="bg-gray-900 text-gray-100">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-white">Overview</h1>
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dept.map((d, index) => {
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-800 via-purple-900 to-gray-900 rounded-lg p-6 shadow-lg transform transition duration-300 hover:scale-105"
              >
                <h1 className="text-4xl font-bold text-white mb-4">{d.DepartmentName}</h1>
                <h1 className="text-2xl font-semibold text-gray-400 mb-2">Department ID: {d.DepartnemtID}</h1>
                <h1 className="text-2xl font-semibold text-gray-400 mb-2">
                  Number of Courses: {course.filter((n) => n.DepartmentID == d.DepartnemtID).length}
                </h1>
                <h1 className="text-2xl font-semibold text-gray-400 mb-2">
                  Number of Students: {stu.filter((n) => n.BranchName == d.DepartmentName).length}
                </h1>
                <h1 className="text-2xl font-semibold text-gray-400 mb-2">
                  Number of Instructors: {inst.filter((n) => n.DepartmentID == d.DepartnemtID).length}
                </h1>
              </div>
            );
          })}
        </div>
      </div> */}

    </>
  );
}

export default Home;
