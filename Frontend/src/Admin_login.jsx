import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../src/context/Authprovider.jsx'; // Import AuthContext

function Admin_login() {
  const [a_uname, set_uname] = useState("");
  const [a_pass, set_apass] = useState("");
  // const {accessToken,setaccessToken} = useContext(AuthContext);
  // const [admint, setadmint] = useState([]);
  const navigate = useNavigate();
  // const [sendlogindata, setsendlogindata] = useState(["bat"]);
  const userref = useRef();
  // const { setauth } = useContext(AuthContext);
  // const {login} = useContext(AuthContext);
  useEffect(()=>userref.current.focus(),[]);

  // useEffect(()=>{axios.get("http://localhost:8080/Studentlogin")
  //   .then((response)=>setadmint(response.data))
  //   .catch((error) => console.log('Error fetching data: ', error));
  // },[]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("given uname is: ",a_uname);
      // console.log("given pass is: ",a_pass);
      const token = await axios.post("http://localhost:8080/Adminlogin",
        { a_uname,a_pass },
        {withCredentials: true}); // important for sending/receiving cookies
      // console.log(token.status);
      if(token.status==200){
        // console.log("success");
        // console.log("given token is: ",token.data);
        // setaccessToken(token);
        // localStorage.setItem("your_JWT_Token",token.data);
        // useEffect(() => {
          // login(token.data);
        //   if (token) {
        alert("Login successful");
        navigate("/");  // Navigate to home page after login
        window.location.reload()  // Navigate to home page after login
        //   }
        // }, [token, navigate]);
      }
      // else if(token.status==500){
      //   console.log("error fetching data",token.data);
      //   navigate("/");
      //   return;
      // }
      // else if(token.status==501){
      //   alert("Admin Doesn't exist!");
      //   navigate("/");
      //   return;
      // }
      // else if(token.status==502){
      //   console.log("Invalid Password!");
      //   alert("Invalid password");
      //   navigate("/");
      //   return;
      // }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        console.log("Error response status:", status);
        if (status === 401) {
          alert("Admin Doesn't Exist!");
        } else if (status === 403) {
          alert("Invalid Password!");
        } else if (status === 500) {
          console.log("Error fetching Admin data for login", error.response.data);
        } else {
          alert("Login failed");
        }
  
        navigate("/"); 
      } else {
        alert("Login failed");
        navigate("/");
      }
    }
  }


  return (
  <div className="inset-0 bg-gray-900 text-gray-100 flex justify-center items-center">
    <div className="w-full max-w-md px-4">
      <form
        onSubmit={handlesubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6"
      >
        <h3 className="text-4xl font-bold text-center text-white">
          Admin Login
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

        <button
          type="submit"
          className="bg-blue-800 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 shadow-md w-full"
        >
          Login
        </button>

        <a href="https://college-management-system-nu-ten.vercel.app/auth/google?role=Admin" className="block">
          <button
            type="button"
            className="bg-blue-800 text-white font-bold text-lg py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 shadow-md w-full"
          >
            Login with Google
          </button>
        </a>
      </form>
    </div>
  </div>
);

}

export default Admin_login
