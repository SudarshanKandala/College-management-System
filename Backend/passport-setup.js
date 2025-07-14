import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./databaseconn/college.js"; // This should now be promise-based
import jwt from 'jsonwebtoken';
import { secretkey } from "./routes/login.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    console.log("Google profile client ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("Google profile client ID:", process.env.GOOGLE_CLIENT_SECRET);
    // Validate college domain
    console.log("Email from Google profile:", email);
    if (!email.endsWith("@iiitn.ac.in")) {
      return done(null, false, { message: "Not a college email" });
    }

    let role;
    try {
    const stateObj = JSON.parse(Buffer.from(req.query.state, 'base64').toString('utf-8'));
    role = stateObj.role;
    } catch (e) {
    return done(null, false, { message: "Invalid state parameter" });
    } // "student" / "teacher" / "admin"
    console.log("Role from request:", role);
    let query = "";
    if (role === "Student") query = "SELECT * FROM student WHERE Email = ?";
    else if (role === "Teacher") query = "SELECT * FROM instructor WHERE Email = ?";
    else if (role === "Admin") query = "SELECT * FROM admin WHERE Email = ?";
    else return done(null, false, { message: "Invalid role" });

    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
      return done(null, false, { message: `${role} not found` });
    }

    const user = rows[0];
    console.log(user);

    return done(null, {
      id: user.StudentNumber || user.InstructorID || user.AdminID,
      name: user.StudentName || user.InstructorName || user.AdminName,
      email: user.Email,
      user: role
    });

  } catch (err) {
    return done(err, null);
  }
}));
