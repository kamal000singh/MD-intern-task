const express = require("express");
const router = express.Router();
const controller = require("../controller/verifyController");

router.post("/verify", controller.post);

module.exports = router;
