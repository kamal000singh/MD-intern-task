const express = require("express");
const router = express.Router();
const controller = require("../controller/editController");

router.post("/edit", controller.upload, controller.post);

module.exports = router;
