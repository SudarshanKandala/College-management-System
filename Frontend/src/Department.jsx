import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { token } from './Home';


function Department() {
    const [did,setdid] = useState("");
    const [dname,setdname] = useState("");
    const [dept, setdept] = useState([]);
    const [deldept, setdeldept] = useState("");
    const [stu, setstu] = useState([]);
    const [course, setcourse] = useState([]);
    const [courarr, setCourarr] = useState([]);
    const [courarr1, setCourarr1] = useState([]);

    useEffect(() => {
        axios
          .get('http://localhost:8080/department',{withCredentials: true})
          .then((response) => setdept(response.data))
          .catch((error) => console.log('Error fetching data: ', error));
      }, []);

      useEffect(() => {
        axios
          .get('http://localhost:8080/students',{withCredentials: true})
          .then((response) => setstu(response.data))
          .catch((error) => console.log('Error fetching data: ', error));
      }, []);
    
      useEffect(() => {
        axios
          .get('http://localhost:8080/Courses',{withCredentials: true})
          .then((response) => setcourse(response.data))
          .catch((error) => console.log('Error fetching data: ', error));
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDepartmentPresent=dept.some((dpt)=> dpt.DepartnemtID == did);
        if(isDepartmentPresent){
            alert('Department already exists!');
            return;
        }
        try{
            const response=await axios.post('http://localhost:8080/department',{
                dptid:did,
                dptname:dname,
            });
            alert('Department added sucessfully');
        }
        catch(error){
            console.error('Error sending data: ',error);
        }
    };

    const handledelete = async (e) => {
        e.preventDefault();
        const conf = confirm("Are you sure want to delete department?");
        if(conf==false)
            return;
        const deptname = dept.find((d)=>{
            if(d.DepartnemtID==deldept)
                return d;
        });
        stu.map((s)=>{
            if(s.BranchName==deptname.DepartmentName)
                setCourarr1([...courarr1,s.StudentNumber]);
            return null;
        });
        course.map((c)=>{
            if(c.DepartmentID==deldept)
                setCourarr([...courarr,c.CourseID]);
            return null;
        });
        console.log("Student array: ",courarr1);
        console.log("Course array: ",courarr);
        try {
            const response = await axios.post("http://localhost:8080/deldept",{
                deptid:deldept,
                courarr:courarr,
                stuarr:courarr1,
                deptname:deptname.DepartmentName
            });
            alert('Department Deleted Successfully!');
        } catch (error) {
            console.log('Error deleting department: ',error);
        }
    }

    return (
        <>
            <div className="bg-gray-900 text-gray-100">
                <div className="flex justify-center space-x-8">
                    {/* Add Department Form */}
                    <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
                    >
                    <h3 className="text-3xl font-bold text-center text-white">
                        Add Department
                    </h3>
                    <div className="flex flex-col space-y-4">
                        <div>
                        <label htmlFor="did" className="block text-lg font-medium">Enter Department ID:</label>
                        <input
                            type="text"
                            id="did"
                            required
                            autoComplete="off"
                            value={did}
                            onChange={(e) => setdid(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                        />
                        </div>
                        <div>
                        <label htmlFor="dname" className="block text-lg font-medium">Enter Department Name:</label>
                        <input
                            type="text"
                            id="dname"
                            required
                            autoComplete="off"
                            value={dname}
                            onChange={(e) => setdname(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                        />
                        </div>
                        <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                    </form>

                    {/* Delete Department Form */}
                    <form
                    onSubmit={handledelete}
                    className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
                    >
                    <h3 className="text-3xl font-bold text-center text-white">
                        Delete Department
                    </h3>
                    <div className="flex flex-col space-y-4">
                        <div>
                        <label htmlFor="delete" className="block text-lg font-medium">Select Department:</label>
                        <select
                            name="delete"
                            id="delete"
                            value={deldept}
                            onChange={(e) => setdeldept(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                        >
                            <option value="select">Select Department</option>
                            {dept.map((i) => (
                            <option value={i.DepartnemtID} key={i.DepartnemtID}>
                                {i.DepartmentName}
                            </option>
                            ))}
                        </select>
                        </div>
                        <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
                        >
                            Delete Department
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Department
