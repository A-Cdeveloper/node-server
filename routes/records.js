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

router.get("/:dateFrom/:dateTo", async (req, res, next) => {
  const dateFrom = req.params.dateFrom;
  const dateTo = req.params.dateTo;
  const evidencijaPeriod = await dbfunctions.getRecordsByPeriod(
    dateFrom,
    dateTo
  );
  if (evidencijaPeriod.length == 0) {
    return res.json({ message: "Nema upisa za izabrani period." });
  }
  res.send(evidencijaPeriod);
});

module.exports = router;
