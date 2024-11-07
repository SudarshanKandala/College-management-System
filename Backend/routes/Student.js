import db from "../databaseconn/college.js";
import express from "express";
import { secretkey } from "./login.js";
const router = express.Router();

router.get("/students", (req, res) => {
    const sql = "SELECT * FROM STUDENT ORDER BY StudentNumber";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  router.post("/students", (req, res) => {
    const { name, rollno,dept,pass } = req.body;
    db.query("INSERT INTO student (StudentName,StudentNumber,BranchName,password) VALUES (?,?,?,?)", [name, rollno,dept,pass], (err, result) => {
      if (err)
        return res.status(500).json(err);
      res.json({ id: result.name, rollno, dept,pass });
    });
  });
  
  router.post("/studentdelete",(req,res) => {
    const {stucourans} = req.body;
    db.query("DELETE FROM student WHERE StudentNumber=?",[stucourans],(err,result) =>{
      if(err)
        return res.status(500).json(err);
    });
    db.query("DELETE FROM StudentVsCourses WHERE StudentNumber=?",[stucourans],(err,result) =>{
      if(err)
        return res.status(500).json(err);
      res.json({stucourans});
    });
  });
  
  router.post('/updatename',(req,res) => {
    const {new_name,for_rollno}=req.body;
    db.query("UPDATE student SET StudentName=? WHERE StudentNumber=?",[new_name,for_rollno],(err,result)=>{
      if(err)
        return res.status(500).json(err);
      res.json({new_name,for_rollno});
    })
  });
  
  router.post("/updatebranch",(req,res)=>{
    const {for_rollno1,deptid1,courarr1} = req.body;
    db.query("UPDATE student SET BranchName=? WHERE StudentNumber=?",[deptid1,for_rollno1],(err,result)=>{
      if(err)
        return res.status(500).json(err);
    });
    db.query("DELETE FROM StudentVsCourses WHERE StudentNumber=?",[for_rollno1],(err,result)=>{
      if(err)
        return res.status(500).json(err);
    });
    courarr1.map((c)=>{
      db.query("INSERT INTO StudentVsCourses (StudentNumber,CourseID) VALUES (?,?)",[for_rollno1,c],(err,result)=>{
        if(err)
          return res.status(500).json(err);
      });
    });
  });

  export default router;