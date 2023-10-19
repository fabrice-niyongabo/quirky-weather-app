const express = require("express");
const router = express.Router();
const { loginOrRegister } = require("../controllers/users");

router.post("/login", loginOrRegister);

module.exports = router;
