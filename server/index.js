const express = require("express");
const rateLimit = require("express-rate-limit");

const { db } = require("./config");

const app = express();

if (process.env.NODE_ENV === "production") {
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set("trust proxy", 1);
}

const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 5, // limit each IP to 5 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.get("/:id", (req, res) => {
  db.select("note")
    .from("notesbin")
    .where("note_hash", "=", req.params.id)
    .then((result) => res.status(200).send({ success: true, note: result[0].note }))
    .catch(() =>
      res
        .status(500)
        .send({ success: false, message: "An unexpected error occurred while fetching the note" })
    );
});

app.post("/note/:id", (req, res) => {
  db.insert({ note_hash: req.params.id, note: req.body.note })
    .into("notesbin")
    .then(() => res.status(200).send({ success: true }))
    .catch(() =>
      res
        .status(500)
        .send({ success: false, message: "An unexpected error occurred while adding the note" })
    );
});

app.listen(5001, () => console.log("Running"));
