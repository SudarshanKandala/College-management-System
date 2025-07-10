import db from "../databaseconn/college.js";
import express from "express";
import { authenticateJWT, authorizeRole } from './login.js';
const router = express.Router();

// Get messages for a department and course
router.post("/messages", authenticateJWT, authorizeRole(["Teacher","Student"]), async (req, res) => {
  const { did, cid } = req.body;
  try {
    const [result] = await db.query(
      "SELECT * FROM messages WHERE DepartmentID=? AND CourseID=?",
      [did, cid]
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Post a new message
router.post("/postmessage", authenticateJWT, authorizeRole(["Teacher"]), async (req, res) => {
  const { ptitle, pdescription, pcourse, pdept } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO messages (Title, Description, DepartmentID, CourseID) VALUES (?, ?, ?, ?)",
      [ptitle, pdescription, pdept, pcourse]
    );
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;