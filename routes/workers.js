const express = require("express");
const dbfunctions = require("../database");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const workers = await dbfunctions.getWorkers();
  res.send(workers);
});

router.get("/:qrid", async (req, res) => {
  //
  const qrid = req.params.qrid;
  const worker = await dbfunctions.getSingleWorker(qrid);
  if (!worker) {
    return res.status(500).json({ message: "Zaposleni nije u bazi!" });
  }
  res.status(200).send(worker);
});

router.post("/add_worker", async (req, res) => {
  const { qrid, parcela_id, operacija_id } = req.body;
  const worker = await dbfunctions.getSingleWorker(qrid);
  if (!worker) {
    return res.status(500).json({ message: "Greška prilikom evidentiranja." });
  }
  const currentDate = new Date().toJSON().slice(0, 10);
  const alreadyCheck = await dbfunctions.getRecordsByDate(currentDate);
  const finded = alreadyCheck.find((el) => el.qrid == worker.qrid);
  if (finded) {
    return res.status(500).json({ message: "Radnik je vec evidentiran danas." });
  }
  await dbfunctions.addWorkerToRecords(qrid, parcela_id, operacija_id);
  res.status(200).json({ message: "Radnik je evidentiran." });
});

module.exports = router;
