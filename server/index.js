const express = require("express");
const Pool = require("pg").Pool;
const app = express();

// localhost:3001 is used as Next.js app in client is running on that port
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const pool = new Pool({
  user: "postgres",
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: "5432",
});

app.use(express.json());

app.get("/", (req, res) => {
  pool.query("select * from notesbin", (err, res) => {
    console.log(res.rows);
  });
  res.status(200).send({ status: "Success" });
});

app.post("/note/:id", (req, res) => {
  res.status(200).send({ status: "Success", id: req.params.id, text: req.body.note });
});

app.listen(5001, () => console.log("Running"));
