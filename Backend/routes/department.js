import db from "../databaseconn/college.js";
import express from "express";
const router = express.Router();

router.get("/department", (req, res) => {
    const sql = "SELECT * FROM DEPARTMENT ORDER BY DepartnemtID";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  router.post("/department",(req,res) => {
    const { dptid,dptname } = req.body;
    db.query(
      "INSERT INTO department (DepartnemtID,DepartmentName,HeadID) VALUES (?,?,?)",
      [dptid,dptname,null],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json({
          dptid,
          dptname
        });
      }
    );
  });
  
  router.post("/deldept",(req,res)=>{
    const {deptid,courarr,stuarr,deptname}=req.body;
    console.log(stuarr);
    db.query("DELETE FROM department WHERE DepartnemtID=?",[deptid],(err,result)=>{
      if(err)
        res.status(500).json(err);
    });
    db.query("DELETE FROM course WHERE DepartmentID=?",[deptid],(err,result)=>{
      if(err)
        res.status(500).json(err);
    });
    db.query("DELETE FROM instructor WHERE DepartmentID=?",[deptid],(err,result)=>{
      if(err)
        res.status(500).json(err);
    });
    db.query("DELETE FROM student WHERE BranchName=?",[deptname],(err,result)=>{
      if(err)
        res.status(500).json(err);
    });
    courarr.map((c)=>{
      db.query("DELETE FROM StudentVsCourses WHERE CourseID=?",[c]);
    });
    stuarr.map((s)=>{
      db.query("DELETE FROM StudentVsCourses WHERE StudentNumber=?",[s]);
    });
  });

  export default router;