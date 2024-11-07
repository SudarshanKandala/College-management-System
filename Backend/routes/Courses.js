import db from "../databaseconn/college.js";
import express from "express";
const router = express.Router();

  router.get("/Courses", (req, res) => {
    const sql = "SELECT * FROM COURSE ORDER BY CourseID";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  router.post("/Courses", (req, res) => {
    const { courseid, coursename, instid, deptid } = req.body;
    db.query(
      "INSERT INTO course (CourseID, CourseName, InstructorID, DepartmentID) VALUES (?, ?, ?, ?)",
      [courseid, coursename, instid, deptid],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json({
          courseid,
          coursename,
          instid,
          deptid
        });
      }
    );
  });
  
  router.post('/updatecourinst',(req,res)=>{
    const {newins,courid} = req.body;
    db.query("UPDATE course SET InstructorID=? WHERE CourseID=?",[newins,courid],(err,result)=>{
      if(err)
        return res.status(500).json(err);
      res.json({newins,courid});
    });
  });
  
  router.post("/deletecourse",(req,res) => {
    const {cid}=req.body;
    console.log(cid);
    db.query("DELETE FROM course WHERE CourseID=?",[cid],(err,result) => {
      if(err)
        return res.status(500).json(err);
      res.json({id:result.cid});
    });
  });

  router.get("/admindata", (req, res) => {
    const sql = "SELECT * FROM admin ORDER BY AdminID";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  export default router;