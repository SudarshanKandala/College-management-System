import db from "../databaseconn/college.js"
import express from "express";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get all student-course associations
router.get("/stucour", authenticateJWT, authorizeRole(["Student", "Teacher", "Admin"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM studentvscourses ORDER BY StudentNumber");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add courses for a student
router.post("/stucour", authenticateJWT, authorizeRole(["Admin", "Student", "Teacher"]), async (req, res) => {
  const { rollno, courarr } = req.body;
  try {
    for (const i of courarr) {
      await db.query(
        "INSERT INTO studentvscourses (StudentNumber, CourseID) VALUES (?, ?)",
        [rollno, i]
      );
    }
    res.json({ message: "Courses added for student", rollno, courarr });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;