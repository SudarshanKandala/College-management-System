import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';

function Teacher_login() {
  const [a_uname, set_uname] = useState("");
  const [a_pass, set_apass] = useState("");
  // const {accessToken,setaccessToken} = useContext(AuthContext);
  // const [admint, setadmint] = useState([]);
  const navigate = useNavigate();
  // const [sendlogindata, setsendlogindata] = useState(["bat"]);
  const userref = useRef();
  
  // const { setauth } = useContext(AuthContext);

  useEffect(()=>userref.current.focus(),[]);
  const {login} = useContext(AuthContext);

  // useEffect(()=>{axios.get("http://localhost:8080/Studentlogin")
  //   .then((response)=>setadmint(response.data))
  //   .catch((error) => console.log('Error fetching data: ', error));
  // },[]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await axios.post("http://localhost:8080/Teacherlogin",{ a_uname,a_pass });
      // console.log(token.status);
      if(token.status==200){
        // console.log("success");
        // console.log("given token is: ",token.data);
        // setaccessToken(token);
        // localStorage.setItem("your_JWT_Token",token.data);
        // useEffect(() => {
          login(token.data);
        //   if (token) {
        alert("Login Successful");
        navigate("/");  // Navigate to home page after login
        //   }
        // }, [token, navigate]);
      }
      // else if(token.status==500){
      //   console.log("error fetching data",token.data);
      //   navigate("/");
      //   return;
      // }
      // else if(token.status==501){
      //   alert("Teacher Doesn't exist!");
      //   navigate("/");
      //   return;
      // }
      // else if(token.status==502){
      //   alert("Invalid Password!");
      //   navigate("/");
      //   return;
      // }
    } catch (error) {
      if (error.response) {
        // Handle specific error statuses
        const { status } = error.response;
  
        if (status === 501) {
          alert("Teacher Doesn't Exist!");
        } else if (status === 502) {
          alert("Invalid Password!");
        } else if (status === 500) {
          console.log("Error fetching student data for login", error.response.data);
        } else {
          alert("Login failed");
        }
  
        navigate("/"); // navigate after any error
      } else {
        alert("Login failed"); // for network or other unknown errors
        navigate("/");
      }
    }
  }
  return (
    <div className="bg-gray-900 text-gray-100" >
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handlesubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
        >
          <h3 className="text-4xl font-bold text-center text-white">
            Teacher Login
          </h3>

          <div className="flex flex-col space-y-2">
            <label htmlFor="id" className="text-lg font-medium">
              Enter your ID:
            </label>
            <input
              type="text"
              id="id"
              value={a_uname}
              ref={userref}
              autoComplete="off"
              required
              onChange={(e) => set_uname(e.target.value)}
              className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="pass" className="text-lg font-medium">
              Enter password:
            </label>
            <input
              type="password"
              id="pass"
              value={a_pass}
              autoComplete="off"
              required
              onChange={(e) => set_apass(e.target.value)}
              className="p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-gray-600 transition duration-300"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-2xl py-3 px-6 rounded-md hover:bg-purple-600 transition duration-300 shadow-lg w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Teacher_login
