const express = require("express");
const dbfunctions = require("../database");

const router = express.Router();

//
router.get("/", async (req, res, next) => {
  const evidencija = await dbfunctions.getRecords();
  res.send(evidencija);
});

router.get("/:date", async (req, res, next) => {
  const date = req.params.date;
  const evidencijaByDay = await dbfunctions.getRecordsByDate(date);
  if (evidencijaByDay.length == 0) {
    return res.json({ message: "Nema upisa za današnji dan." });
  }
  res.send(evidencijaByDay);
});

module.exports = router;
