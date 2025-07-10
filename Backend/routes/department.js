import db from "../databaseconn/college.js";
import express from "express";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get all departments
router.get("/department", authenticateJWT, authorizeRole(["Admin", "Student", "Teacher"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM department ORDER BY DepartnemtID");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a new department
router.post("/department", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { dptid, dptname } = req.body;
  try {
    await db.query(
      "INSERT INTO department (DepartnemtID, DepartmentName, HeadID) VALUES (?, ?, ?)",
      [dptid, dptname, null]
    );
    res.json({
      dptid,
      dptname
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete department and related data
router.post("/deldept", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { deptid, courarr, stuarr, deptname } = req.body;
  try {
    await db.query("DELETE FROM department WHERE DepartnemtID=?", [deptid]);
    await db.query("DELETE FROM course WHERE DepartmentID=?", [deptid]);
    await db.query("DELETE FROM instructor WHERE DepartmentID=?", [deptid]);
    await db.query("DELETE FROM student WHERE BranchName=?", [deptname]);
    for (const c of courarr) {
      await db.query("DELETE FROM studentvscourses WHERE CourseID=?", [c]);
    }
    for (const s of stuarr) {
      await db.query("DELETE FROM studentvscourses WHERE StudentNumber=?", [s]);
    }
    res.json({ message: "Department and related data deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;