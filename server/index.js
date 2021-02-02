const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ status: "Success" });
});

app.post("/note/:id", (req, res) => {
  res.status(200).send({ status: "Success", id: req.params.id, text: req.body.note });
});

app.listen(5001, () => console.log("Running"));
