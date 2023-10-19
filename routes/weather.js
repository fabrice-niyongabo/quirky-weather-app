const express = require("express");
const router = express.Router();
const {
  getAll,
  saveWeather,
  deleteWeather,
} = require("../controllers/weather");

const auth = require("../middleware/auth");

router.get("/", auth, getAll);
router.post("/", auth, saveWeather);
router.delete("/:id", auth, deleteWeather);

module.exports = router;
