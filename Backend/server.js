import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import db from "./databaseconn/college.js";
import student from "./routes/Student.js";
import course from "./routes/Courses.js";
import department from "./routes/department.js";
import instructor from "./routes/instructor.js";
import stucour from "./routes/stucour.js";
import login from "./routes/login.js";
import messages from "./routes/messages.js"; 
import { secretkey } from "./routes/login.js";
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/",student);
app.use("/",course);
app.use("/",department);
app.use("/",instructor);
app.use("/",stucour);
app.use("/",login);
app.use("/",messages);

app.get("/decode_token",(req,res) => {
  // console.log(req.body.token);
  // console.log(req.headers);
  const authheaders = req.headers['authorization'];
  // console.log(authheaders);
  const token = authheaders.split(' ')[1];
  // console.log("from server side :  ",token);
  if (!token) {
    return res.status(402).json({ message: 'Token is required' });
  }
  jwt.verify(token,secretkey,(err,decoded) => {
    if(err){
      console.log("error in verifying the token");
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    // console.log("this is from server decode token: ",decoded);
    return res.json(decoded);
  })
})

app.listen(8080, () => {
  console.log("listening on port 8080");
});
