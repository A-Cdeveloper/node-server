const express = require("express");
const dbfunctions = require("../database");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const areas = await dbfunctions.getAreas();
  res.send(areas);
});

router.get("/:area_id", async (req, res) => {
  const { area_id } = req.params;
  const area = await dbfunctions.getSingleArea(area_id);
  if (area.length == 0) {
    return res.status(500).json({ message: "Parcela ne postoji." });
  }
  res.send(area);
});

module.exports = router;
