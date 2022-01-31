const User = require("../models/userDB");
const bcrypt = require("bcrypt");
const multer = require("multer");

const upload = multer({}).none();

module.exports = {
  upload: upload,
  post: (req, res) => {
    User.findOne({ email: req.body.email }, (err, found) => {
      if (err) throw err;
      if (found != null) {
        if (bcrypt.compareSync(req.body.password, found.password)) {
          session = req.session;
          session.userId = found._id;
          res.send("Login Successfully!!");
        } else {
          res.send("Password Invalid");
        }
      } else {
        res.send("Email Address does not exist");
      }
    });
  },
};
