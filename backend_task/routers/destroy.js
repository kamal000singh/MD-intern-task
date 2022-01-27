const express = require("express");
const router = express.Router();
const controller = require("../controller/destroyController");

router.get("/destroy", controller.get);

module.exports = router;
