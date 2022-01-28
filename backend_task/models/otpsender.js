const mongoose = require("mongoose");
const connect = require("../db/db");

const otpSchema = mongoose.Schema({
  objectId: String,
  password: String,
  otp: Number,
});

module.exports = mongoose.model("otpuser", otpSchema);
