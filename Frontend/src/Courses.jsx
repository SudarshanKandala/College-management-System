import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { token } from './Home';


function Courses() {
  const [cid, setcid] = useState('');
  const [cname, setcname] = useState('');
  const [inst, setinstdata] = useState([]);
  const [instans, giveinstans] = useState('');
  const [dept, setdept] = useState([]);
  const [deptid, setdeptid] = useState('');
  const [course, setcourse] = useState([]);
  const [delcour,setdelcour] = useState("");
  const [newins, setnewins] = useState("");
  const [courid, setcourid] = useState("");


  useEffect(() => {
    axios
      .get('http://localhost:8080/instructor',{withCredentials: true})
      .then((response) => setinstdata(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/Courses',{withCredentials: true})
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/department',{withCredentials: true})
      .then((response) => setdept(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log('Course ID:', cid);
    // console.log('Course Name:', cname);
    // console.log('Instructor ID:', instans);
    // console.log('Department ID:', deptid);

    const iscoursepresent=course.some((c)=>c.CourseID==cid);
    if(iscoursepresent){
      alert('Course already exists!');
      return ;
    }

    const departmentofteacher=inst.find((i)=>{
      if(i.InstructorID==instans)
          return i;
    })
    // console.log('hello',departmentofteacher);
    try {
      const response = await axios.post('http://localhost:8080/Courses', {
        courseid: cid,
        coursename: cname,
        instid: instans,
        deptid: departmentofteacher.DepartmentID,
      },{withCredentials: true});
      alert('Course added successfully');
      console.log('Course added:', response.data);
    } catch (error) {
      console.log('Error sending data: ', error);
    }
  };

  const handledelete = async (e) =>{
    e.preventDefault();
    const iscoursepresent=course.some((c)=>c.CourseID==delcour);
    if(iscoursepresent==false){
      alert('Course not found!');
      return;
    }
    try {
      const response=await axios.post('http://localhost:8080/deletecourse',{
        cid:delcour
      },{withCredentials: true});
      alert("course deleted successfully!");
    } catch (error) {
      console.log("Error deleting course: ",error);
    }
  };

  const updateinstructor = async (e) => {
    e.preventDefault();
    const isteacherpresent = inst.some((t)=>t.InstructorID==newins)
    if(isteacherpresent==false){
      alert('Instructor not present!');
      return;
    }
    const iscoursepresent = course.some((t)=>t.CourseID==courid)
    if(iscoursepresent==false){
      alert('Course not present!');
      return;
    }
    const a = course.find((c)=>{
      if(c.CourseID==courid)
        return c;
    });
    const b = inst.find((i)=>{
      if(i.InstructorID==newins)
        return i;
    });

    console.log(a);
    console.log(b);
    if(a.DepartmentID!=b.DepartmentID){
      alert('Teacher doesnot belong to that department in which course belongs to!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/updatecourinst',{
        newins:newins,
        courid:courid
      },{withCredentials: true})
      alert('Instructor updated successfully!');
    } catch (error) {
      console.log('Error updating teacher: ',error)
    }
  }

  return (
    <>
      <div className="bg-gray-900 text-gray-100">
        <div className="flex justify-center space-x-8">
          {/* Add Course Form */}
          <form
            onSubmit={handlesubmit}
            className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
          >
            <h3 className="text-3xl font-bold text-center text-white">
              Add Course
            </h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="courseid" className="block text-lg font-medium">Course ID:</label>
                <input
                  type="text"
                  id="courseid"
                  required
                  autoComplete="off"
                  value={cid}
                  onChange={(e) => setcid(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="coursename" className="block text-lg font-medium">Course Name:</label>
                <input
                  type="text"
                  id="coursename"
                  required
                  autoComplete="off"
                  value={cname}
                  onChange={(e) => setcname(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="instructor" className="block text-lg font-medium">Choose Instructor:</label>
                <select
                  name="instructor"
                  id="instructor"
                  value={instans}
                  required
                  onChange={(e) => giveinstans(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                >
                  <option value="">Select teacher</option>
                  {inst.map((i) => (
                    <option value={i.InstructorID} key={i.InstructorID}>
                      {i.InstructorName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
                >
                  Add Course
                </button>
              </div>
            </div>
          </form>

          {/* Delete Course Form */}
          <form
            onSubmit={handledelete}
            className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
          >
            <h3 className="text-3xl font-bold text-center text-white">
              Delete Course
            </h3>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="delete" className="block text-lg font-medium">Enter Course ID:</label>
                <input
                  type="text"
                  id="delete"
                  value={delcour}
                  required
                  autoComplete="off"
                  onChange={(e) => setdelcour(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
                >
                  Delete Course
                </button>
              </div>
            </div>
          </form>

          {/* Update Course Form */}
          <form
            onSubmit={updateinstructor}
            className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
          >
            <h3 className="text-3xl font-bold text-center text-white">
              Update Course
            </h3>
            <h4 className="text-xl text-center text-white">
              Update Instructor for a Course
            </h4>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="upins" className="block text-lg font-medium">Enter new Instructor's ID:</label>
                <input
                  type="text"
                  id="upins"
                  value={newins}
                  required
                  autoComplete="off"
                  onChange={(e) => setnewins(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="for_cour" className="block text-lg font-medium">Enter the Course ID:</label>
                <input
                  type="text"
                  id="for_cour"
                  value={courid}
                  required
                  autoComplete="off"
                  onChange={(e) => setcourid(e.target.value)}
                  className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg text-xl"
                >
                  Update Instructor
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>


    </>
  );
}

export default Courses;
