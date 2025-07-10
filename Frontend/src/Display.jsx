import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route,Routes } from 'react-router-dom';
import Student from './Student';
import Teacher from './Teacher';
import Courses from './Courses';
import Department from './Department';
import Home from './Home';
import Show_tables from './Show_tables';
import Admin from './Admin';
import Student_1 from './Student_1';
import Teacher_1 from './Teacher_1';
import Admin_login from './Admin_login';
import Student_login from './Student_login';
import Teacher_login from './Teacher_login';
import Navbar from './Navbar';


function Display() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Student' element={<Student/>}/>
        <Route path='/Teacher' element={<Teacher/>}/>
        <Route path='/Department' element={<Department/>}/>
        <Route path='/Courses' element={<Courses/>}/>
        <Route path='/Show_tables' element={<Show_tables/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Student_1' element={<Student_1/>}/>
        <Route path='/Teacher_1' element={<Teacher_1/>}/>
        <Route path='/Admin_login' element={<Admin_login/>}/>
        <Route path='/Student_login' element={<Student_login/>}/>
        <Route path='/Teacher_login' element={<Teacher_login/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
      </Routes>
    </div>
  )
}

export default Display
