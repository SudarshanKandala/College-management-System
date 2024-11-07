import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { token } from './Home';

function Teacher() {
  const [instid, setinstid] = useState('');
  const [name, setname] = useState('');
  const [ishead, setishead] = useState('');
  const [deptid, setdeptid] = useState('');
  const [dept, setdept] = useState([]);
  const [inst, setinstdata] = useState([]);
  const [deltea, setdeltea] = useState("");
  const [up_name, set_up_name] = useState("");
  const [for_id,set_for_id] = useState("");
  const [hod, sethod] = useState("");
  const [password,setpassword] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isTeacherPresent = inst.some((teacher) => teacher.InstructorID === Number(instid));
    console.log(isTeacherPresent);
    if (isTeacherPresent) {
      alert('Teacher already exists in this college!');
      return;
    }
    let ispresenthead = 0;
    ispresenthead = dept.find((d)=>{
      if(d.DepartnemtID==deptid){
        if(d.HeadID!=null && ishead==1){
          return 1;
        }
      }
    });

    if(ispresenthead){
      alert('Head of the department already exists!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/instructor', {
        a_instid: instid,
        a_name: name,
        a_ishead: ishead,
        a_deptid: deptid,
        password : password
      });
      alert('Teacher added successfully!');
    } catch (error) {
      console.error('Error sending data: ', error);
    }
  };

  const handledelete = async (e) => {
    e.preventDefault();
    const isteacherpresent = inst.some((tea)=>tea.InstructorID==deltea);
    if(isteacherpresent==false){
      alert("Teacher not found");
      return;
    }
    const ishead = inst.find((i)=>{
      if(i.InstructorID==deltea)
        return i;
    })
    console.log(isteacherpresent);
    let temp=0;
    if(ishead.isHead==1){
      temp=ishead.DepartmentID;
    }
    try {
      const response = await axios.post('http://localhost:8080/deletetea',{
        deltea:deltea,
        ishead:temp
      });
      alert("Instructor deleted successfully!");
    } catch (error) {
      console.log("error deleting teacher: ",error);
    }
  };

  const handlenamechange = async (e) => {
    e.preventDefault();
    const isteacherpresent = inst.some((tea)=>tea.InstructorID==for_id);
    if(isteacherpresent==false){
      alert("Teacher not found");
      return;
    }
    try {
      const respnse = await axios.post("http://localhost:8080/updateteaname",{
        newname:up_name,
        id:for_id
      });
      alert('Name updated Successfully');
    } catch (error) {
      console.log("error updating name: ",error);
    }
  };

  const handlechangeHOD = async (e) => {
    e.preventDefault();
    const isteacherpresent = inst.some((tea)=>tea.InstructorID==hod);
    if(isteacherpresent==false){
      alert("Teacher not found");
      return;
    }
    const newhod = inst.find((i)=>{
      if(i.InstructorID==hod)
        return i;
    });
    const currhod = dept.find((d)=>{
      if(newhod.DepartmentID==d.DepartnemtID)
        return d;
    });
    try {
      const response = await axios.post("http://localhost:8080/updatehod",{
        newhod1:newhod.InstructorID,
        currhod1:currhod.HeadID
      });
      alert("HOD updated Successfully!");
    } catch (error) {
      console.log("error updating HOD: ",error);
    }
  }

  return (
    <>
     <div className="bg-gray-900 text-gray-100">
      <div className="flex justify-center space-x-8">
        
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        >
          <h3 className="text-3xl font-bold text-center text-white">
            Add Teacher
          </h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="instid" className="block text-lg font-medium">Enter Instructor's ID:</label>
              <input
                type="text"
                id="instid"
                required
                autoComplete="off"
                value={instid}
                onChange={(e) => setinstid(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-lg font-medium">Enter Instructor's Name:</label>
              <input
                type="text"
                id="name"
                required
                autoComplete="off"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="ishead" className="block text-lg font-medium">Are you Head of Department? (0/1):</label>
              <input
                type="text"
                id="ishead"
                required
                autoComplete="off"
                value={ishead}
                onChange={(e) => setishead(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="branch" className="block text-lg font-medium">Choose Department:</label>
              <select
                name="branch"
                id="branch"
                value={deptid}
                required
                onChange={(e) => setdeptid(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              >
                <option value="">Select Branch</option>
                {dept.map((i) => (
                  <option value={i.DepartnemtID} key={i.DepartnemtID}>
                    {i.DepartmentName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="instid" className="block text-lg font-medium">Crerate Password:</label>
              <input
                type="text"
                id="instid"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl py-3 px-6 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        <form
          onSubmit={handledelete}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        >
          <h3 className="text-3xl font-bold text-center text-white">
            Delete Teacher
          </h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="delete" className="block text-lg font-medium">Enter Teacher's ID:</label>
              <input
                type="text"
                id="delete"
                value={deltea}
                required
                autoComplete="off"
                onChange={(e) => setdeltea(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl py-3 px-6 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
              >
                Delete Instructor
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-gray-900 text-gray-100 min-h-screen py-8">
        <div className="flex justify-center mb-8">
          <h2 className="text-3xl font-bold text-white">Update Instructor</h2>
        </div>

        <div className="flex justify-center space-x-8">
          <form onSubmit={handlenamechange} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
            <h3 className="text-xl font-bold text-center text-white">Update Name</h3>
            <div className="flex flex-col space-y-4">
              <label htmlFor="up_name" className="block text-lg font-medium">Enter name of the Instructor:</label>
              <input
                type="text"
                id="up_name"
                value={up_name}
                required
                autoComplete="off"
                onChange={(e) => set_up_name(e.target.value)}
                className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
              <label htmlFor="for_id" className="block text-lg font-medium">Enter Instructor's ID:</label>
              <input
                type="text"
                id="for_id"
                value={for_id}
                required
                autoComplete="off"
                onChange={(e) => set_for_id(e.target.value)}
                className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
                >
                  Update Name
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={handlechangeHOD} className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
            <h3 className="text-xl font-bold text-center text-white">Change HOD</h3>
            <div className="flex flex-col space-y-4">
              <label htmlFor="changehod" className="block text-lg font-medium">Enter Instructor's ID:</label>
              <input
                type="text"
                id="changehod"
                value={hod}
                required
                autoComplete="off"
                onChange={(e) => sethod(e.target.value)}
                className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
                >
                  Update HOD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>

    </>
  );
}

export default Teacher;
