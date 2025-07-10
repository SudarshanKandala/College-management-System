// import './App.css';
// import { Link } from 'react-router-dom';
import Display from './Display';
// import { Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
// import { useRef } from 'react';
// import axios from 'axios';
// import { token } from './Home';
import Navbar from './Navbar';

function App() {
  const [login,setlogin] = useState("");

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* <div id="main_heading" className="bg-gradient-to-r from-blue-800 via-purple-900 to-pink-900 text-center py-4 sticky top-0 z-50">
        <h1 className="font-extrabold text-3xl md:text-5xl">
          INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, NAGPUR
        </h1>
      </div> */}
      <Navbar></Navbar>
      <div className="container mx-auto py-8"></div>
      <Display></Display>
    </div>
  );
};

export default App;
