import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';

function Teacher_1() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { accessToken } = useContext(AuthContext);
  // Logout function
  const [payload, setpayload] = useState();
  const [stucour, setstucour] = useState([]);
  const [inst, setinstdata] = useState([]);
  const [dept, setdept] = useState([]);
  const [course, setcourse] = useState([]);
  // const [showEdit, setShowEdit] = useState(false);
  const [stu, setstu] = useState([]);
  const [instructordata, setinstructordata] = useState();
  const [respdepartment, setrespdepartment] = useState();
  const [rno1, setrno1] = useState("");
  const [cno1, setcno1] = useState("");
  const [marks, setmarks] = useState("");
  const [rno2, setrno2] = useState("");
  const [cno2, setcno2] = useState("");
  const [att, setatt] = useState("");
  const [takeatt, settakeatt] = useState(0);
  const [finalatt, setfinalatt] = useState([]);
  const [for_stu, setfor_stu] = useState([]);
  const [cid_for_att, set_cid_for_att] = useState("Selectcourse");
  const [finalmarks, setfinalmarks] = useState([]);
  const [for_stu1, setfor_stu1] = useState([]);
  const [cid_for_att1, set_cid_for_att1] = useState("Selectcourse");
  const [messagetoggle,setmessagetoggle] = useState(false);
  const [ptitle,setptitle] = useState("");
  const [pdescription,setpdescription] = useState("");
  const [pcourse,setpcourse] = useState("");
  const [pdept,setpdept] = useState(""); 
  const [seeposted,setseeposted] = useState(false);
  const [filledform,setfilledform] = useState(false);
  const [cid_for_seemsg,setcid_for_seemsg] = useState("");
  const [did_for_seemsg,setdid_for_seemsg] = useState("");
  const [message,setmessage] = useState([]);

  const handlesetmessagetoggle = () => setmessagetoggle(!messagetoggle);
  const handlesetseeposted = () => {setseeposted(!seeposted); setfilledform(false)};
  const handlesetfilledform = () => setfilledform(!filledform);
  // const toggleEdit = () => {
  //   setShowEdit((prev) => !prev);
  // };

  useEffect(() => {
    if (!accessToken) return; // If no token, don't fetch
    axios
      .get("http://localhost:8080/decode_token", {
        headers: { Authorization: `Bearer ${accessToken}` },
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
      .get('http://localhost:8080/stucour')
      .then((response) => setstucour(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get('http://localhost:8080/instructor')
      .then((response) => setinstdata(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get('http://localhost:8080/department')
      .then((response) => setdept(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get('http://localhost:8080/Courses')
      .then((response) => setcourse(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    axios
      .get('http://localhost:8080/students')
      .then((response) => setstu(response.data))
      .catch((error) => console.log('Error fetching data: ', error));
  }, [accessToken]);

  const handleSubmitmark = async (e) => {
    e.preventDefault();
    const isStudentPresent = stu.find((student) => student.StudentNumber == rno1);
    if (!isStudentPresent) {
      alert('Student does not exists!');
      return;
    }
    const iscoursepresent1 = course.some((t) => (t.CourseID == cno1))
    if (iscoursepresent1 == false) {
      alert('course not present!');
      return;
    }
    const iscoursepresent = stucour.some((t) => ((t.CourseID == cno1) && (isStudentPresent.StudentNumber == t.StudentNumber)))
    if (iscoursepresent == false) {
      alert('Student not enrolled in course!');
      return;
    }
    try {
      // console.log(courarr);
      alert('marks updated successfully!');
      const response = await axios.post('http://localhost:8080/updatemarks', {
        rno1: rno1,
        cno1: cno1,
        marks: marks
      });
    }
    catch (error) {
      console.error('Error sending data: ', error);
    }
  }

  const handleSubmitatt = async (e) => {
    e.preventDefault();
    const isStudentPresent = stu.find((student) => student.StudentNumber == rno2);
    if (!isStudentPresent) {
      alert('Student does not exists!');
      return;
    }
    const iscoursepresent1 = course.some((t) => (t.CourseID == cno2))
    if (iscoursepresent1 == false) {
      alert('course not present!');
      return;
    }
    const iscoursepresent = stucour.some((t) => ((t.CourseID == cno2) && (isStudentPresent.StudentNumber == t.StudentNumber)))
    if (iscoursepresent == false) {
      alert('Student not enrolled in course!');
      return;
    }
    try {
      // console.log(courarr);
      const response = await axios.post('http://localhost:8080/updateatt', {
        rno2: rno2,
        cno2: cno2,
        att: att
      });
      alert('attendance updated successfully!');
    }
    catch (error) {
      console.error('Error sending data: ', error);
    }
  }

  // const handleInputChange = (index, event) => {
  //   const newValues = [...finalatt];  // Copy the current values
  //   newValues[index] = event.target.value;  // Update the value for the specific index
  //   setfinalatt(newValues);  // Update the state
  // };

  useEffect(() => {
    // Initialize finalatt when cid_for_att changes or when stucour is available
    let prevarr = [];
    let student = [];
    stucour.map((s) => {
      if (s.CourseID == cid_for_att) {
        console.log(s.StudentNumber);
        // setfinalatt([...finalatt,0]);
        prevarr.push(0);
        student.push(s.StudentNumber);
      }
    })
    setfor_stu(student);
    setfinalatt(prevarr);

  }, [cid_for_att]);

  useEffect(() => {
    // Initialize finalatt when cid_for_att changes or when stucour is available
    let prevarr = [];
    let student = [];
    stucour.map((s) => {
      if (s.CourseID == cid_for_att1) {
        console.log(s.StudentNumber);
        // setfinalatt([...finalatt,0]);
        prevarr.push(0);
        student.push(s.StudentNumber);
      }
    })
    setfor_stu1(student);
    setfinalmarks(prevarr);
  }, [cid_for_att1]);

  const take_attendance = async (e) => {
    e.preventDefault();
    // console.log("from take attendance: ",finalatt);
    // console.log("from take attendance students: ",for_stu);
    try {
      confirm("Please Confirm!");
      const response = await axios.post("http://localhost:8080/updateatt", { finalatt, for_stu, cid_for_att });
    } catch (error) {
      console.log("error in posting data in Teacher_1 file and in take attendance function: ", error);
    }

  }

  const take_marks = async (e) => {
    e.preventDefault();
    // console.log("from take attendance: ",finalatt);
    // console.log("from take attendance students: ",for_stu);
    try {
      confirm("Please Confirm!");
      const response = await axios.post("http://localhost:8080/updatemarks", { finalmarks, for_stu1, cid_for_att1 });
    } catch (error) {
      console.log("error in posting data in Teacher_1 file and in take marks function: ", error);
    }

  }

  const handle_postmessage = async (e) => {
    e.preventDefault();
    handlesetmessagetoggle();
    if(!course.some((c) => (c.CourseID == pcourse && c.InstructorID == payload.username))){
      alert("Inavlid course");
      return;
    }
    if(!dept.some((d)=> d.DepartnemtID==pdept)){
      alert("Invalid Department");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/postmessage",{ptitle,pdescription,pcourse,pdept});
      alert("message posted successfully");
    } catch (error) {
      console.log("error in posting data in Teacher_1 file and in handle post messaage function: ", error);
    }
  }

  const handleseeposted = async (e) => {
    e.preventDefault();
    handlesetseeposted();
    handlesetfilledform();
    const valid = course.filter((c)=>c.InstructorID == payload.username).find((f) => f.CourseID == cid_for_seemsg);
    if(valid==undefined){
      alert('enter valid courseid');
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:8080/messages", {
        did: did_for_seemsg,
        cid: cid_for_seemsg,
      });
      setmessage(response.data); // Set the message state here
      console.log("response data: ", response.data);
    } catch (error) {
      console.log("error in posting the message in handleseeposted function: ",error);
    }
  }

  return (
    <div>
      {payload ? (
        <div>
          {/* Render student data */}
          <div className="flex flex-col items-center justify-center bg-gray-900 text-gray-100">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome, {payload.name}</h1>
            <h1 className="text-2xl font-semibold text-gray-400">Your Instructor ID: {payload.username}</h1>
            <h1 className="text-2xl font-semibold text-gray-400">Department: {
              inst.map((s) => {
                if (s.InstructorID == payload.username) {
                  return dept.map((d) => {
                    if (s.DepartmentID == d.DepartnemtID) {
                      return d.DepartmentName;
                    }
                  })
                }
              })
            }</h1>
            <h1 className="text-2xl font-semibold text-gray-100">Courses Taken:
              {
                course.map((m, index) => {
                  if (m.InstructorID == payload.username) {
                    return (
                      <span key={index} className="text-1xl font-semibold text-gray-400"> {index + 1}. {m.CourseName}</span>
                    );
                  }
                })
              }
            </h1>
          </div>

          <div className='py-8'></div>

          <div className="bg-gray-900 text-gray-100 py-8">
            {/* Flex container to hold both forms */}
            <div className="flex justify-center space-x-8">
              {/* Form for Attendance */}
              <form
                onSubmit={take_attendance}
                className="bg-gradient-to-r from-blue-800 via-purple-900 to-pink-900 rounded-lg p-6 shadow-lg"
              >
                <h1 className='text-2xl font-semibold text-white flex justify-center'>Attendance</h1>
                <div className='py-3'></div>
                {/* Course Selection Dropdown */}
                <label htmlFor="coursesel" className="block mb-4 text-xl font-semibold text-white">
                  Select Course:
                </label>
                <select
                  name="coursesel"
                  id="coursesel"
                  value={cid_for_att}
                  onChange={(e) => set_cid_for_att(e.target.value)}
                  required
                  className="block w-full bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out mb-6"
                >
                  <option value="Selectcourse" id="SelectCourse">
                    Select Course
                  </option>
                  {course.map((c, index) => {
                    if (payload.username == c.InstructorID) {
                      return (
                        <option value={c.CourseID} key={index + 1}>
                          {c.CourseName}
                        </option>
                      );
                    }
                  })}
                </select>

                {/* Table to display students and attendance */}
                {(cid_for_att != "Selectcourse") && (
                  <div className="animate-fade-in-up transition-opacity duration-500 ease-in-out">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden mb-6">
                      <thead>
                        <tr className="bg-purple-900">
                          <th className="py-3 px-4 text-left text-sm font-bold">S.No</th>
                          <th className="py-3 px-4 text-left text-sm font-bold">Roll Number</th>
                          <th className="py-3 px-4 text-left text-sm font-bold">Status (0/1)</th>
                          <th className="py-3 px-4 text-left text-sm font-bold">Current Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stucour
                          .filter((m) => m.CourseID == cid_for_att)
                          .map((m, filteredIndex) => {
                            let value = undefined;
                            return (
                              <tr key={filteredIndex} className="border-b border-gray-700">
                                <td className="py-3 px-4">{filteredIndex + 1}</td>
                                <td className="py-3 px-4">{m.StudentNumber}</td>
                                <td className="py-3 px-4">
                                  <input
                                    type="text"
                                    name={m.StudentNumber}
                                    value={value}
                                    onChange={(e) => (finalatt[filteredIndex] = e.target.value)}
                                    className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-1 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
                                  />
                                </td>
                                <td className="py-3 px-4">{m.Attendance}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg mt-4"
                >
                  Submit Attendance
                </button>
              </form>

              {/* Form for Marks */}
              <form
                onSubmit={take_marks}
                className="bg-gradient-to-r from-blue-800 via-purple-900 to-pink-900 rounded-lg p-6 shadow-lg"
              >
                <h1 className='text-2xl font-semibold text-white flex justify-center'>Update Marks</h1>
                <div className='py-3'></div>
                {/* Course Selection Dropdown */}
                <label htmlFor="coursesel" className="block mb-4 text-xl font-semibold text-white">
                  Select Course:
                </label>
                <select
                  name="coursesel"
                  id="coursesel"
                  value={cid_for_att1}
                  onChange={(e) => set_cid_for_att1(e.target.value)}
                  required
                  className="block w-full bg-gray-800 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out mb-6"
                >
                  <option value="Selectcourse" id="SelectCourse">
                    Select Course
                  </option>
                  {course.map((c, index) => {
                    if (payload.username == c.InstructorID) {
                      return (
                        <option value={c.CourseID} key={index + 1}>
                          {c.CourseName}
                        </option>
                      );
                    }
                  })}
                </select>

                {/* Table to display students and marks */}
                {(cid_for_att1 != "Selectcourse") && (
                  <div className="animate-fade-in-up transition-opacity duration-500 ease-in-out">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden mb-6">
                      <thead>
                        <tr className="bg-purple-900">
                          <th className="py-3 px-4 text-left text-sm font-bold">S.No</th>
                          <th className="py-3 px-4 text-left text-sm font-bold">Roll Number</th>
                          <th className="py-3 px-4 text-left text-sm font-bold">Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stucour
                          .filter((m) => m.CourseID == cid_for_att1)
                          .map((m, filteredIndex) => {
                            let value = undefined;
                            return (
                              <tr key={filteredIndex} className="border-b border-gray-700">
                                <td className="py-3 px-4">{filteredIndex + 1}</td>
                                <td className="py-3 px-4">{m.StudentNumber}</td>
                                <td className="py-3 px-4">
                                  <input
                                    type="text"
                                    name={m.StudentNumber}
                                    value={value}
                                    onChange={(e) => (finalmarks[filteredIndex] = e.target.value)}
                                    className="bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-1 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 ease-in-out"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg mt-4"
                >
                  Submit Marks
                </button>
              </form>
            </div>
          </div>

          {/* post something to class */}
            <button
              onClick={handlesetmessagetoggle}
              className="bg-blue-800 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg"
            >
              Post to Class
            </button>
            <div className='py-4'></div>
            {messagetoggle && (
              <form
                onSubmit={handle_postmessage}
                className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <label htmlFor="title" className="block text-lg font-semibold text-white mb-2">
                    Title:
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    id="title"
                    value={ptitle}
                    onChange={(e) => setptitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-lg font-semibold text-white mb-2">
                    Description:
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    cols="50"
                    rows="5"
                    required
                    autoComplete="off"
                    value={pdescription}
                    onChange={(e) => setpdescription(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label htmlFor="course" className="block text-lg font-semibold text-white mb-2">
                    Enter the CourseID:
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    id="course"
                    value={pcourse}
                    onChange={(e) => setpcourse(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="department" className="block text-lg font-semibold text-white mb-2">
                    Enter the DepartmentID:
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"  
                    id="department"
                    value={pdept}
                    onChange={(e) => setpdept(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg"
                >
                  Post
                </button>
              </form>
            )}

            {/* see what has been posted */}
            <button
              onClick={handlesetseeposted}
              className="bg-blue-800 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg"
            >
              see what you have posted
            </button>
            <div className='py-4'></div>

            {seeposted && (
              <form
                onSubmit={handleseeposted}
                className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="mb-4">
                  <label htmlFor="cid" className="block text-lg font-semibold text-white mb-2">
                    CourseID:
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    id="cid"
                    value={cid_for_seemsg}
                    onChange={(e) => setcid_for_seemsg(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="did" className="block text-lg font-semibold text-white mb-2">
                    DepartmentID:
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="off"
                    id="did"
                    value={did_for_seemsg}
                    onChange={(e) => setdid_for_seemsg(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg"
                >
                  submit
                </button>
              </form>
            )}

            {filledform && message.length>0 && (
              <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-white">Title</th>
                  <th className="py-3 px-4 text-left font-semibold text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                {message.map((m, index) => (
                  <tr
                    key={index}
                    className={`bg-gray-900 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition duration-300`}
                  >
                    <td className="py-3 px-4 text-white border-t border-gray-700">{m.Title}</td>
                    <td className="py-3 px-4 text-white border-t border-gray-700">{m.Description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            )}

            <div className='py-4'></div>


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Teacher_1
