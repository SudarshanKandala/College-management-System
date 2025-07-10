import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sudarshan@18",
  database: "college",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MYSQL: ", err);
  } else {
    console.log("Connected to mysql database");
  }
});

export default db.promise(); // Exporting the promise-based version of the connection