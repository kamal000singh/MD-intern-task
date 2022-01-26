const express = require("express");
const router = express.Router();
const controller = require("../controller/registerController");

router.post("/register", controller.post);

module.exports = router;
