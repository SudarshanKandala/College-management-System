import db from "../databaseconn/college.js"
import express from "express";
const router = express.Router();

router.get("/stucour", (req, res) => {
    const sql = "SELECT * FROM StudentVsCourses ORDER BY StudentNumber";
    db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });
  
  router.post("/stucour",(req,res) => {
    const {rollno,courarr} = req.body;
    console.log(courarr);
    courarr.map((i)=>(
      db.query(
        "INSERT INTO StudentVsCourses (StudentNumber,CourseID) VALUES (?,?)",
        [rollno,i],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }
        }
      )
    ));
  });

  export default router;