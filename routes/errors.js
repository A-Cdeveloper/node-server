const express = require("express");
const router = express.Router();

// error handler
router.use((req, res, next) => {
  const error = new Error("Nije pronađeno.");
  error.status = 404;
  next(error);
});

// error handler middleware
router.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.status || "Server Error",
    },
  });
});

module.exports = router;
