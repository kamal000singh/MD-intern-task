const express = require("express");
const router = express.Router();
const controller = require("../controller/changePassController");

router.post("/changePass", controller.post);

module.exports = router;
