import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";
import { token } from './Home';

function Student() {
    const [name,setName] = useState("");
    const [rollno,setrollno] = useState("");
    const [dept, setdept] = useState([]);
    const [deptid, setdeptid] = useState('');
    const [stu, setstu] = useState([]);
    const [course, setcourse] = useState([]);
    const [stucourans, setstucourans] = useState("");
    const [new_name,set_new_name] = useState("");
    const [for_rollno, set_for_rollno] = useState('');
    const [for_rollno1, set_for_rollno1] = useState('');
    const [deptid1, setdeptid1] = useState('');
    const [pass,setpass] = useState("");
    const [courarr, setCourarr] = useState([]);
    const [courarr1, setCourarr1] = useState([]);

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

      const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          // Add the course ID to the array
          setCourarr([...courarr, value]);
        } else {
          // Remove the course ID from the array
          setCourarr(courarr.filter((id) => id !== value));
        }
      };

      const handleCheckboxChange1 = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          // Add the course ID to the array
          setCourarr1([...courarr1, value]);
        } else {
          // Remove the course ID from the array
          setCourarr(courarr.filter((id) => id !== value));
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(courarr);
        const isStudentPresent = stu.some((student) => student.StudentNumber === rollno);

        if (isStudentPresent) {
            alert('Student with this roll number already exists!');
            return;
        }
        try{
            console.log(courarr);
            alert('Student added successfully!');
            const response=await axios.post('http://localhost:8080/students',{
                name:name,
                rollno:rollno,
                dept:deptid,
                pass:pass
            });
            const response1=await axios.post('http://localhost:8080/stucour',{
                rollno:rollno,
                courarr:courarr
            });

        }
        catch(error){
            console.error('Error sending data: ',error);
        }
    };

    const handledelete = async (e) =>{
        e.preventDefault(); 
        const isStudentPresent = stu.some((student) => student.StudentNumber == stucourans);
        if (isStudentPresent==false) {
            alert('Student not found!');
            return;
        }
        try{
            const response=await axios.post('http://localhost:8080/studentdelete',{
                stucourans:stucourans,
            });
            alert('Student deleted successfully!');
        }
        catch(error){
            console.error('Error deleting data: ',error);
        }
    };

    const updatename = async (e) => {
        e.preventDefault();
        const isStudentPresent = stu.some((student) => student.StudentNumber == for_rollno);
        if (isStudentPresent==false) {
            alert('Student not found!');
            return;
        }
        try {
            const response= await axios.post('http://localhost:8080/updatename',{
                new_name:new_name,
                for_rollno:for_rollno
            })
            alert('name updated Successfully!');
        } catch (error) {
            console.error('Error updating name: ',error);
        }
    };

    const changebranch = async (e) => {
        e.preventDefault();
        console.log(courarr1);
        const br_name = dept.find((d)=>{
            if(d.DepartnemtID==deptid1)
                return d;
        })
        try {
            const response = await axios.post("http://localhost:8080/updatebranch",{
                for_rollno1:for_rollno1,
                deptid1:br_name.DepartmentName,
                courarr1:courarr1
            });
            alert('Branch Updated Successfully!');
        } catch (error) {
            console.error('Error updating branch: ',error);
        }
    }

    return (
        <>
            <div className="bg-gray-900 text-gray-100">
                <div className="flex justify-center space-x-8 mb-8">

                    {/* Add Student Form */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Add Student</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                        <label htmlFor="name" className="block text-lg font-medium text-white">Enter your name:</label>
                        <input
                            type="text"
                            id="name"
                            required
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                        />
                        </div>
                        <div>
                        <label htmlFor="rollno" className="block text-lg font-medium text-white">Enter your Roll Number:</label>
                        <input
                            type="text"
                            id="rollno"
                            required
                            autoComplete="off"
                            value={rollno}
                            onChange={(e) => setrollno(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                        />
                        </div>
                        <div>
                        <label htmlFor="branch" className="block text-lg font-medium text-white">Choose Department:</label>
                        <select
                            name="branch"
                            id="branch"
                            value={deptid}
                            onChange={(e) => setdeptid(e.target.value)}
                            required
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                        >
                            <option value="">Select Branch</option>
                            {dept.map((i) => (
                            <option value={i.DepartmentName} key={i.DepartnemtID}>
                                {i.DepartmentName}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div>
                        {course.map((i) => (
                            <div key={i.CourseID} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                name={i.CourseID}
                                id={i.CourseID}
                                value={i.CourseID}
                                onChange={handleCheckboxChange}
                                className="mr-2"
                            />
                            <label htmlFor={i.CourseID} className="text-white">{i.CourseName}</label>
                            </div>
                        ))}
                        </div>
                        <div>
                        <label htmlFor="rollno" className="block text-lg font-medium text-white">Create Password:</label>
                        <input
                            type="text"
                            id="rollno"
                            required
                            autoComplete="off"
                            value={pass}
                            onChange={(e) => setpass(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                        />
                        </div>
                        <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
                        >
                        Add Student
                        </button>
                    </form>
                    </div>

                    {/* Update Student Form */}
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Update Student</h2>
                    <div className="space-y-4">
                        <div>
                        <h3 className="text-xl font-bold text-center text-white mb-2">Update Name of Student</h3>
                        <form onSubmit={updatename}>
                            <label htmlFor="up_name" className="block text-lg font-medium text-white">Enter Name of Student:</label>
                            <input
                            type="text"
                            id="up_name"
                            required
                            autoComplete="off"
                            value={new_name}
                            onChange={(e) => set_new_name(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            />
                            <label htmlFor="roll" className="block text-lg font-medium text-white">Enter Roll Number:</label>
                            <input
                            type="text"
                            id='rollno'
                            required
                            autoComplete="off"
                            value={for_rollno}
                            onChange={(e) => set_for_rollno(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            />
                            <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full mt-4"
                            >
                            Update Name
                            </button>
                        </form>
                        </div>

                        <div>
                        <h3 className="text-xl font-bold text-center text-white mb-2">Change Student's Branch</h3>
                        <form onSubmit={changebranch}>
                            <label htmlFor="roll" className="block text-lg font-medium text-white">Enter Roll Number:</label>
                            <input
                            type="text"
                            id='rollno'
                            required
                            autoComplete="off"
                            value={for_rollno1}
                            onChange={(e) => set_for_rollno1(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            />
                            <label htmlFor="changedept" className="block text-lg font-medium text-white">Change Department:</label>
                            <select
                            name="changedept"
                            id="changedept"
                            value={deptid1}
                            onChange={(e) => setdeptid1(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                            >
                            <option value="select_Branch">Select Branch</option>
                            {dept.map((m) => {
                                const studept = stu.find((s) => s.StudentNumber == for_rollno1);
                                if (studept !== undefined && m.DepartmentName != studept.BranchName) {
                                    return (
                                        <option value={m.DepartnemtID} key={m.DepartnemtID}>
                                        {m.DepartmentName}
                                        </option>
                                    );
                                }
                                // return null;
                            })}
                            </select>
                            <div className="mt-2">
                            {course.map((i) => {
                                if (i.DepartmentID == deptid1) {
                                return (
                                    <div key={i.CourseID} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        name={i.CourseID}
                                        id={i.CourseID}
                                        value={i.CourseID}
                                        onChange={handleCheckboxChange1}
                                        className="mr-2"
                                    />
                                    <label htmlFor={i.CourseID} className="text-white">{i.CourseName}</label>
                                    </div>
                                );
                                }
                                return null;
                            })}
                            </div>
                            <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full mt-4"
                            >
                            Update Branch
                            </button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Delete Student Form */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto mt-8">
                    <h2 className="text-2xl font-bold text-center text-white mb-4">Delete Student</h2>
                    <form onSubmit={handledelete}>
                    <label htmlFor="rollno" className="block text-lg font-medium text-white">Enter Roll Number:</label>
                    <input
                        type="text"
                        id='rollno'
                        value={stucourans}
                        required
                        autoComplete="off"
                        onChange={(e) => setstucourans(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full mt-4"
                    >
                        Delete Student
                    </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Student;
