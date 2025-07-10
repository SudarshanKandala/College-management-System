import db from "../databaseconn/college.js";
import express from "express";
import { secretkey } from "./login.js";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get all students
router.get("/students", authenticateJWT, authorizeRole(["Admin", "Student", "Teacher"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM student ORDER BY StudentNumber");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a new student
router.post("/students", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { name, rollno, dept, pass } = req.body;
  try {
    await db.query(
      "INSERT INTO student (StudentName, StudentNumber, BranchName, password) VALUES (?, ?, ?, ?)",
      [name, rollno, dept, pass]
    );
    res.json({ name, rollno, dept, pass });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete a student and their course associations
router.post("/studentdelete", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { stucourans } = req.body;
  try {
    await db.query("DELETE FROM student WHERE StudentNumber=?", [stucourans]);
    await db.query("DELETE FROM studentvscourses WHERE StudentNumber=?", [stucourans]);
    res.json({ stucourans });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update student name
router.post('/updatename', authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { new_name, for_rollno } = req.body;
  try {
    await db.query("UPDATE student SET StudentName=? WHERE StudentNumber=?", [new_name, for_rollno]);
    res.json({ new_name, for_rollno });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update student branch and courses
router.post("/updatebranch", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { for_rollno1, deptid1, courarr1 } = req.body;
  try {
    await db.query("UPDATE student SET BranchName=? WHERE StudentNumber=?", [deptid1, for_rollno1]);
    await db.query("DELETE FROM studentvscourses WHERE StudentNumber=?", [for_rollno1]);
    for (const c of courarr1) {
      await db.query("INSERT INTO studentvscourses (StudentNumber, CourseID) VALUES (?, ?)", [for_rollno1, c]);
    }
    res.json({ for_rollno1, deptid1, courarr1 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;