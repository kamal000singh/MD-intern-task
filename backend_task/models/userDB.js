const mongoose = require("mongoose");
require("dotenv").config();
const connect = require("../db/db");

const userSchema = mongoose.Schema({
  emp_id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: Number,
  designation: String,
  date_of_joining: Date,
  birthDate: Date,
  profilePicture: String,
  role: String,
});

const userData = mongoose.model("user", userSchema);

module.exports = userData;
