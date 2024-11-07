import db from "../databaseconn/college.js";
import express from "express";
const router = express.Router();

router.post("/messages",(req,res) => {
    const {did,cid} = req.body;
    console.log(req.body);
    db.query("SELECT * FROM messages WHERE DepartmentID=? AND CourseID=?",[did,cid],(err,result) => {
        if(err)
            return res.status(500).json(err);
        console.log("result: ",result);
        return res.json(result);
    });
});

router.post("/postmessage",(req,res) => {
    const {ptitle,pdescription,pcourse,pdept} = req.body;
    db.query("INSERT INTO messages (Title,Description,DepartmentID,CourseID) VALUES (?,?,?,?)",[ptitle,pdescription,pdept,pcourse],(err,result) => {
        if(err)
            return res.status(500).json(err);
        return res.json(result);
    })
})



export default router;