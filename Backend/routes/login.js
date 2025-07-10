import express from 'express';
import db from '../databaseconn/college.js'; // Your SQL database connection (should be promise-based)
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const router = express.Router();
export const secretkey = "mysecretkey@123";

// Required for reading cookies
router.use(cookieParser());
router.use(express.json());

// Middleware: JWT authentication
export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not Authenticated");

    jwt.verify(token, secretkey, (err, user) => {
        if (err) return res.status(403).send("Invalid or Expired Token");
        req.user = user;
        next();
    });
};

// Middleware: Role-based authorization
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.user)) {
            return res.status(403).send("Unauthorized Access");
        }
        next();
    };
};

// Admin Login
router.post("/Adminlogin", async (req, res) => {
    console.log("Admin login request received");
    const { a_uname, a_pass } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM admin WHERE AdminID = ?", [a_uname]);
        const admin = rows[0];
        if (!admin) return res.status(401).send("Admin Not Found!");
        if (admin.password !== a_pass) return res.status(403).send("Incorrect Password");

        const payload = {
            username: a_uname,
            name: admin.AdminName,
            email: admin.Email,
            user: "Admin"
        };

        const token = jwt.sign(payload, secretkey, { expiresIn: '10h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true in production (HTTPS)
            sameSite: 'Strict',
            maxAge: 10 * 60 * 60 * 1000 // 10 hours
        });

        res.status(200).json({ message: "Admin Login Successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Student Login
router.post("/Studentlogin", async (req, res) => {
    const { a_uname, a_pass } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM student WHERE StudentNumber = ?", [a_uname]);
        const student = rows[0];
        if (!student) return res.status(401).send("Student Not Found!");
        if (student.password !== a_pass) return res.status(403).send("Incorrect Password");

        const payload = {
            username: a_uname,
            name: student.StudentName,
            email: student.Email,
            user: "Student"
        };

        const token = jwt.sign(payload, secretkey, { expiresIn: '10h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 10 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Student Login Successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Teacher Login
router.post("/Teacherlogin", async (req, res) => {
    const { a_uname, a_pass } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM instructor WHERE InstructorID = ?", [a_uname]);
        const teacher = rows[0];
        if (!teacher) return res.status(401).send("Teacher Not Found!");
        if (teacher.password !== a_pass) return res.status(403).send("Incorrect Password");

        const payload = {
            username: a_uname,
            name: teacher.InstructorName,
            email: teacher.Email,
            user: "Teacher"
        };

        const token = jwt.sign(payload, secretkey, { expiresIn: '10h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 10 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Teacher Login Successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Logout (clears cookie)
router.post("/logout", authenticateJWT, authorizeRole(["Admin","Student","Teacher"]), (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
});

export default router;