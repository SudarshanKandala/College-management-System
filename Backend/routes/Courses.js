import db from "../databaseconn/college.js";
import express from "express";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get all courses
router.get("/Courses", authenticateJWT, authorizeRole(["Admin", "Student", "Teacher"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM course ORDER BY CourseID");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a new course
router.post("/Courses", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { courseid, coursename, instid, deptid } = req.body;
  try {
    await db.query(
      "INSERT INTO course (CourseID, CourseName, InstructorID, DepartmentID) VALUES (?, ?, ?, ?)",
      [courseid, coursename, instid, deptid]
    );
    res.json({
      courseid,
      coursename,
      instid,
      deptid
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update course instructor
router.post('/updatecourinst', authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { newins, courid } = req.body;
  try {
    await db.query("UPDATE course SET InstructorID=? WHERE CourseID=?", [newins, courid]);
    res.json({ newins, courid });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete a course
router.post("/deletecourse", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { cid } = req.body;
  try {
    await db.query("DELETE FROM course WHERE CourseID=?", [cid]);
    res.json({ id: cid });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get all admin data
router.get("/admindata", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM admin ORDER BY AdminID");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;