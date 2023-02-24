const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3030;

const app = express();
app.use(express.json());

const workers = require("./routes/workers");
const records = require("./routes/records");
const areas = require("./routes/areas");
const operations = require("./routes/operations");
const errors = require("./routes/errors");

app.get("/", (req, res) => {
  throw new Error("Protected route");
  res.send("Welcome to main route!");
});

app.use("/workers", workers);
app.use("/records", records);
app.use("/areas", areas);
app.use("/operations", operations);
app.use(errors);

// test server
app.listen(8080, () => {
  console.log(`Server running on port ${PORT}`);
});
