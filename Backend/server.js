import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import db from "./databaseconn/college.js";
import student from "./routes/Student.js";
import course from "./routes/Courses.js";
import department from "./routes/department.js";
import instructor from "./routes/instructor.js";
import stucour from "./routes/stucour.js";
import login from "./routes/login.js";
import messages from "./routes/messages.js"; 
import { secretkey } from "./routes/login.js";
import jwt from 'jsonwebtoken';
import loginRouter from './routes/login.js';
import cookieParser from "cookie-parser";
import { authenticateJWT } from './routes/login.js';
import session from "express-session";
import './passport-setup.js' // import the strategy config
import passport from "passport";

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(loginRouter);

app.use(session({
  secret: secretkey,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth route
app.get('/auth/google', (req, res, next) => {
  const role = req.query.role; // student/instructor/admin
  console.log("Google auth request received for role:", role);
  const state = Buffer.from(JSON.stringify({ role })).toString('base64');
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state,
    session: false,
    passReqToCallback: true
  })(req, res, next);
});

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173' }),
  (req, res) => {
    console.log("Google auth callback received");
    const payload = {
      username: req.user.id,
      name: req.user.name,
      email: req.user.email,
      user: req.user.user
    };
    console.log("User info from Google auth:", req.user);

    const token = jwt.sign(payload, secretkey, { expiresIn: '10h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'Strict',
      maxAge: 10 * 60 * 60 * 1000
    });

    res.redirect('http://localhost:5173');
  }
);

app.use("/",student);
app.use("/",course);
app.use("/",department);
app.use("/",instructor);
app.use("/",stucour);
app.use("/",login);
app.use("/",messages);


app.get("/profile", authenticateJWT, (req, res) => {
  res.json(req.user); // this contains the decoded token info
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
