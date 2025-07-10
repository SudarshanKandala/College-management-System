import db from "../databaseconn/college.js";
import express from "express";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get all instructors
router.get("/instructor", authenticateJWT, authorizeRole(["Admin", "Teacher","Student"]), async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM instructor ORDER BY InstructorID");
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Add a new instructor
router.post("/instructor", authenticateJWT, authorizeRole(["Admin", "Teacher"]), async (req, res) => {
  const { a_instid, a_name, a_ishead, a_deptid, password } = req.body;
  try {
    if (a_ishead == 1) {
      await db.query(
        "UPDATE department SET HeadID=? WHERE DepartnemtID=?",
        [a_instid, a_deptid]
      );
    }
    await db.query(
      "INSERT INTO instructor (InstructorID, InstructorName, isHead, DepartmentID, password) VALUES (?, ?, ?, ?, ?)",
      [a_instid, a_name, a_ishead, a_deptid, password]
    );
    res.json({
      a_instid,
      a_name,
      a_ishead,
      a_deptid,
      password
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Delete instructor
router.post("/deletetea", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { deltea, ishead } = req.body;
  try {
    if (ishead != 0) {
      await db.query("UPDATE department SET HeadID=null WHERE DepartnemtID=?", [ishead]);
    }
    await db.query("DELETE FROM instructor WHERE InstructorID=?", [deltea]);
    await db.query("UPDATE course SET InstructorID=null WHERE InstructorID=?", [deltea]);
    res.json({ deltea });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update instructor name
router.post("/updateteaname", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { newname, id } = req.body;
  try {
    await db.query("UPDATE instructor SET InstructorName=? WHERE InstructorID=?", [newname, id]);
    return res.json({ newname, id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update HOD
router.post("/updatehod", authenticateJWT, authorizeRole(["Admin"]), async (req, res) => {
  const { newhod1, currhod1 } = req.body;
  try {
    await db.query("UPDATE department SET HeadID=? WHERE HeadID=?", [newhod1, currhod1]);
    await db.query("UPDATE instructor SET isHead=0 WHERE InstructorID=?", [currhod1]);
    await db.query("UPDATE instructor SET isHead=1 WHERE InstructorID=?", [newhod1]);
    return res.json({ newhod1, currhod1 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Update marks for students in a course
router.post("/updatemarks", authenticateJWT, authorizeRole(["Admin", "Teacher"]), async (req, res) => {
  const { finalmarks, for_stu1, cid_for_att1 } = req.body;
  try {
    for (let index = 0; index < for_stu1.length; index++) {
      const element = for_stu1[index]; // Student Number
      const element1 = finalmarks[index]; // Marks for this student
      await db.query(
        "UPDATE studentvscourses SET Marks=? WHERE StudentNumber=? AND CourseID=?",
        [element1, element, cid_for_att1]
      );
    }
    res.json({ message: "marks updated successfully" });
  } catch (err) {
    console.error("Error updating marks:", err);
    res.status(500).json({ error: "Error updating marks" });
  }
});

// Update attendance for students in a course
router.post("/updateatt", authenticateJWT, authorizeRole(["Admin", "Teacher"]), async (req, res) => {
  const { finalatt, for_stu, cid_for_att } = req.body;
  try {
    for (let index = 0; index < for_stu.length; index++) {
      const element = for_stu[index]; // Student Number
      const element1 = finalatt[index]; // Attendance for this student

      // Fetch Total_Classes for the student
      const [totalClassesResult] = await db.query(
        "SELECT Total_Classes FROM studentvscourses WHERE StudentNumber=? AND CourseID=?",
        [element, cid_for_att]
      );
      let a = Number(totalClassesResult[0]?.Total_Classes || 0) + 1; // Increment total classes

      // Update Total_Classes in the database
      await db.query(
        "UPDATE studentvscourses SET Total_Classes=? WHERE StudentNumber=? AND CourseID=?",
        [a, element, cid_for_att]
      );

      // Fetch Attended_Classes for the student
      const [attendedClassesResult] = await db.query(
        "SELECT Attended_Classes FROM studentvscourses WHERE StudentNumber=? AND CourseID=?",
        [element, cid_for_att]
      );
      let b = Number(attendedClassesResult[0]?.Attended_Classes || 0) + Number(element1); // Increment attended classes

      // Update Attended_Classes in the database
      await db.query(
        "UPDATE studentvscourses SET Attended_Classes=? WHERE StudentNumber=? AND CourseID=?",
        [b, element, cid_for_att]
      );

      // Calculate Attendance and update in the database
      const attendancePercentage = (b / a) * 100;
      await db.query(
        "UPDATE studentvscourses SET Attendance=? WHERE StudentNumber=? AND CourseID=?",
        [attendancePercentage, element, cid_for_att]
      );
    }
    res.json({ message: "Attendance updated successfully" });
  } catch (err) {
    console.error("Error updating attendance:", err);
    res.status(500).json({ error: "Error updating attendance" });
  }
});

export default router;