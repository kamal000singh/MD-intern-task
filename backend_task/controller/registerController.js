const bcrypt = require("bcrypt");
const User = require("../models/userDB");
const AWS = require("aws-sdk");
const multer = require("multer");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
let storage = multer.memoryStorage({
  designation: function (req, file, cb) {
    cb(null, "");
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, filefilter: filefilter }).single(
  "profilePicture"
);

module.exports = {
  upload: upload,
  post: (req, res) => {
    let emp_id = parseInt(Math.random() * 100000);
    let myfile = req.file.originalname.split(".");
    let filetype = myfile[myfile.length - 1];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.firstName + "_" + req.body.lastName + "." + filetype,
      Body: req.file.buffer,
      ACL: "public-read-write",
      ContentType: "image/jpeg",
    };
    s3.upload(params, (err, data) => {
      if (err) throw err;
      const newUser = new User({
        emp_id: "MD" + emp_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        designation: req.body.designation,
        date_of_joining: req.body.date_of_joining,
        birthDate: req.body.birthDate,
        profilePicture: data.Location,
        role: req.body.role,
      });
      User.findOne({ email: req.body.email }, (err, result) => {
        if (err) throw err;
        if (result == null) {
          newUser.save((err, response) => {
            if (err) throw err;
            res.send("New User Registration Successfully!!");
          });
        } else {
          res.send("Email Address already exists!!");
        }
      });
    });
  },
};
