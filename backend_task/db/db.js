const mongoose = require("mongoose");
require("dotenv").config();

const conn = mongoose.connect(
  "mongodb+srv://MDtask:" +
    process.env.MONGODB_PASSWORD +
    "@cluster0.z7ney.mongodb.net/MD_task?retryWrites=true&w=majority"
);

module.exports = conn;
