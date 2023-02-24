const express = require("express");
const dbfunctions = require("../database");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const operations = await dbfunctions.getOperations();
  res.send(operations);
});

router.get("/:operation_id", async (req, res) => {
  const { operation_id } = req.params;
  const operation = await dbfunctions.getSingleOperation(operation_id);
  if (operation.length == 0) {
    return res.status(500).json({ message: "Operacija ne postoji." });
  }
  res.send(operation);
});

module.exports = router;
