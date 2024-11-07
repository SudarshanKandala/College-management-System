import express from 'express';
import db from '../databaseconn/college.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
export const secretkey = "mysecretkey@123";

router.post("/Adminlogin",(req,res) => {
    db.query("SELECT * FROM Admin",(err,result) => {
        if(err)
            return res.status(500).json(err);
        else{
            const {a_uname,a_pass} = req.body;
            const ispresent = result.find((r) => {
                if(r.AdminID==a_uname)
                    return r;
            })
            if(!ispresent)
                return res.status(501).send("Admin Not Found!");
            if(ispresent.password !=a_pass)
                return res.status(502).send("Incorrect Password");
            const name = ispresent.AdminName;
            const payload = {
                username : a_uname,
                user : "Admin",
                name : name
            }
            const token = jwt.sign(payload,secretkey,{expiresIn: '10h'});
            // console.log(token);
            return res.status(200).json(token);
        }
    });
});

router.post("/Studentlogin",(req,res) => {
    db.query("SELECT * FROM student",(err,result) => {
        if(err)
            return res.status(500).json(err);
        else{
            const {a_uname,a_pass} = req.body;
            // console.log(result);
            const ispresent = result.find((r) => {
                if(r.StudentNumber==a_uname)
                    return r;
            })
            if(ispresent==undefined)
                return res.status(501).send("Student Not Found!");
            if(ispresent.password !=a_pass)
                return res.status(502).send("Incorrect Password");
            const name = ispresent.StudentName;
            const payload = {
                username : a_uname,
                user : "Student",
                name : name
            }
            const token = jwt.sign(payload,secretkey,{expiresIn: '10h'});
            // console.log(token);
            return res.status(200).json(token);   
        }
    });
});

router.post("/Teacherlogin",(req,res) => {
    db.query("SELECT * FROM instructor",(err,result) => {
        if(err)
            return res.status(500).json(err);
        else{
            const {a_uname,a_pass} = req.body;
            const ispresent = result.find((r) => {
                if(r.InstructorID==a_uname)
                    return r;
            })
            if(ispresent==undefined)
                return res.status(501).send("Teacher Not Found!");
            if(ispresent.password !=a_pass)
                return res.status(502).send("Incorrect Password");
            const name = ispresent.InstructorName;
            const payload = {
                username : a_uname,
                user : "Teacher",
                name : name
            }
            const token = jwt.sign(payload,secretkey,{expiresIn: '10h'});
            // console.log(token);
            return res.status(200).json(token);   
        }
    });
});

export default router;