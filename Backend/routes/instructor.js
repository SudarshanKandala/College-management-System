import db from "../databaseconn/college.js";
import express from "express";
import util from 'util';
const router = express.Router();
const query = util.promisify(db.query).bind(db);

router.get("/instructor", (req, res) => {
    const sql = "SELECT * FROM instructor ORDER BY instructorID";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  router.post("/instructor", (req, res) => {
    const { a_instid,a_name,a_ishead,a_deptid,password } = req.body;
    if(a_ishead==1){
      db.query(
        "UPDATE DEPARTMENT SET HeadID=? WHERE DepartnemtID=?",[a_instid,a_deptid],
        (err,result)=>{
          if(err){
            return res.status(500).json(err);
          }
        }
      )
    }
    db.query(
      "INSERT INTO INSTRUCTOR (InstructorID,InstructorName, isHead, DepartmentID,password) VALUES (?,?,?,?,?)",
      [a_instid,a_name,a_ishead,a_deptid,password],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json({
          a_instid,
          a_name,
          a_ishead,
          a_deptid,
          password
        });
      }
    );
  });
  
  router.post("/deletetea",(req,res)=>{
    const {deltea,ishead}=req.body;
  
    if(ishead!=0){
      db.query("UPDATE department SET HeadID=null WHERE DepartnemtID=?",[ishead],(err,result)=>{
        if(err)
          return res.status(500).json(err);
      })
    }
    db.query("DELETE FROM instructor WHERE InstructorID=?",[deltea],(err,result)=>{
      if(err)
        return res.status(500).json(err);
    })
    db.query("UPDATE course SET InstructorID=null WHERE InstructorID=?",[deltea],(err,result)=>{
      if(err)
        return res.status(500).json(err);
      res.json({deltea});
    });
  });
  
  router.post("/updateteaname",(req,res)=>{
    const {newname,id} = req.body;
    db.query("UPDATE instructor SET InstructorName=? WHERE InstructorID=?",[newname,id],(err,result)=>{
      if(err)
          return res.status(500).json(err);
      return res.json({newname,id});
    });
  });
  
  router.post("/updatehod",(req,res) => {
    const {newhod1,currhod1} = req.body
    db.query("UPDATE department SET HeadID=? WHERE HeadID=?",[newhod1,currhod1],(err,result)=>{
      if(err)
        return res.status(500).json(err);
    });
    db.query("UPDATE instructor SET isHead=0 WHERE InstructorID=?",[currhod1],(err,result)=>{
      if(err)
        return res.status(500).json(err);
    });
    db.query("UPDATE instructor SET isHead=1 WHERE InstructorID=?",[newhod1],(err,result)=>{
      if(err)
        return res.status(500).json(err);
      return res.json({newhod1,currhod1});
    });
  });

  router.post("/updatemarks",(req,res) => {
    const { finalmarks, for_stu1, cid_for_att1 } = req.body;
  
    try {
      for (let index = 0; index < for_stu1.length; index++) {
        const element = for_stu1[index]; // Student Number
        const element1 = finalmarks[index]; // Attendance for this student
        let a = 0;
        let b = 0;
        db.query("UPDATE studentvscourses SET Marks=? WHERE StudentNumber=? AND CourseID=?",[element1,element,cid_for_att1],(err,result) => {
          if(err)
            res.status(500).json({ error: "Error updating marks" });
        })
      }
      // Send a success response after the loop completes
      res.json({ message: "marks updated successfully" });
  
    } catch (err) {
      // Handle any errors that occur during the async calls
      console.error("Error updating marks:", err);
      res.status(500).json({ error: "Error updating marks" });
    }
  });

  router.post("/updateatt", async (req, res) => {
    const { finalatt, for_stu, cid_for_att } = req.body;
  
    try {
      for (let index = 0; index < for_stu.length; index++) {
        const element = for_stu[index]; // Student Number
        const element1 = finalatt[index]; // Attendance for this student
        let a = 0;
        let b = 0;
  
        // Fetch Total_Classes for the student
        const totalClassesResult = await query("SELECT Total_Classes FROM studentvscourses WHERE StudentNumber=? AND CourseID=?", [element, cid_for_att]);
        a = Number(totalClassesResult[0].Total_Classes) + 1; // Increment total classes
        console.log("Updated Total Classes:", a);
  
        // Update Total_Classes in the database
        await query("UPDATE studentvscourses SET Total_Classes=? WHERE StudentNumber=? AND CourseID=?", [a, element, cid_for_att]);
  
        // Fetch Attended_Classes for the student
        const attendedClassesResult = await query("SELECT Attended_Classes FROM studentvscourses WHERE StudentNumber=? AND CourseID=?", [element, cid_for_att]);
        b = Number(attendedClassesResult[0].Attended_Classes) + Number(element1); // Increment attended classes based on finalatt
        console.log("Updated Attended Classes:", b);
  
        // Update Attended_Classes in the database
        await query("UPDATE studentvscourses SET Attended_Classes=? WHERE StudentNumber=? AND CourseID=?", [b, element, cid_for_att]);
  
        // Calculate Attendance and update in the database
        const attendancePercentage = (b / a) * 100;
        await query("UPDATE studentvscourses SET Attendance=? WHERE StudentNumber=? AND CourseID=?", [attendancePercentage, element, cid_for_att]);
  
        console.log(`Attendance updated for student ${element}: ${attendancePercentage}%`);
      }
  
      // Send a success response after the loop completes
      res.json({ message: "Attendance updated successfully" });
  
    } catch (err) {
      // Handle any errors that occur during the async calls
      console.error("Error updating attendance:", err);
      res.status(500).json({ error: "Error updating attendance" });
    }
  });

  export default router;