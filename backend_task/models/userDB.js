const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://MDtask:" +
    process.env.MONGODB_PASSWORD +
    "@cluster0.z7ney.mongodb.net/MD_task?retryWrites=true&w=majority"
);

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
